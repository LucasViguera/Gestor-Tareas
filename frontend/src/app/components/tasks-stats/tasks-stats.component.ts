import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User, UserTaskStats } from '../../models/user.model';
import { Task } from '../../models/task.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tasks-stats',
  standalone: true,
  templateUrl: './tasks-stats.component.html',
  styleUrls: ['./tasks-stats.component.css'],
  imports: [CommonModule]
})
export class TasksStatsComponent implements OnInit {
  usersStats: UserTaskStats[] = [];  // Usamos la interfaz extendida que incluye estadísticas
  errorMessage: string | null = null; 
  totalTasks: number = 0;
  completedTasks: number = 0;
  private apiUrl = environment.usersUrl; 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserStats();
  }

  // Cargar las estadísticas de tareas por usuario
  loadUserStats(): void {
    const token = localStorage.getItem('token');  // Asegúrate de que el token esté almacenado
    if (!token) {
      this.errorMessage = 'No se encontró el token de autenticación.';
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<User[]>(this.apiUrl, { headers }).subscribe({
      next: (data: User[]) => {
        this.usersStats = data.map(user => {
          const tasksArray: Task[] = user.tasks ?? [];
          const totalTasks = tasksArray.length;
          const completedTasks = tasksArray.filter(task => task.completed).length;
          const pendingTasks = totalTasks - completedTasks;

          // Sumar el total y completadas para la barra de progreso
          this.totalTasks += totalTasks;
          this.completedTasks += completedTasks;

          return {
            ...user,
            tasks: tasksArray,
            totalTasks,
            completedTasks,
            pendingTasks
          } as UserTaskStats;
        });
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
        if (err.status === 401) {
          this.errorMessage = 'Autenticación fallida. Verifique el token.';
        } else {
          this.errorMessage = 'Error al cargar las estadísticas de tareas.';
        }
      }
    });
  }

  // Método para calcular el porcentaje de tareas completadas
  getCompletedPercentage(): number {
    return (this.completedTasks / this.totalTasks) * 100;
  }
}
