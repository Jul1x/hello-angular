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
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// Interface para cada elemento del carrito (un producto + su cantidad)
interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private ordersService = inject(OrdersService);

  productos: Producto[] = [];  // Lista de productos cargados desde Firestore
  carrito: CartItem[] = [];    // Carrito de compras del cliente (guardado en el navegador)
  loading = true;              // Indicador de carga mientras se descargan los productos

  // Filtros y Búsqueda
  categorias = ['Todas', 'Cervezas', 'Vinos', 'Rones', 'Whiskys', 'Aguardientes', 'Otros'];
  categoriaSeleccionada = 'Todas';
  searchTerm = '';

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

  // GETTER DINÁMICO: Devuelve los productos filtrados según búsqueda y categoría
  get productosFiltrados(): Producto[] {
    return this.productos.filter(p => {
      // 0. Si el producto está pausado/agotado, no lo mostramos al público
      if (p.activo === false) return false;

      // 1. Filtro por categoría (Auto-clasificador para productos viejos sin el campo 'categoria')
      let catProducto = p.categoria;
      if (!catProducto) {
        const nom = p.nombre.toLowerCase();
        if (nom.includes('cerveza')) catProducto = 'Cervezas';
        else if (nom.includes('vino')) catProducto = 'Vinos';
        else if (nom.includes('ron')) catProducto = 'Rones';
        else if (nom.includes('whisky') || nom.includes('whiskey')) catProducto = 'Whiskys';
        else if (nom.includes('aguardiente')) catProducto = 'Aguardientes';
        else catProducto = 'Otros';
      }

      const pasaCategoria = this.categoriaSeleccionada === 'Todas' || catProducto === this.categoriaSeleccionada;

      // 2. Filtro por búsqueda (nombre o descripción) ignorando mayúsculas/minúsculas
      const termino = this.searchTerm.toLowerCase().trim();
      const pasaBusqueda = termino === '' ||
        p.nombre.toLowerCase().includes(termino) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(termino));

      return pasaCategoria && pasaBusqueda;
    });
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
    this.cartService.updateCount(); // Actualizar badge del header

    // Toast pequeño y no invasivo en vez de popup grande
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: '#4A3728',
      color: '#fff',
      iconColor: '#ffc107'
    });
    Toast.fire({ icon: 'success', title: `${product.nombre} agregado 🛒` });
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
      this.cartService.updateCount(); // Actualizar badge del header
    }
  }

  // Elimina un producto completamente del carrito
  removeFromCart(product: Producto) {
    const index = this.carrito.findIndex(item => item.producto.nombre === product.nombre);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.saveCart();
      this.cartService.updateCount(); // Actualizar badge del header
    }
  }

  // Vacía todo el carrito y elimina los datos del navegador
  clearCart() {
    this.carrito = [];
    localStorage.removeItem('carrito_barra_oculta');
    this.cartService.updateCount(); // Actualizar badge del header
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

    // Crear arreglo simplificado para guardar en Firestore
    const itemsParaHistorial = this.carrito.map(item => ({
      nombre: item.producto.nombre,
      cantidad: item.cantidad,
      precio: item.producto.precio
    }));

    this.carrito.forEach(item => {
      const subtotal = item.producto.precio * item.cantidad;
      mensaje += `• ${item.cantidad} x ${item.producto.nombre} - ($${subtotal.toLocaleString()})\n`;
    });

    // Guardar el pedido en el historial (Firestore) silenciosamente
    this.ordersService.guardarPedido({
      fecha: new Date().toISOString(),
      total: this.total,
      items: itemsParaHistorial
    }).catch(err => console.error('Error guardando pedido:', err));

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
