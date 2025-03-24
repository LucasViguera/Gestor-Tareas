import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Importar ngx-charts

@Component({
  selector: 'app-tasks-stats',
  standalone: true,
  templateUrl: './tasks-stats.component.html',
  styleUrls: ['./tasks-stats.component.css'],
  imports: [NgxChartsModule, CommonModule] // Agregar NgxChartsModule
})
export class TasksStatsComponent {
  // Datos de las tareas
  tasks: { id: number, name: string, completed: boolean }[] = [
    { id: 1, name: 'Tarea 1', completed: false },
    { id: 2, name: 'Tarea 2', completed: true },
    { id: 3, name: 'Tarea 3', completed: false },
    { id: 4, name: 'Tarea 4', completed: true },
  ];

  // Datos para el gráfico
  view: [number, number] = [700, 400];  // Tamanio del gráfico
  showLabels = true;

  // Datos para las estadísticas
  getTotalTasks() {
    return this.tasks.length;
  }

  getCompletedTasks() {
    return this.tasks.filter(task => task.completed).length;
  }

  getPendingTasks() {
    return this.tasks.filter(task => !task.completed).length;
  }

  getCompletionPercentage() {
    const completed = this.getCompletedTasks();
    const total = this.getTotalTasks();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }

  // Datos del gráfico
  multi = [
    {
      "name": "Tareas Completadas",
      "value": this.getCompletedTasks()
    },
    {
      "name": "Tareas Pendientes",
      "value": this.getPendingTasks()
    }
  ];
}
