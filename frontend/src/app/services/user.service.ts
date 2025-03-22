// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';  // Cambia esta URL a la correcta

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  getUsers(): Observable<any[]> {
    // Obtener el token desde localStorage
    const token = localStorage.getItem('token');  // Asegúrate de que el token esté almacenado en el localStorage
    // Crear las cabeceras con el token, si existe
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    // Realizar la solicitud GET con las cabeceras de autenticación
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
