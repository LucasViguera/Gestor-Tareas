import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule], // Importar FormsModule para usar ngModel
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Mensaje de error si las credenciales no son correctas

  constructor(private router: Router) { }

  // Lógica de autenticación
  onSubmit() {
    if (this.username && this.password) {
      // Simulación de autenticación (puedes reemplazarla con lógica real)
      if (this.username === 'admin' && this.password === 'password') {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Credenciales incorrectas';
      }
    } else {
      this.errorMessage = 'Ambos campos son requeridos';
    }
  }
}
