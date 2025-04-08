import { Task } from './task.model';

export interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    role: 'USER'; 
    createdAt: string;
    updatedAt: string; 
    tasks?: Task[]; 
  }

  export interface UserTaskStats extends User {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
  }