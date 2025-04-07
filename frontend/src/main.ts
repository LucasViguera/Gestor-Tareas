import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideHttpClient } from '@angular/common/http';

// Inicializamos la aplicación con las rutas y el cliente HTTP
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
}).catch(err => console.error(err));
