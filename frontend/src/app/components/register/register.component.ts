import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Validar: password === confirmPassword
const passwordsMatch = (passCtrl: string, confirmCtrl: string): ValidatorFn => {
  return (group: AbstractControl) => {
    const a = group.get(passCtrl);
    const b = group.get(confirmCtrl);
    if (!a || !b) return null;

    if (b.errors && !b.errors['mismatch']) return null;

    if (a.value !== b.value) {
      b.setErrors({ mismatch: true });
    } else {
      b.setErrors(null);
    }
    return null;
  };
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: passwordsMatch('password', 'confirmPassword') }
  );

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { username, email, password } = this.registerForm.value;
    this.authService.register({ username: username!, email: email!, password: password! }).subscribe({
      next: () => {
        Swal.fire({
          title: 'Registro exitoso',
          text: '¡Bienvenido a nuestra plataforma!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          background: '#f0f8ff',
          confirmButtonColor: '#3085d6',
          timer: 2500
        });
        this.router.navigate(['/task-create']);
      },
      error: () => {
        Swal.fire({
          title: 'Error en el registro',
          text: 'Hubo un problema con el registro. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          background: '#f8d7da',
          confirmButtonColor: '#d33',
          timer: 2500
        });
      }
    });
  }
}
