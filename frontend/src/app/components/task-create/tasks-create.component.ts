import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importa módulos necesarios para formularios
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.css'],
})
export class TaskCreateComponent {
  taskName: string = '';
  taskDetails: string = '';
  errorMessage: string = '';  // Para mostrar un mensaje si algún campo está vacío

  constructor() {}

  onSubmit() {
    if (this.taskName && this.taskDetails) {
      // Aquí iría la lógica para crear la tarea
      console.log('Nueva tarea:', this.taskName, this.taskDetails);
      
      // Limpiar los campos después de enviar
      this.taskName = '';
      this.taskDetails = '';
      this.errorMessage = ''; // Limpiar mensaje de error
    } else {
      this.errorMessage = 'Ambos campos son requeridos.';
    }
  }
}
