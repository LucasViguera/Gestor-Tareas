import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

// Importación de componentes standalone
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/tasks-list/tasks-list.component';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Servicios
import { TaskService } from './services/task.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,  // Módulo de rutas principal
    RouterModule,      // Manejo de rutas
    FormsModule,       // Manejo de formularios
    HomeComponent,     // Componente de inicio // 
    TaskListComponent,      // Componente de lista de tareas
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    TaskService,         // Servicio de tareas
    provideHttpClient(), // Alternativa moderna a HttpClientModule
  ],
})
export class AppModule {}
