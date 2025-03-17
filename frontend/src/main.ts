import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module'; // Importamos AppRoutingModule

// Usamos bootstrapApplication para arrancar la aplicación
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppRoutingModule)], // Proveemos las rutas
});
