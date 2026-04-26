import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';

export interface PedidoItem {
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Pedido {
  id?: string;
  fecha: string;      // Fecha en formato ISO
  total: number;      // Valor total del pedido
  items: PedidoItem[];// Qué productos pidió y cuántos
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private firestore = inject(Firestore);
  private collectionName = 'pedidos';

  /**
   * Guarda un nuevo pedido en Firestore (se llama justo antes de abrir WhatsApp)
   */
  async guardarPedido(pedido: Omit<Pedido, 'id'>): Promise<void> {
    const col = collection(this.firestore, this.collectionName);
    await addDoc(col, pedido);
  }

  /**
   * Obtiene todo el historial de pedidos para el panel de administración.
   * Se ordenan localmente de más reciente a más antiguo.
   */
  async getPedidos(): Promise<Pedido[]> {
    const col = collection(this.firestore, this.collectionName);
    const snapshot = await getDocs(col);
    const pedidos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Pedido));

    // Ordenar de más reciente a más antiguo
    return pedidos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }
}
