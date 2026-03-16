import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
  loading = false;

  async onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Completa todos los campos.';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/admin/dashboard']);
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        this.error = 'Correo o contraseña incorrectos.';
      } else {
        this.error = 'Error al iniciar sesión. Intenta de nuevo.';
      }
    } finally {
      this.loading = false;
    }
  }
}
