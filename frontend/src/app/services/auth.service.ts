import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; 
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  environment.authUrl;
  private http = inject(HttpClient);
  private router = inject(Router); 

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user); 
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token); // guardar token en el localstorage
          console.log('Token guardado en localStorage:', response.token);  
        }
      })
    );
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token); 
      return decodedToken?.userId || null; 
    }
    return null;
  }


  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); 
      return decodedToken?.role || null; 
    }
    return null;
  }

  
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/home']);  
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
