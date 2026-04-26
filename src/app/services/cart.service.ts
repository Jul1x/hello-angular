/**
 * cart.service.ts - SERVICIO DEL CARRITO (Compartir estado del carrito) 🛒
 *
 * Este servicio permite que el HEADER y la página de PRODUCTOS compartan
 * la información del carrito. Así el header puede mostrar cuántos productos
 * hay en el carrito sin tener que estar en la página de productos.
 *
 * Usa BehaviorSubject para que cualquier componente que se "suscriba"
 * reciba automáticamente las actualizaciones del carrito.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject que emite la cantidad total de items en el carrito
  private cartCountSubject = new BehaviorSubject<number>(this.getCartCount());

  // Observable público para que otros componentes se suscriban
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    // Escuchar cambios en localStorage desde otras pestañas
    window.addEventListener('storage', () => {
      this.cartCountSubject.next(this.getCartCount());
    });
  }

  // Lee la cantidad total de productos del carrito guardado en localStorage
  private getCartCount(): number {
    try {
      const saved = localStorage.getItem('carrito_barra_oculta');
      if (saved) {
        const items = JSON.parse(saved);
        return items.reduce((sum: number, item: any) => sum + item.cantidad, 0);
      }
    } catch { }
    return 0;
  }

  // Método para notificar que el carrito cambió (lo llama ProductosComponent)
  updateCount() {
    this.cartCountSubject.next(this.getCartCount());
  }
}
