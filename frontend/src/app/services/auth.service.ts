// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenKey = 'auth_token'; // Clave para almacenar el token

  constructor() {}

  // Obtener el token de localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Almacenar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Eliminar el token (al cerrar sesión)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Si existe el token, el usuario está autenticado
  }
}
