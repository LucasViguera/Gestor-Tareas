import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { User, UserTaskStats } from '../../models/user.model';
import { Task } from '../../models/task.model';
import { environment } from '../../../environments/environment';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-stats',
  standalone: true,
  templateUrl: './tasks-stats.component.html',
  styleUrls: ['./tasks-stats.component.css'],
  imports: [CommonModule]
})
export class TasksStatsComponent implements OnInit, OnDestroy {
  usersStats: UserTaskStats[] = [];
  errorMessage: string | null = null;
  totalTasks = 0;
  completedTasks = 0;

  private apiUrl = environment.usersUrl;
  private sub?: Subscription;

  constructor(private http: HttpClient, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadUserStats();
    this.sub = this.taskService.taskChanged$.subscribe(() => this.loadUserStats());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadUserStats(): void {
    this.totalTasks = 0;
    this.completedTasks = 0;
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data: User[]) => {
        this.usersStats = (data || []).map(user => {
          const tasksArray: Task[] = user.tasks ?? [];

          const total = tasksArray.length;
          const completed = tasksArray.filter(t => t.completed === 1).length;
          const pending = total - completed;

          this.totalTasks += total;
          this.completedTasks += completed;

          return {
            ...user,
            tasks: tasksArray,
            totalTasks: total,
            completedTasks: completed,
            pendingTasks: pending
          } as UserTaskStats;
        });
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
        this.errorMessage = err?.status === 401
          ? 'Autenticación fallida. Verifique el token.'
          : 'Error al cargar las estadísticas de tareas.';
      }
    });
  }

  getCompletedPercentage(): number {
    if (this.totalTasks === 0) return 0;
    return (this.completedTasks / this.totalTasks) * 100;
  }
}
