import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'; // Asegúrate de que el servicio esté importado

import { FullCalendarModule } from '@fullcalendar/angular'; // Ya está correcto
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Task } from '../../models/task.model'; // Importar el modelo Task

@Component({
  selector: 'app-calendar',
  standalone: true, // Usando componente standalone
  imports: [FullCalendarModule], // Importamos el módulo FullCalendar
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: any; // Usamos `any` ya que `@fullcalendar/angular` no exporta un tipo específico
  tasks: Task[] = []; // Lista de tareas de tipo Task

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      console.log('Tareas cargadas:', tasks); // Verifica que las tareas estén cargadas correctamente
      this.tasks = tasks.map(task => {
        const startDate = this.formatDate(task.startDate);
        const endDate = this.formatDate(task.endDate);
        return { ...task, startDate, endDate };
      });
      this.initializeCalendar();
    });
  }
  
  // Función para formatear la fecha
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const year = formattedDate.getUTCFullYear();
    const month = (formattedDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Mes empieza en 0
    const day = formattedDate.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato: YYYY-MM-DD
  }

  initializeCalendar() {
    // Configuración de FullCalendar usando las opciones adecuadas
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth', // Vista por defecto (mes)
      events: this.tasks.map(task => ({
        title: task.title,
        start: task.startDate,  // Asegúrate de que las fechas estén bien formateadas
        end: task.endDate,
        description: task.description,
        color: this.getPriorityColor(task.priority) // Color según prioridad
      })),
      eventClick: (info: any) => {
        alert('Tarea: ' + info.event.title + '\nDescripción: ' + info.event.extendedProps.description);
      }
    };
  }

  getPriorityColor(priority: string) {
    switch (priority) {
      case 'Alta': return '#FF4136'; // Rojo
      case 'Media': return '#FF851B'; // Naranja
      case 'Baja': return '#2ECC40'; // Verde
      default: return '#7FDBFF'; // Azul
    }
  }
}
