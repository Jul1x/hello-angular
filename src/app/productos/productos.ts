import { Component, inject } from '@angular/core';
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
export class ProductosComponent {
  private productsService = inject(ProductsService);

  productos: Producto[] = this.productsService.getProductos();
  carrito: CartItem[] = [];

  addToCart(product: Producto) {
    const existingItem = this.carrito.find(item => item.producto.nombre === product.nombre);
    if (existingItem) {
      existingItem.cantidad++;
    } else {
      this.carrito.push({ producto: product, cantidad: 1 });
    }
  }

  updateQuantity(product: Producto, change: number) {
    const index = this.carrito.findIndex(item => item.producto.nombre === product.nombre);
    if (index > -1) {
      this.carrito[index].cantidad += change;
      if (this.carrito[index].cantidad <= 0) {
        this.carrito.splice(index, 1);
      }
    }
  }

  removeFromCart(product: Producto) {
    const index = this.carrito.findIndex(item => item.producto.nombre === product.nombre);
    if (index > -1) {
      this.carrito.splice(index, 1);
    }
  }

  clearCart() {
    this.carrito = [];
  }

  finalizarCompra() {
    const total = this.total;
    // Formatear el dinero para mostrarlo bonito en la alerta
    const totalFormateado = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(total);

    alert(`¡Tu pedido está listo! 🚀\n\nTotal a pagar: ${totalFormateado}\n\nGracias por comprar en La Barra Oculta.`);
    this.clearCart();
  }

  get total(): number {
    return this.carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);
  }
}
