import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service'; 
import { UserService } from '../../services/user.service';  
import { Task } from '../../models/task.model';  

@Component({
  selector: 'app-task',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],  
  standalone: true,
  imports: [CommonModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];  
  users: any[] = [];
  errorMessage: string | null = null; 

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();
  }


  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks; 
      },
      error: (error: any) => {
        console.error('Error al obtener tareas:', error);
        this.errorMessage = 'Hubo un problema al cargar las tareas.';
      }
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;  
      },
      error: (error: any) => {
        console.error('Error al obtener usuarios:', error);
        this.errorMessage = 'Hubo un problema al cargar los usuarios.';
      }
    });
  }


  getUsername(assigneeId: number | null): string {
    if (assigneeId === null) {
      return 'No asignado'; 
    }
    const user = this.users.find((user: { id: number; }) => user.id === assigneeId);
    return user ? user.username : 'Usuario no encontrado'; 
  }


  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      error: (error: any) => {
        console.error('Error al eliminar tarea:', error);
        this.errorMessage = 'Hubo un problema al eliminar la tarea.';
      }
    });
  }

  markComplete(task: Task): void {
    task.completed = task.completed === 0 ? 1 : 0; 
    this.taskService.updateTask(task).subscribe({
      next: (updatedTask: Task) => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (error: any) => {
        console.error('Error al actualizar tarea:', error);
        this.errorMessage = 'Hubo un problema al cambiar el estado de la tarea.';
      }
    });
  }
}
