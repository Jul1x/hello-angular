import { Injectable } from '@angular/core';

export interface Producto {
    nombre: string;
    precio: number; // Changed to number for correct math
    descripcion: string;
    img: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private productos: Producto[] = [
        { nombre: 'Cerveza Corona Extra x6und', precio: 25600, descripcion: 'Refrescante cerveza mexicana, ligera y suave, ideal para disfrutar con limón y sal.', img: 'assets/cerveza.jpg' },
        { nombre: 'Vino Tinto Bordeaux', precio: 26392, descripcion: 'Vino elegante de origen francés, con cuerpo y sabor intenso, perfecto para acompañar carnes y quesos.', img: 'assets/vino.jpg' },
        { nombre: 'Ron Viejo de Caldas', precio: 55000, descripcion: 'Tradicional ron colombiano, con notas dulces y suaves, ideal para cócteles o disfrutar solo', img: 'assets/ron.jpg' },
        { nombre: 'Whiskey Jack Daniel’s Tennessee', precio: 129700, descripcion: 'Clásico whiskey americano con sabor ahumado y robusto, perfecto para quienes disfrutan tragos fuertes.', img: 'assets/whisky.jpg' },
        { nombre: 'Cerveza Budweiser Lata 1614 ml x6und', precio: 12665, descripcion: 'Cerveza americana de sabor equilibrado y final refrescante, perfecta para reuniones y celebraciones.', img: 'assets/cerveza1.jpg' },
        { nombre: 'Vino Blanco Ramón Bilbao Verdejo', precio: 77700, descripcion: 'Vino español fresco y afrutado, con notas cítricas y herbales, ideal para mariscos, pescados y ensaladas.', img: 'assets/vino1.webp' },
        { nombre: 'Ron Viejo De Caldas Roble Blanco', precio: 43600, descripcion: 'Ron colombiano añejado en roble blanco, con matices suaves y dulces, excelente para coctelería y consumo directo.', img: 'assets/ron1.webp' },
        { nombre: 'Whisky Old Parr 12 Años Blended', precio: 149900, descripcion: 'Whisky escocés añejado 12 años, con notas de miel, frutas secas y un toque ahumado, distinguido y elegante.', img: 'assets/whisky1.webp' }
    ];

    constructor() { }

    getProductos(): Producto[] {
        return this.productos;
    }
}
