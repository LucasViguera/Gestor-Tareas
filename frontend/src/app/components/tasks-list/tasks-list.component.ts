// src/app/components/tasks-list/tasks-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
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
  usersById = new Map<number, string>(); // id -> username (fallback para nombres)
  isAdmin = false;
  errorMessage: string | null = null;

  // Para deshabilitar acciones por fila mientras se guarda
  busyId: number | null = null;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();

    // Cargamos usuarios para poder mostrar nombres aunque el back no incluya assignments
    this.userService.getUsers().subscribe({
      next: (users: any[]) => (users || []).forEach(u => this.usersById.set(u.id, u.username)),
      error: (_err: any) => {},
      complete: () => this.loadTasks()
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => (this.tasks = tasks || []),
      error: (err: any) => {
        console.error('Error al obtener tareas:', err);
        this.errorMessage = 'Hubo un problema al cargar las tareas.';
      }
    });
  }

  /** Muestra nombres de asignados:
   *  - Si el back envía assignments con user.username → usa eso
   *  - Si no, intenta resolver con usersById y userId (compat.)
   */
  displayAssignees(task: any): string {
    if (Array.isArray(task.assignments) && task.assignments.length) {
      return task.assignments
        .map((a: any) => a.user?.username || this.usersById.get(a.userId) || `#${a.userId}`)
        .join(', ');
    }
    if (typeof (task as any).assigneeId === 'number') {
      return this.usersById.get((task as any).assigneeId) || `#${(task as any).assigneeId}`;
    }
    return '—';
  }

  /** Eliminar (solo ADMIN). Notifica al servicio para refrescar estadísticas. */
  deleteTask(id: number): void {
    if (!this.isAdmin) return; // defensa en UI; el back igual valida

    this.busyId = id;
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.taskService.notifyTaskChanged(); // 🔔 refrescar tablero de stats
      },
      error: (err: any) => {
        console.error('Error al eliminar tarea:', err);
        this.errorMessage = err?.error?.message || 'No se pudo eliminar la tarea.';
      },
      complete: () => (this.busyId = null)
    });
  }

  /** Completar/Reabrir con UI optimista. Notifica a stats al terminar. */
  toggleComplete(task: Task): void {
    const previous = task.completed;
    const nextValue = previous === 1 ? 0 : 1;

    this.busyId = task.id;     // 🔒 deshabilita acciones de esa fila
    task.completed = nextValue; // ✅ UI optimista

    this.taskService.updateTaskStatus(task.id, nextValue).subscribe({
      next: (res: any) => {
        // Si el back devuelve { task }, sincronizamos; si no, ya quedó por optimismo
        if (res?.task?.completed !== undefined) {
          task.completed = res.task.completed;
        }
        this.taskService.notifyTaskChanged(); // 🔔 refrescar tablero de stats
      },
      error: (err: any) => {
        // Revertir si falla (403 si el user no está asignado, por ejemplo)
        task.completed = previous;
        console.error('Error al actualizar tarea:', err);
        this.errorMessage =
          err?.status === 403
            ? 'No estás autorizado para actualizar esta tarea.'
            : 'Hubo un problema al cambiar el estado de la tarea.';
      },
      complete: () => (this.busyId = null)
    });
  }
}
