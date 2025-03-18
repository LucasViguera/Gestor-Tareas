import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; // Importamos el módulo de rutas
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './components/tasks-list/tasks-list.component';  // Importa el componente de listado de tareas
import { TaskService } from './task.service';  // Importa el servicio de tareas
import { TaskCreateComponent } from './components/task-create/tasks-create.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
  ], // No necesitamos declarar componentes standalone aquí
  imports: [
    BrowserModule,
    AppRoutingModule,  // Usamos AppRoutingModule para las rutas
    RouterModule,      // RouterModule también para manejar las rutas en general
    HomeComponent,
    FormsModule,
    TaskCreateComponent,
    TaskComponent,
  ],
  providers: [TaskService],
})
export class AppModule {}
