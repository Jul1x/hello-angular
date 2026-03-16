import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, addDoc, deleteDoc, doc, getDocs, updateDoc
} from '@angular/fire/firestore';

export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
  descripcion: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private firestore = inject(Firestore);
  private collectionName = 'productos';

  // Leer todos los productos de Firestore
  async getProductos(): Promise<Producto[]> {
    const col = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(col);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Producto));
  }

  // Agregar un producto nuevo
  async addProducto(producto: Omit<Producto, 'id'>): Promise<void> {
    const col = collection(this.firestore, this.collectionName);
    await addDoc(col, producto);
  }

  // Eliminar un producto por su ID
  async deleteProducto(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  // Actualizar un producto existente
  async updateProducto(id: string, data: Partial<Producto>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, data);
  }

  // Subir los productos iniciales (se usa una sola vez)
  async seedProducts(): Promise<void> {
    const productosIniciales: Omit<Producto, 'id'>[] = [
      { nombre: 'Cerveza Corona Extra x6und', precio: 25600, descripcion: 'Refrescante cerveza mexicana, ligera y suave, ideal para disfrutar con limón y sal.', img: 'assets/cerveza.jpg' },
      { nombre: 'Vino Tinto Bordeaux', precio: 26392, descripcion: 'Vino elegante de origen francés, con cuerpo y sabor intenso, perfecto para acompañar carnes y quesos.', img: 'assets/vino.jpg' },
      { nombre: 'Ron Viejo de Caldas', precio: 55000, descripcion: 'Tradicional ron colombiano, con notas dulces y suaves, ideal para cócteles o disfrutar solo.', img: 'assets/ron.jpg' },
      { nombre: 'Whiskey Jack Daniel\'s Tennessee', precio: 129700, descripcion: 'Clásico whiskey americano con sabor ahumado y robusto, perfecto para quienes disfrutan tragos fuertes.', img: 'assets/whisky.jpg' },
      { nombre: 'Cerveza Budweiser Lata 1614 ml x6und', precio: 12665, descripcion: 'Cerveza americana de sabor equilibrado y final refrescante, perfecta para reuniones y celebraciones.', img: 'assets/cerveza1.jpg' },
      { nombre: 'Vino Blanco Ramón Bilbao Verdejo', precio: 77700, descripcion: 'Vino español fresco y afrutado, con notas cítricas y herbales, ideal para mariscos, pescados y ensaladas.', img: 'assets/vino1.webp' },
      { nombre: 'Ron Viejo De Caldas Roble Blanco', precio: 43600, descripcion: 'Ron colombiano añejado en roble blanco, con matices suaves y dulces, excelente para coctelería y consumo directo.', img: 'assets/ron1.webp' },
      { nombre: 'Whisky Old Parr 12 Años Blended', precio: 149900, descripcion: 'Whisky escocés suave y equilibrado, con notas de miel y frutos secos, ideal para disfrutar en las rocas.', img: 'assets/whisky1.webp' }
    ];

    for (const p of productosIniciales) {
      await this.addProducto(p);
    }
  }
}
