import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-create',
  templateUrl: './tasks-create.component.html',
  standalone: true,
  styleUrls: ['./tasks-create.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TaskCreateComponent implements OnInit {
  title: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  priority: string = 'media';
  assignee: any;
  userId: number | null = null;
  errorMessage: string | null = null;
  completed: boolean;

  users: any[] = [];  // Aquí se guardarán los usuarios obtenidos
  selectedUser: any;   // Aquí se guardará el usuario seleccionado en el dropdown

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.completed = false;
  }

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'Por favor, inicia sesión para crear tareas.';
      return;
    }

    // Obtener el userId del servicio AuthService
    this.userId = this.authService.getUserId();
    
    if (!this.userId) {
      this.errorMessage = 'No se pudo obtener el usuario autenticado. Por favor, inicia sesión nuevamente.';
      return;
    }

    // Cargar los usuarios
    this.userService.getUsers().subscribe({
      next: (response: any[]) => {
        this.users = response;  // Almacenar usuarios obtenidos
        console.log(this.users);
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
        this.errorMessage = 'Hubo un problema al cargar los usuarios.';
      },
      complete: () => {
        console.log('La solicitud de carga de usuarios ha finalizado.');
      }
    });
  }

  onSubmit(taskForm: NgForm) {
    // Permitir enviar el formulario incluso si no hay asignado
    if (taskForm.valid) {
      // Si no hay un usuario asignado, dejar el campo 'assignee' como null
      const newTask: Omit<Task, 'id'> = {  // Omitimos 'id' aquí
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        priority: this.priority,
        assignee: this.assignee || null, // Si no hay asignado, establecerlo como null
        userId: this.userId!, // Aquí usamos '!' para asegurar que no sea null
        completed: this.completed,
      };
  
      this.taskService.saveTask(newTask).subscribe({
        next: (response: any) => {
          console.log('Tarea creada:', response);
          taskForm.resetForm();
          this.errorMessage = null;
        },
        error: (error: any) => {
          console.error('Error al crear tarea:', error);
          this.errorMessage = 'Ocurrió un error al crear la tarea. Intenta nuevamente.';
        },
        complete: () => {
          console.log('La solicitud de creación de tarea ha finalizado.');
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos antes de crear la tarea.';
    }
  }
  
}
