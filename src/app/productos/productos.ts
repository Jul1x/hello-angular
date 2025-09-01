import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent {
  productos = [
    { nombre: 'Cerveza Corona Extra x6und', precio: 25.600, descripcion: 'Refrescante cerveza mexicana, ligera y suave, ideal para disfrutar con limón y sal.', img: 'assets/cerveza.jpg' },
    { nombre: 'Vino Tinto Bordeaux', precio: 26.392, descripcion: 'Vino elegante de origen francés, con cuerpo y sabor intenso, perfecto para acompañar carnes y quesos.', img: 'assets/vino.jpg' },
    { nombre: 'Ron Viejo de Caldas', precio: 55.000, descripcion: 'Tradicional ron colombiano, con notas dulces y suaves, ideal para cócteles o disfrutar solo', img: 'assets/ron.jpg' },
    { nombre: 'Whiskey Jack Daniel’s Tennessee', precio: 129.700, descripcion: 'Clásico whiskey americano con sabor ahumado y robusto, perfecto para quienes disfrutan tragos fuertes.', img: 'assets/whisky.jpg' }
  ];

  carrito: any[] = [];

  comprar(producto: any) {
    this.carrito.push(producto);
  }

  eliminar(producto: any) {
    this.carrito = this.carrito.filter(p => p !== producto);
  }

  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    alert('Carrito guardado en localStorage!');
  }

  total(): number {
    return this.carrito.reduce((sum, p) => sum + p.precio, 0);
  }
}