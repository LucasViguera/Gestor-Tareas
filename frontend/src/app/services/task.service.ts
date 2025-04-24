import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.tasksUrl; 

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }
 
  saveTask(newTask: Omit<Task, 'id'>): Observable<Task> {  
    return this.http.post<Task>(`${this.apiUrl}/create`, newTask, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${taskId}`);
  }
}
