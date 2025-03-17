import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module'; // Importamos el módulo de rutas

import { TaskCreateComponent } from './components/task-create/tasks-create.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [], // No necesitamos declarar componentes standalone aquí
  imports: [
    BrowserModule,
    AppRoutingModule,  // Usamos AppRoutingModule para las rutas
    RouterModule,      // RouterModule también para manejar las rutas en general
    TaskCreateComponent,
    HomeComponent,
  ],
})
export class AppModule {}
