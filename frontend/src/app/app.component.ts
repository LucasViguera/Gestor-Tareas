import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Agrega estos módulos aquí
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Partial<Task> = {};

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    if (!this.newTask.title) return;
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = {};
    });
  }

  completeTask(id: number) {
    this.taskService.completeTask(id).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
