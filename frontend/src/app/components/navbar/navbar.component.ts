import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports:[CommonModule]
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  logout() {
    this.authService.logout();
  }
  
  isAdmin(): boolean {
    return this.authService.isAdmin(); 
  }
}
