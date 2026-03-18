/**
 * products.service.ts - SERVICIO DE PRODUCTOS (CRUD en la Nube) 📦☁️
 *
 * Este es uno de los archivos MÁS IMPORTANTES del proyecto.
 * Se conecta directamente a FIRESTORE (la base de datos en la nube de Google)
 * para Crear, Leer, Actualizar y Eliminar productos (operaciones "CRUD").
 *
 * 🌐 ¿DÓNDE ESTÁN GUARDADOS LOS PRODUCTOS?
 * Los productos NO están en tu computadora. Están en los servidores de Google,
 * específicamente en Firestore (una base de datos NoSQL). Cuando abres tu página
 * desde cualquier dispositivo del mundo, los productos se descargan de la nube.
 *
 * Estructura en Firestore:
 *   📁 Base de datos
 *    └── 📂 Colección: "productos"
 *         ├── 📄 Documento 1: { nombre: "Cerveza Corona", precio: 25600, ... }
 *         ├── 📄 Documento 2: { nombre: "Vino Tinto", precio: 26392, ... }
 *         └── 📄 Documento N: { nombre: "...", precio: ..., ... }
 *
 * Cada documento tiene un ID único generado automáticamente por Firebase (ej: "xK3mN9pQ").
 */
import { Injectable, inject } from '@angular/core';
import {
  Firestore, collection, collectionData, addDoc, deleteDoc, doc, getDocs, updateDoc
} from '@angular/fire/firestore';

/**
 * Interface "Producto" - Define la FORMA que tiene cada producto
 * TypeScript usa esto para validar que siempre pasemos datos correctos.
 * El "id?" con signo de interrogación significa que es OPCIONAL
 * (cuando creamos un producto nuevo, aún no tiene ID; Firestore se lo asigna después).
 */
export interface Producto {
  id?: string;       // ID único del documento en Firestore (lo asigna Google automáticamente)
  nombre: string;    // Nombre del producto (ej: "Cerveza Corona Extra x6und")
  precio: number;    // Precio en pesos colombianos SIN decimales (ej: 25600)
  descripcion: string; // Texto descriptivo del producto
  img: string;       // URL de la imagen (puede ser local "assets/..." o un link de internet)
}

@Injectable({
  providedIn: 'root' // Disponible globalmente: cualquier componente puede usar este servicio
})
export class ProductsService {
  // inject(Firestore) obtiene la conexión a la base de datos configurada en app.config.ts
  private firestore = inject(Firestore);
  private collectionName = 'productos'; // Nombre de la colección en Firestore

  /**
   * LEER: Obtiene TODOS los productos de la colección "productos" en Firestore.
   * 1. Accede a la colección "productos"
   * 2. Descarga una "foto" (snapshot) de todos los documentos
   * 3. Convierte cada documento a nuestro formato Producto (con su ID incluido)
   */
  async getProductos(): Promise<Producto[]> {
    const col = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(col);
    return snapshot.docs.map(doc => ({
      id: doc.id,       // Extraemos el ID del documento
      ...doc.data()     // Extraemos los campos (nombre, precio, etc.)
    } as Producto));
  }

  /**
   * CREAR: Agrega un producto NUEVO a Firestore.
   * Omit<Producto, 'id'> significa: "acepta un Producto pero sin el campo id"
   * (porque Firestore genera el ID automáticamente).
   */
  async addProducto(producto: Omit<Producto, 'id'>): Promise<void> {
    const col = collection(this.firestore, this.collectionName);
    await addDoc(col, producto); // addDoc = agregar documento nuevo
  }

  /**
   * ELIMINAR: Borra un producto de Firestore usando su ID único.
   * doc() busca el documento exacto por su ID, y deleteDoc() lo elimina.
   */
  async deleteProducto(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  /**
   * ACTUALIZAR: Modifica los campos de un producto existente.
   * Partial<Producto> significa: "puedes enviar solo ALGUNOS campos, no todos"
   * (útil si solo quieres cambiar el precio sin tocar el nombre).
   */
  async updateProducto(id: string, data: Partial<Producto>): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, data);
  }

  /**
   * SEMILLA: Método que se usó UNA SOLA VEZ para subir los 8 productos iniciales
   * desde el código local a Firestore. Ya no se necesita ejecutar de nuevo porque
   * los productos ya están en la nube. Se conserva como referencia.
   */
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
