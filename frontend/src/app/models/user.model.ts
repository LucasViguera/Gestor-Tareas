import { Task } from './task.model';

export interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    role: 'USER' | 'ADMIN';  // O puede ser un string si tienes más roles definidos
    createdAt: string;  // Fecha en formato ISO
    updatedAt: string;  // Fecha en formato ISO
    tasks?: Task[]; 
  }

  export interface UserTaskStats extends User {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
  }