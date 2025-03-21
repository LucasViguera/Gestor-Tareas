import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';  // Asegúrate de que el modelo Task está correctamente importado

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';  // Asegúrate de que la URL sea la correcta

  constructor(private http: HttpClient) {}

  // Método para obtener todas las tareas
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  // Método para obtener una tarea por su ID
  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  // Método para crear una nueva tarea
  saveTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/create`, newTask);
  }

  // Método para actualizar una tarea existente
  updateTask(taskId: string, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/update/${taskId}`, updatedTask);
  }

  // Método para eliminar una tarea
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${taskId}`);
  }
}
