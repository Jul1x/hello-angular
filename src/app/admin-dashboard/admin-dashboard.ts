import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  private authService = inject(AuthService);
  private productsService = inject(ProductsService);
  private router = inject(Router);

  productos: Producto[] = [];
  loading = true;

  // Formulario para nuevo producto
  nuevoProducto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    img: ''
  };

  showForm = false;
  saving = false;
  editingProductId: string | null = null;

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;
    this.productos = await this.productsService.getProductos();
    this.loading = false;
  }

  async saveProduct() {
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) {
      alert('El nombre y precio son obligatorios.');
      return;
    }

    this.saving = true;
    try {
      if (this.editingProductId) {
        await this.productsService.updateProducto(this.editingProductId, this.nuevoProducto);
      } else {
        await this.productsService.addProducto(this.nuevoProducto);
      }
      this.cancelEdit();
      await this.loadProducts();
    } catch (err) {
      console.error('Error guardando producto:', err);
      alert('Error al guardar el producto.');
    } finally {
      this.saving = false;
    }
  }

  editProduct(producto: Producto) {
    this.editingProductId = producto.id!;
    this.nuevoProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      img: producto.img
    };
    this.showForm = true;
  }

  cancelEdit() {
    if (!this.showForm && !this.editingProductId) {
      this.showForm = true; // Si está oculto, simplemente lo mostramos para agregar nuevo
    } else {
      this.nuevoProducto = { nombre: '', precio: 0, descripcion: '', img: '' };
      this.showForm = false;
      this.editingProductId = null;
    }
  }

  async deleteProduct(id: string) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await this.productsService.deleteProducto(id);
      await this.loadProducts();
    } catch (err) {
      console.error('Error eliminando producto:', err);
      alert('Error al eliminar el producto.');
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
