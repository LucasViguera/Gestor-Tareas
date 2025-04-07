import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';  // Asegúrate de tener el servicio AuthService
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';  // Importamos SweetAlert2

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];  // Lista de usuarios cargados
  loading: boolean = false;  // Para controlar el estado de carga
  showUsersList: boolean = false;  // Para controlar la visibilidad de la lista de usuarios
  errorMessage: string = '';  // Para almacenar mensajes de error
  successMessage: string = '';  // Para almacenar mensajes de éxito
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificamos si el usuario está autenticado antes de cargar los datos
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirigir al usuario al login
    }
  }

  // Método para obtener los usuarios
  getUsers() {
    this.loading = true; // Indicamos que la carga ha comenzado
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false; // Carga terminada
        this.showUsersList = true; // Mostramos la lista de usuarios después de la carga exitosa
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar usuarios. Intenta nuevamente más tarde.';
        this.loading = false; // Carga terminada en caso de error
        this.showUsersList = false; // No mostrar la lista de usuarios si hubo error
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  // Método para eliminar un usuario
  deleteUser(userId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.loading = true;
  
      this.userService.deleteUser(userId).subscribe({
        next: () => {
                    Swal.fire({
                      title: 'Usuario eliminado',
                      text: '',
                      icon: 'warning',  // Tipo de alerta (success, error, warning, info, question)
                      confirmButtonText: 'Aceptar',  // Texto del botón
                      background: '#f0f8ff',  // Fondo de la alerta
                      confirmButtonColor: '#3085d6',  // Color del botón
                      timer: 2500  // Cierra la alerta automáticamente después de 2.5 segundos
                    });
                    
          this.users = this.users.filter(user => user.id !== userId);
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error al eliminar usuario. Intenta nuevamente más tarde.';
          console.error('Error al eliminar usuario:', err);
          this.loading = false;
        }
      });
    }
  }
}
