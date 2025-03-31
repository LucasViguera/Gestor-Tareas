import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Verifica si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    // Si no está autenticado, redirige a la página de login
    this.router.navigate(['/login']);
    return false;
  }
}
