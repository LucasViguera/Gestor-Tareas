import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';



import Swal from 'sweetalert2';

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
  assigneeId: number | null = null;
  errorMessage: string | null = null;
  completed: number = 0;

  users: any[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService

  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response: any[]) => {
        this.users = response || [];
        console.log('Usuarios cargados:', this.users);
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
        this.errorMessage = 'Hubo un problema al cargar los usuarios.';
      },
      complete: () => {
        console.log('Carga de usuarios completada.');
      }
    });
  }

  handleError(error: any) {
    console.error('Error en la solicitud:', error);
  
    if (error.status === 400) {
      this.errorMessage = 'Solicitud inválida. Verifica los datos ingresados.';
    } else if (error.status === 401) {
      this.errorMessage = 'No estás autorizado para realizar esta acción.';
    } else if (error.status === 404) {
      this.errorMessage = 'Recurso no encontrado.';
    } else if (error.status === 500) {
      this.errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
    } else {
      this.errorMessage = error.error?.message || 'Ocurrió un error inesperado.';
    }
  }

  onSubmit(taskForm: NgForm) {
    if (!taskForm.valid) {
      this.errorMessage = 'Por favor, completa todos los campos antes de crear la tarea.';
      return;
    }
  
    if (!this.assigneeId) {
      this.errorMessage = 'Por favor, selecciona un usuario asignado.';
      return;
    }
  
    const startDateFormatted = this.formatDate(this.startDate);
    const endDateFormatted = this.formatDate(this.endDate);
  
    if (!startDateFormatted || !endDateFormatted) {
      this.errorMessage = 'Las fechas ingresadas no son válidas.';
      return;
    }
  
    const newTask: Omit<Task, 'id' | 'assignee'> & { assigneeId: number | null } = {
      title: this.title.trim(),
      description: this.description.trim(),
      startDate: this.startDate,
      endDate: this.endDate,
      priority: this.priority,
      assigneeId: this.assigneeId ?? null,
      completed: 0,
    };
    
  
    this.taskService.saveTask(newTask).subscribe({
      next: (_response: any) => {
        taskForm.resetForm();
        this.errorMessage = null;
  

        Swal.fire({
          title: 'Éxito',
          text: '¡La tarea ha sido registrada correctamente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error: any) => this.handleError(error),
      complete: () => {
        console.log('Solicitud de creación de tarea completada.');
      }
    });
  }
  
  formatDate(date: string | null | undefined): string {
    if (!date) {
      console.warn('Fecha vacía o no definida.');
      return ''; 
    }
    
    const parsedDate = new Date(date);
    
    if (isNaN(parsedDate.getTime())) {
      console.error(`Fecha inválida: ${date}`);
      return ''; 
    }
  
    return parsedDate.toISOString().slice(0, 19).replace('T', ' ') // "YYYY-MM-DD HH:mm:ss"
  }
}

