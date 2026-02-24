import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto, ProductsService } from '../services/products.service';

interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  private productsService = inject(ProductsService);

  productos: Producto[] = this.productsService.getProductos();
  carrito: CartItem[] = [];

  ngOnInit() {
    // Cargar carrito desde localStorage al iniciar el componente
    const savedCart = localStorage.getItem('carrito_barra_oculta');
    if (savedCart) {
      this.carrito = JSON.parse(savedCart);
    }
  }

  private saveCart() {
    // Guardar el estado actual en localStorage
    localStorage.setItem('carrito_barra_oculta', JSON.stringify(this.carrito));
  }

  addToCart(product: Producto) {
    const existingItem = this.carrito.find(item => item.producto.nombre === product.nombre);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.carrito.push({ producto: product, cantidad: 1 });
    }
    this.saveCart();
  }

  updateQuantity(product: Producto, change: number) {
    const index = this.carrito.findIndex(item => item.producto.nombre === product.nombre);
    if (index > -1) {
      this.carrito[index].cantidad += change;
      if (this.carrito[index].cantidad <= 0) {
        this.carrito.splice(index, 1);
      }
      this.saveCart();
    }
  }

  removeFromCart(product: Producto) {
    const index = this.carrito.findIndex(item => item.producto.nombre === product.nombre);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.saveCart();
    }
  }

  clearCart() {
    this.carrito = [];
    localStorage.removeItem('carrito_barra_oculta');
  }

  enviarWhatsApp() {
    if (this.carrito.length === 0) return;

    const numero = '573106060393'; // Tu número con código de país

    // 1. Construir el cuerpo del mensaje
    let mensaje = '¡Hola, La Barra Oculta! ✨\n';
    mensaje += 'Me gustaría realizar el siguiente pedido:\n\n';

    this.carrito.forEach(item => {
      const subtotal = item.producto.precio * item.cantidad;
      mensaje += `• ${item.cantidad} x ${item.producto.nombre} - ($${subtotal.toLocaleString()})\n`;
    });

    mensaje += `\n*Total a pagar: $${this.total.toLocaleString()}*\n`;
    mensaje += '--------------------------\n';
    mensaje += '🏠 Dirección de entrega: [Escribir aquí]';

    // 2. Codificar para URL
    const mensajeEncoded = encodeURIComponent(mensaje);

    // 3. Abrir WhatsApp
    const url = `https://wa.me/${numero}?text=${mensajeEncoded}`;
    window.open(url, '_blank');

    // Opcional: limpiar el carrito después de enviar
    // this.clearCart(); 
  }

  get total(): number {
    return this.carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  }
}
