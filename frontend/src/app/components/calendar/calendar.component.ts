import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter, CalendarEvent, CalendarView } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskService } from '../../services/task.service'; 
import { Task } from '../../models/task.model'; 
import { CalendarA11y } from 'angular-calendar';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { CalendarDateFormatter } from 'angular-calendar';
import { CalendarUtils } from 'angular-calendar';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'; 

registerLocaleData(localeEs, 'es'); 

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule, CalendarModule],
  providers: [
    { provide: DateAdapter, useFactory: adapterFactory }, 
    CalendarUtils, 
    CalendarA11y,
    { provide: CalendarDateFormatter }, 
    { provide: CalendarEventTitleFormatter }
  ]
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month; 
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  tasks: Task[] = [];
  weekStartsOn: number = 1;  // Lunes como primer día de la semana
  
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      console.log('Tareas cargadas:', tasks);
      this.tasks = tasks;
      this.populateCalendar();
    });
  }

  populateCalendar(): void {
    // Asegurarse de que no haya tareas duplicadas
    const uniqueTasks = this.tasks.filter((task, index, self) =>
      index === self.findIndex((t) => (
        t.title === task.title && t.startDate === task.startDate && t.endDate === task.endDate
      ))
    );

    this.events = uniqueTasks.map((task) => ({
      title: task.title,
      start: task.startDate ? new Date(task.startDate) : new Date(),
      end: task.endDate ? new Date(task.endDate) : new Date(),
      color: this.getPriorityColor(task.priority),
      meta: task.description,
    }));

    console.log('Eventos generados:', this.events);
  }

  getPriorityColor(priority: string) {
    const colors: Record<string, { primary: string; secondary: string }> = {
      alta: { primary: '#FF4136', secondary: '#FF6347' }, //rojo
      media: { primary: '#FF851B', secondary: '#FF9E3B' }, //naranja
      baja: { primary: '#2ECC40', secondary: '#3D9A32' } //verde
    };
    return colors[priority] || { primary: '#7FDBFF', secondary: '#80E0FF' }; //si no tiene asignada ninguna es azul
   }
  navigateMonth(direction: number): void {
    const newDate = new Date(this.viewDate);
    newDate.setMonth(this.viewDate.getMonth() + direction);  // Avanzar o retroceder un mes
    this.viewDate = newDate;
  }
}
