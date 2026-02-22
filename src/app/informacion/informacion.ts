import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-informacion',
  imports: [RouterModule, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './informacion.html',
  styleUrl: './informacion.css'
})
export class InformacionComponent {

  // Datos del formulario
  nombre = '';
  email = '';
  mensaje = '';

  // Estado del envío
  enviando = false;
  enviado = false;
  error = false;

  async enviarMensaje() {
    if (!this.nombre || !this.email || !this.mensaje) {
      alert('Por favor completa todos los campos.');
      return;
    }

    this.enviando = true;
    this.enviado = false;
    this.error = false;

    try {
      await emailjs.send(
        'service_xysnnj4',
        'template_imtbmtr',
        {
          subject_title: 'Nuevo pedido - La Barra Oculta',
          cliente_nombre: this.nombre,
          cliente_correo: this.email,
          cliente_mensaje: this.mensaje,
          fecha_hora: new Date().toLocaleString()
        },
        'DbOVitencHKBXbeCQ'
      );

      this.enviado = true;
      // Limpiar formulario
      this.nombre = '';
      this.email = '';
      this.mensaje = '';

    } catch (err) {
      console.error('Error enviando el mensaje:', err);
      this.error = true;
    } finally {
      this.enviando = false;
    }
  }
}
