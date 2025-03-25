import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';  // Para redirigir al usuario
import Swal from 'sweetalert2';  // Importamos SweetAlert2

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule ],  // Importa módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),  // Tipo string explícito
    password: new FormControl<string>('', Validators.required)  // Tipo string explícito
  });

  loading: boolean = false;  // Para manejar el estado de carga
  errorMessage: string | null = null;  // Para mostrar el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      // Aseguramos que los valores de email y password no sean null o undefined
      const email = formData.email!;
      const password = formData.password!;
  
      // Mostrar el estado de carga mientras se hace la solicitud
      this.loading = true;
      this.errorMessage = null;  // Limpiar mensajes de error anteriores
  
      // Llamamos al servicio de login con los valores asegurados
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          localStorage.setItem('token', response.token);
          
          // Usamos SweetAlert2 para mostrar un mensaje de éxito
          Swal.fire({
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido!',
            icon: 'success',  // Tipo de alerta (success, error, warning, info, question)
            confirmButtonText: 'Aceptar',  // Texto del botón
            background: '#f0f8ff',  // Fondo de la alerta
            confirmButtonColor: '#3085d6',  // Color del botón
            timer: 2500  // Cierra la alerta automáticamente después de 2.5 segundos
          });
          
          
          // Redirigir al usuario después de un inicio de sesión exitoso
          this.router.navigate(['/task']);  // Redirigir a una página, como el panel de tareas
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
          
          // Usamos SweetAlert2 para mostrar un mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        },
        complete: () => {
          this.loading = false;  // Detener el estado de carga
          console.log('La solicitud de inicio de sesión ha finalizado.');
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
