import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';  
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = []; 
  loading: boolean = false;  
  showUsersList: boolean = false;  
  errorMessage: string = ''; 
  successMessage: string = '';  
  
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificamos si el usuario está autenticado antes de cargar los datos
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); 
    }
  }

  // Método para obtener los usuarios
  getUsers() {
    this.loading = true; 
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false; 
        this.showUsersList = true;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar usuarios. Intenta nuevamente más tarde.';
        this.loading = false;
        this.showUsersList = false; 
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
                      icon: 'warning', 
                      confirmButtonText: 'Aceptar',  
                      background: '#f0f8ff', 
                      confirmButtonColor: '#3085d6',  
                      timer: 2500 
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
