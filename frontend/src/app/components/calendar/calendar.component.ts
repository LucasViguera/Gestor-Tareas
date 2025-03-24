import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter, CalendarEvent } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { TaskService } from '../../services/task.service'; 
import { Task } from '../../models/task.model'; 

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [CommonModule, CalendarModule],
  providers: [{ provide: DateAdapter, useFactory: adapterFactory }] // ✅ Se agregó correctamente el proveedor
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  tasks: Task[] = [];

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
    this.events = this.tasks.map((task) => ({
      title: task.title,
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      color: this.getPriorityColor(task.priority),
      meta: task.description,
    }));
    console.log(this.events);
  }

  getPriorityColor(priority: string) {
    const colors: Record<string, { primary: string; secondary: string }> = {
      Alta: { primary: '#FF4136', secondary: '#FF6347' }, // Rojo
      Media: { primary: '#FF851B', secondary: '#FF9E3B' }, // Naranja
      Baja: { primary: '#2ECC40', secondary: '#3D9A32' } // Verde
    };
  
    return colors[priority] || { primary: '#7FDBFF', secondary: '#80E0FF' }; // Azul por defecto
  }
}
