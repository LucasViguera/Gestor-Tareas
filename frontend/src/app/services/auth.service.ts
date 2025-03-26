import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';  // Importa jwt-decode
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';  // URL de la API de autenticación
  private http = inject(HttpClient);
  private router = inject(Router); // inyecto esto para poder usar las rutas en mi logout.
  
  // Método para registrar un nuevo usuario
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);  // Llamamos al endpoint de registro
  }

  // Método para iniciar sesión con las credenciales de un usuario
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);  // Guarda el token en localStorage
          console.log('Token guardado en localStorage:', response.token);  // Verifica el token guardado
        }
      })
    );
  }
  
  // Método para verificar si el usuario está autenticado (si tiene un token)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Verifica si el token está en el localStorage
  }

  // Método para obtener el token del usuario almacenado en localStorage
  getToken(): string | null {
    return localStorage.getItem('token');  // Devuelve el token del localStorage
  }

  // Método para obtener el userId del token
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);  // Decodifica el token
      return decodedToken?.userId || null;  // Asumiendo que el payload contiene 'userId'
    }
    return null;
  }



  

  // Método para obtener el rol del usuario desde el token JWT
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); // Decodificar el token JWT
      return decodedToken?.role || null; // Suponiendo que el payload contiene 'role'
    }
    return null;
  }

  // Método para verificar si el usuario es un ADMIN
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN'; // Verifica si el rol es 'ADMIN'
  }






  // Método para cerrar sesión eliminando el token del localStorage
  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/home']);   // Elimina el token del localStorage
  }

  // Método para obtener las cabeceras con el token para hacer peticiones autenticadas
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
