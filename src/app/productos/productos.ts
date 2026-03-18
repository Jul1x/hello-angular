/**
 * productos.ts - COMPONENTE DE LA TIENDA PÚBLICA 🛒
 *
 * Este es el componente que VEN LOS CLIENTES. Muestra:
 * 1. El catálogo de productos (cargados desde Firestore, la nube de Google)
 * 2. Un carrito de compras (guardado en localStorage del navegador del cliente)
 * 3. Un botón de WhatsApp que envía el pedido formateado al número del negocio
 *
 * ⚠️ CLAVE: Los productos se LEEN de la nube (Firestore), pero el CARRITO se guarda
 * LOCALMENTE en el navegador del cliente. Si el cliente cierra el navegador y vuelve
 * a abrir la página, su carrito sigue ahí (gracias a localStorage).
 */
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto, ProductsService } from '../services/products.service';

// Interface para cada elemento del carrito (un producto + su cantidad)
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

  productos: Producto[] = [];  // Lista de productos cargados desde Firestore
  carrito: CartItem[] = [];    // Carrito de compras del cliente (guardado en el navegador)
  loading = true;              // Indicador de carga mientras se descargan los productos

  async ngOnInit() {
    // 1. Recuperar el carrito guardado en el navegador (si existe)
    const savedCart = localStorage.getItem('carrito_barra_oculta');
    if (savedCart) {
      this.carrito = JSON.parse(savedCart); // Convertir texto JSON a objeto JavaScript
    }

    // 2. Descargar los productos desde FIRESTORE (la nube de Google)
    this.productos = await this.productsService.getProductos();
    this.loading = false;
  }

  // Guarda el estado actual del carrito en localStorage (persiste entre sesiones)
  private saveCart() {
    localStorage.setItem('carrito_barra_oculta', JSON.stringify(this.carrito));
  }

  // Agrega un producto al carrito (si ya existe, solo incrementa la cantidad)
  addToCart(product: Producto) {
    const existingItem = this.carrito.find(item => item.producto.nombre === product.nombre);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.carrito.push({ producto: product, cantidad: 1 });
    }
    this.saveCart();
  }

  // Modifica la cantidad de un producto en el carrito (+1 o -1)
  // Si la cantidad llega a 0, elimina el producto del carrito
  updateQuantity(product: Producto, change: number) {
    const index = this.carrito.findIndex(item => item.producto.nombre === product.nombre);
    if (index > -1) {
      this.carrito[index].cantidad += change;
      if (this.carrito[index].cantidad <= 0) {
        this.carrito.splice(index, 1); // Eliminar del arreglo si cantidad = 0
      }
      this.saveCart();
    }
  }

  // Elimina un producto completamente del carrito
  removeFromCart(product: Producto) {
    const index = this.carrito.findIndex(item => item.producto.nombre === product.nombre);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.saveCart();
    }
  }

  // Vacía todo el carrito y elimina los datos del navegador
  clearCart() {
    this.carrito = [];
    localStorage.removeItem('carrito_barra_oculta');
  }

  /**
   * ENVIAR PEDIDO POR WHATSAPP 📱
   * Construye un mensaje con el resumen del pedido y lo abre en WhatsApp Web/App.
   * El número del negocio está definido en la variable 'numero'.
   * El mensaje incluye: nombre del producto, cantidad, subtotal y total.
   */
  enviarWhatsApp() {
    if (this.carrito.length === 0) return;

    const numero = '573106060393'; // Número de WhatsApp del negocio (Colombia)

    let mensaje = '¡Hola, La Barra Oculta! ✨\n';
    mensaje += 'Me gustaría realizar el siguiente pedido:\n\n';

    this.carrito.forEach(item => {
      const subtotal = item.producto.precio * item.cantidad;
      mensaje += `• ${item.cantidad} x ${item.producto.nombre} - ($${subtotal.toLocaleString()})\n`;
    });

    mensaje += `\n*Total a pagar: $${this.total.toLocaleString()}*\n`;
    mensaje += '--------------------------\n';
    mensaje += '🏠 Dirección de entrega: [Escribir aquí]';

    const mensajeEncoded = encodeURIComponent(mensaje); // Codificar para URL
    const url = `https://wa.me/${numero}?text=${mensajeEncoded}`;
    window.open(url, '_blank'); // Abrir WhatsApp en una nueva pestaña
  }

  // Propiedad calculada: suma automáticamente el total del carrito
  get total(): number {
    return this.carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  }
}
