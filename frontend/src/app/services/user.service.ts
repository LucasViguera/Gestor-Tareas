// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Para URL base de la API
import { AuthService } from './auth.service'; // Importamos el servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class UserService {

  // URL de la API donde se obtienen los usuarios
  private apiUrl = `${environment.apiUrl}/users`; // Cambia según tu URL base

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener todos los usuarios (con token de autenticación)
  getUsers(): Observable<any[]> {
    const token = this.authService.getToken(); // Obtenemos el token del servicio de autenticación

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Añadimos el token a los headers
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
