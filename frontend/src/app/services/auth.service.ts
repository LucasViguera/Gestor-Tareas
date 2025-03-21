import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Asegúrate de importar HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';  // URL de la API de autenticación
  private http = inject(HttpClient);

  // Método para registrar un nuevo usuario
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);  // Llamamos al endpoint de registro
  }

  // Método para iniciar sesión con las credenciales de un usuario
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);  // Llamamos al endpoint de login
  }

  // Método para verificar si el usuario está autenticado (si tiene un token)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Verifica si el token está en el localStorage
  }

  // Método para obtener el token del usuario almacenado en localStorage
  getToken(): string | null {
    return localStorage.getItem('token');  // Devuelve el token del localStorage
  }

  // Método para cerrar sesión eliminando el token del localStorage
  logout(): void {
    localStorage.removeItem('token');  // Elimina el token del localStorage
  }

  // Método para obtener las cabeceras con el token para hacer peticiones autenticadas
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
