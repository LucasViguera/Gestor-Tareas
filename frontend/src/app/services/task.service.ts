import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';  // Asegúrate de que la URL sea la correcta

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
  saveTask(newTask: Omit<Task, 'id'>): Observable<Task> {  // Cambiar a Omit<Task, 'id'>
    return this.http.post<Task>(`${this.apiUrl}/create`, newTask);
  }

  // Método para actualizar una tarea existente
  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/update/${updatedTask.id}`, updatedTask);
  }

  // Método para eliminar una tarea
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${taskId}`);
  }
}
