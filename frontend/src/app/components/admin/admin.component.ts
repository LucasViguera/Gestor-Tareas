import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin.component.html',
  standalone:true,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  manageUsers() {
    console.log('Gestionando usuarios');
  }

  viewReports() {
    console.log('Viendo reportes');
  }
}
