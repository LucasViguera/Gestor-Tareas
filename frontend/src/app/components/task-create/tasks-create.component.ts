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
  assignee: string = '';  // Asegúrate de que 'assignee' esté correctamente definido
  userId: number = 0;
  errorMessage: string | null = null;

  users: any[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'Por favor, inicia sesión para crear tareas.';
      return;
    }

    this.userService.getUsers().subscribe({
      next: (response: any[]) => {
        this.users = response;
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
    if (taskForm.valid) {
      const newTask: Task = {
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        priority: this.priority,
        assignee: this.assignee,  // Asegúrate de que 'assignee' sea correctamente asignado
        userId: this.userId
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
