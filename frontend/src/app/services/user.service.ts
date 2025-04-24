import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.usersUrl;  

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getUsers(): Observable<any[]> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para eliminar un usuario
  deleteUser(userId: number): Observable<any> {
    const headers = this.authService.getAuthHeaders(); 
    return this.http.delete(`${this.apiUrl}/delete/${userId}`, { headers });
  }
}
