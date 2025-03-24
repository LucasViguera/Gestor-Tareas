import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: any[] = [];  // Lista de usuarios cargados
  loading: boolean = false;  // Para controlar el estado de carga
  showUsersList: boolean = false;  // Controla la visibilidad de la lista de usuarios
  
  constructor(private userService: UserService) {}

  // Método para obtener los usuarios
  getUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.showUsersList = true;  // Mostrar la lista de usuarios
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.loading = false;
      }
    });
  }

  // Método para eliminar un usuario
  deleteUser(userId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          // Vuelve a cargar la lista de usuarios después de eliminar uno
          this.getUsers();
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
        }
      });
    }
  }

  // Método para actualizar la lista de usuarios
  refreshUsers() {
    this.getUsers();
  }

  // Método para editar un usuario (puedes agregar un formulario o lógica aquí)
  editUser(userId: number) {
    console.log('Editar usuario con id:', userId);
    // Aquí podrías redirigir a una página de edición o abrir un modal
  }
}
