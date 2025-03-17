import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Solo se necesitan CommonModule y FormsModule
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  events: { title: string, date: string }[] = [
    { title: 'Reunión de equipo', date: '2025-03-20' },
    { title: 'Entrega de tarea', date: '2025-03-22' },
    { title: 'Cita con el cliente', date: '2025-03-25' },
  ];

  newEventTitle: string = '';
  newEventDate: string = '';
  errorMessage: string = '';  // Mensaje de error si algún campo está vacío

  constructor() {}

  // Método para agregar un nuevo evento
  addEvent() {
    if (this.newEventTitle && this.newEventDate) {
      this.events.push({ title: this.newEventTitle, date: this.newEventDate });
      this.newEventTitle = ''; // Limpiar campo de título
      this.newEventDate = ''; // Limpiar campo de fecha
      this.errorMessage = ''; // Limpiar mensaje de error
    } else {
      this.errorMessage = 'Ambos campos son requeridos.';
    }
  }
}
