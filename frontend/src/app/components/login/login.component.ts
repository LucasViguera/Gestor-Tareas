import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),  
    password: new FormControl<string>('', Validators.required)  
  });

  loading: boolean = false;  
  errorMessage: string | null = null; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const email = formData.email!;
      const password = formData.password!;
      this.loading = true;
      this.errorMessage = null;  
  
      // Llamamos al servicio de login con los valores asegurados
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          localStorage.setItem('token', response.token);
        
          Swal.fire({
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido!',
            icon: 'success',  // Tipo de alerta (success, error, warning, info, question)
            confirmButtonText: 'Aceptar', 
            background: '#f0f8ff', 
            confirmButtonColor: '#3085d6', 
            timer: 2500  
          });
          
        
          this.router.navigate(['/task']); 
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
          

          Swal.fire({
            title: 'Error',
            text: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        },
        complete: () => {
          this.loading = false; 
          console.log('La solicitud de inicio de sesión ha finalizado.');
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
