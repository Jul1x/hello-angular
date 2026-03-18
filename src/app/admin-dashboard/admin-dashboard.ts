/**
 * admin-dashboard.ts - PANEL DE ADMINISTRACIÓN (CRUD de Productos) 📦
 *
 * Este componente es el "cerebro" del panel de administrador.
 * Permite al admin logueado: Ver, Crear, Editar y Eliminar productos.
 *
 * Los productos se manejan directamente contra Firestore (la nube de Google).
 * Cada acción que el admin hace aquí se refleja EN TIEMPO REAL en la tienda pública.
 *
 * Servicios que utiliza:
 * - AuthService     → Para cerrar sesión
 * - ProductsService → Para las operaciones CRUD en Firestore
 * - Router          → Para navegar a la página de login cuando se cierra sesión
 */
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';   // Necesario para [(ngModel)] en los inputs del formulario
import { CommonModule } from '@angular/common'; // Necesario para @if, @for, pipes como | number
import { AuthService } from '../services/auth.service';
import { ProductsService, Producto } from '../services/products.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  // Inyección de servicios usando el patrón moderno de Angular (inject)
  private authService = inject(AuthService);       // Para manejar logout
  private productsService = inject(ProductsService); // Para operaciones CRUD en Firestore
  private router = inject(Router);                   // Para redirigir al login

  productos: Producto[] = []; // Lista de productos cargados desde Firestore
  loading = true;             // Indica si se están cargando los productos (muestra "Cargando...")

  // Objeto que almacena los datos del formulario (tanto para crear como para editar)
  nuevoProducto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    img: ''
  };

  showForm = false;                       // Controla si el formulario es visible o no
  saving = false;                         // Indica si se está guardando (para desactivar el botón)
  editingProductId: string | null = null; // Si tiene un ID, estamos EDITANDO; si es null, estamos CREANDO

  // ngOnInit: Se ejecuta automáticamente cuando el componente se carga por primera vez
  ngOnInit() {
    this.loadProducts();
  }

  // Carga todos los productos desde Firestore y los guarda en la variable "productos"
  async loadProducts() {
    this.loading = true;
    this.productos = await this.productsService.getProductos();
    this.loading = false;
  }

  /**
   * GUARDAR PRODUCTO (Crear o Actualizar)
   * Si editingProductId tiene un valor → estamos EDITANDO un producto existente
   * Si editingProductId es null → estamos CREANDO un producto nuevo
   */
  async saveProduct() {
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) {
      alert('El nombre y precio son obligatorios.');
      return;
    }

    this.saving = true;
    try {
      if (this.editingProductId) {
        // MODO EDICIÓN: Actualiza el producto existente en Firestore
        await this.productsService.updateProducto(this.editingProductId, this.nuevoProducto);
      } else {
        // MODO CREACIÓN: Agrega un producto nuevo a Firestore
        await this.productsService.addProducto(this.nuevoProducto);
      }
      this.cancelEdit();        // Limpia el formulario y lo oculta
      await this.loadProducts(); // Recarga la lista para ver los cambios
    } catch (err) {
      console.error('Error guardando producto:', err);
      alert('Error al guardar el producto.');
    } finally {
      this.saving = false; // Reactiva el botón de guardar sin importar si hubo error o no
    }
  }

  /**
   * EDITAR PRODUCTO: Carga los datos de un producto existente en el formulario.
   * Al llamar a saveProduct() después, detectará que editingProductId tiene un valor
   * y actualizará en vez de crear uno nuevo.
   */
  editProduct(producto: Producto) {
    this.editingProductId = producto.id!; // Guardar el ID del producto que estamos editando
    this.nuevoProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      img: producto.img
    };
    this.showForm = true; // Mostrar el formulario con los datos cargados
  }

  /**
   * CANCELAR EDICIÓN / MOSTRAR FORMULARIO NUEVO
   * Tiene doble función:
   * - Si el formulario está oculto y NO estamos editando → abre el formulario vacío (para crear)
   * - Si el formulario está visible → lo cierra y limpia todos los campos
   */
  cancelEdit() {
    if (!this.showForm && !this.editingProductId) {
      this.showForm = true; // Abrir formulario vacío para crear producto nuevo
    } else {
      this.nuevoProducto = { nombre: '', precio: 0, descripcion: '', img: '' };
      this.showForm = false;
      this.editingProductId = null; // Resetear modo edición
    }
  }

  // ELIMINAR PRODUCTO: Pide confirmación y luego borra el producto de Firestore
  async deleteProduct(id: string) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await this.productsService.deleteProducto(id); // Borra de la nube
      await this.loadProducts();                      // Recarga la lista
    } catch (err) {
      console.error('Error eliminando producto:', err);
      alert('Error al eliminar el producto.');
    }
  }

  // CERRAR SESIÓN: Desconecta al admin y lo redirige al formulario de login
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
