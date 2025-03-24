import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  // URL base de la API (ajústala a la correcta)
  private apiUrl = 'http://localhost:3000/users';  

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  getUsers(): Observable<any[]> {
    const headers = this.getAuthHeaders();  // Método para obtener cabeceras de autenticación
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para eliminar un usuario
  deleteUser(userId: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    const deleteUrl = `${this.apiUrl}/${userId}`;

    return this.http.delete<void>(deleteUrl, { headers });
  }

  // Método para editar un usuario (esto es opcional, pero útil si lo necesitas)
  updateUser(userId: number, updatedData: any): Observable<any> {
    const headers = this.getAuthHeaders();  // Obtener cabeceras de autenticación
    const updateUrl = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(updateUrl, updatedData, { headers });
  }

  // Método privado para obtener las cabeceras con el token de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
