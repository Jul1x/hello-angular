import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'; // Librería de popups modernos

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
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos antes de enviar.',
        confirmButtonColor: '#f0a500'
      });
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
