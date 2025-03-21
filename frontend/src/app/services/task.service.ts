import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Si estás trabajando con un backend real, define la estructura de una tarea.
export interface Task {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Si tienes un backend, puedes usar una URL para hacer la solicitud.
  private apiUrl = 'https://api.tuservicio.com/tasks'; // Asegúrate de reemplazarla

  constructor(private http: HttpClient) { }

  // Método para guardar una tarea
  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
