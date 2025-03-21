// src/app/components/task-create/task-create.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { UserService } from '../../services/user.service'; // Importar el servicio UserService
import { AuthService } from '../../services/auth.service'; // Importar el servicio AuthService
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
  assignee: string = '';
  userId: number = 0;
  errorMessage: string | null = null;

  users: any[] = []; // Definir la propiedad users

  constructor(
    private taskService: TaskService,
    private userService: UserService, // Inyectar el UserService
    private authService: AuthService // Inyectar el AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'Por favor, inicia sesión para crear tareas.';
      return;
    }

    // Llamar al servicio para obtener los usuarios cuando se cargue el componente
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response; // Asignar la lista de usuarios a la propiedad 'users'
      },
      (error: any) => {
        console.error('Error al obtener usuarios:', error);
        this.errorMessage = 'Hubo un problema al cargar los usuarios.';
      }
    );
  }

  onSubmit(taskForm: NgForm) {
    if (taskForm.valid) {
      const newTask: Task = {
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        priority: this.priority,
        assignee: this.assignee,
        userId: this.userId // Usar el userId seleccionado para la tarea
      };

      // Usar el servicio para guardar la tarea
      this.taskService.saveTask(newTask).subscribe(
        (response: any) => {
          console.log('Tarea creada:', response);
          taskForm.resetForm();
          this.errorMessage = null;
        },
        (error: any) => {
          console.error('Error al crear tarea:', error);
          this.errorMessage = 'Ocurrió un error al crear la tarea. Intenta nuevamente.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos antes de crear la tarea.';
    }
  }
}
