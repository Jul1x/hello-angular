import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

export interface Producto {
  nombre: string;
  precio: number;
  descripcion: string;
  img: string;
}
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent {
  productos = [
    { nombre: 'Cerveza Corona Extra x6und', precio: 25.600, descripcion: 'Refrescante cerveza mexicana, ligera y suave, ideal para disfrutar con limón y sal.', img: 'assets/cerveza.jpg' },
    { nombre: 'Vino Tinto Bordeaux', precio: 26.392, descripcion: 'Vino elegante de origen francés, con cuerpo y sabor intenso, perfecto para acompañar carnes y quesos.', img: 'assets/vino.jpg' },
    { nombre: 'Ron Viejo de Caldas', precio: 55.000, descripcion: 'Tradicional ron colombiano, con notas dulces y suaves, ideal para cócteles o disfrutar solo', img: 'assets/ron.jpg' },
    { nombre: 'Whiskey Jack Daniel’s Tennessee', precio: 129.700, descripcion: 'Clásico whiskey americano con sabor ahumado y robusto, perfecto para quienes disfrutan tragos fuertes.', img: 'assets/whisky.jpg' },
    { nombre: 'Cerveza Budweiser Lata 1614 ml x6und', precio: 12.665, descripcion: 'Cerveza americana de sabor equilibrado y final refrescante, perfecta para reuniones y celebraciones.', img: 'assets/cerveza1.jpg' },
    { nombre: 'Vino Blanco Ramón Bilbao Verdejo', precio: 77.700, descripcion: 'Vino español fresco y afrutado, con notas cítricas y herbales, ideal para mariscos, pescados y ensaladas.', img: 'assets/vino1.webp' },
    { nombre: 'Ron Viejo De Caldas Roble Blanco', precio: 43.600, descripcion: 'Ron colombiano añejado en roble blanco, con matices suaves y dulces, excelente para coctelería y consumo directo.', img: 'assets/ron1.webp' },
    { nombre: 'Whisky Old Parr 12 Años Blended', precio: 149.900, descripcion: 'Whisky escocés añejado 12 años, con notas de miel, frutas secas y un toque ahumado, distinguido y elegante.', img: 'assets/whisky1.webp' }
  ];

  carrito: any[] = [];

  comprar(producto: any) {
    this.carrito.push(producto);
  }

  eliminar(producto: any) {
    const index = this.carrito.indexOf(producto);
    if (index > -1) {
      const nuevoCarrito = [...this.carrito];
      nuevoCarrito.splice(index, 1);
      this.carrito = nuevoCarrito;
    }
  }

  guardar() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    alert('Carrito guardado en localStorage!');
  }

  total(): number {
    return this.carrito.reduce((sum, p) => sum + p.precio, 0);
  }
}