import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';  // Importamos SweetAlert2

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],  // Importa módulos necesarios
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
  
      // Aseguramos que los valores de username, email y password no sean null ni undefined
      const username = formData.username!;
      const email = formData.email!;
      const password = formData.password!;
  
      this.authService.register({ username, email, password }).subscribe({
        next: (response) => {
          console.log('Usuario registrado', response);
          
          // Usamos SweetAlert2 para mostrar un mensaje de éxito
          Swal.fire({
            title: 'Registro exitoso',
            text: '¡Bienvenido a nuestra plataforma!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#f0f8ff',
            confirmButtonColor: '#3085d6',
            timer: 2500  // La alerta se cierra automáticamente después de 2.5 segundos
          });
          this.router.navigate(['/task-create']); 
        },
        error: (error) => {
          console.error('Error en el registro', error);
          
          // Usamos SweetAlert2 para mostrar un mensaje de error
          Swal.fire({
            title: 'Error en el registro',
            text: 'Hubo un problema con el registro. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            background: '#f8d7da',
            confirmButtonColor: '#d33',
            timer: 2500  // La alerta se cierra automáticamente después de 2.5 segundos
          });
        },
        complete: () => {
          console.log('La solicitud de registro ha finalizado.');
        }
      });
    }
  }
}
