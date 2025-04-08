import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.usersUrl;  

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any[]> {
    const headers = this.getAuthHeaders(); 
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para eliminar un usuario
  deleteUser(userId: number): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.delete(`${this.apiUrl}/delete/${userId}`, { headers });
  }

  // Método para editar un usuario
  updateUser(userId: number, updatedData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const updateUrl = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(updateUrl, updatedData, { headers });
  }

  // Método privado para obtener las cabeceras con el token de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      throw new Error('Token de autenticación no encontrado');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
