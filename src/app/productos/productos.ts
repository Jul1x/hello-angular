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
    { nombre: 'Cerveza artesanal', precio: 10, descripcion: 'Cerveza hecha a mano con lúpulo especial.', img: 'assets/cerveza.jpg' },
    { nombre: 'Vino tinto', precio: 25, descripcion: 'Vino importado de excelente calidad.', img: 'assets/vino.jpg' },
    { nombre: 'Ron añejo', precio: 30, descripcion: 'Ron de 12 años, sabor intenso.', img: 'assets/ron.jpg' },
    { nombre: 'Whisky escocés', precio: 40, descripcion: 'Whisky de malta pura, edición limitada.', img: 'assets/whisky.jpg' }
  ];

  carrito: any[] = [];

  comprar(producto: any) {
    this.carrito.push(producto);
    alert(`Has agregado "${producto.nombre}" al carrito!`);
  }

  total(): number {
    return this.carrito.reduce((sum, p) => sum + p.precio, 0);
  }
}
