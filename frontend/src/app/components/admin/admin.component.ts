import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';  // Asegúrate de tener el servicio AuthService

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
    private authService: AuthService  // Inyectamos el servicio Auth
  ) {}

  ngOnInit(): void {
    // Verificamos si el usuario está autenticado antes de cargar los datos
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'No tienes permisos para acceder a esta página. Por favor, inicia sesión.';
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
        this.successMessage = 'Usuarios cargados exitosamente.';  // Mensaje de éxito
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
    // Confirmamos que el usuario realmente desea eliminarlo
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.loading = true;  // Indicamos que estamos en proceso de eliminación
  
      // Llamamos al servicio para eliminar el usuario
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          // Si la eliminación es exitosa, mostramos un mensaje y recargamos la lista de usuarios
          this.successMessage = 'Usuario eliminado con éxito.';
          this.getUsers();  // Recargamos la lista de usuarios
        },
        error: (err) => {
          // Si ocurre un error, mostramos un mensaje de error
          this.errorMessage = 'Error al eliminar usuario. Intenta nuevamente más tarde.';
          console.error('Error al eliminar usuario:', err);
          this.loading = false;  // Termina el estado de carga
        }
      });
    }
  }
  // Método para editar un usuario (puedes agregar un formulario o lógica aquí)
  editUser(userId: number) {
    console.log('Editar usuario con id:', userId);
    // Aquí podrías redirigir a una página de edición o abrir un modal
  }
}
