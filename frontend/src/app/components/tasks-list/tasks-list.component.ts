import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './tasks-list.component.html',
  styleUrls: [],  // Eliminar la referencia a SCSS si no lo estás usando
  standalone: true,
  imports: [CommonModule],
})
export class TaskComponent {
  tasks: { id: number, name: string, details: string, completed: boolean }[] = [
    { id: 1, name: 'Tarea 1', details: 'Detalles de la tarea 1', completed: false },
    { id: 2, name: 'Tarea 2', details: 'Detalles de la tarea 2', completed: true },
    { id: 3, name: 'Tarea 3', details: 'Detalles de la tarea 3', completed: false }
  ];

  // Agregar una nueva tarea
  addTask(taskName: string, taskDetails: string) {
    const newTask = {
      id: this.tasks.length + 1, // Auto incremento del ID
      name: taskName,
      details: taskDetails,
      completed: false,
    };
    this.tasks.push(newTask);
  }

  // Eliminar tarea
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  // Cambiar estado de completado
  toggleCompletion(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }
}