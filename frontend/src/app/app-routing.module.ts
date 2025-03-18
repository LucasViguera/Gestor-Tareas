import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskCreateComponent } from './components/task-create/tasks-create.component';
import { TaskComponent } from './components/tasks-list/tasks-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'task-create', component: TaskCreateComponent },
  { path: 'task', component: TaskComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuramos las rutas
  exports: [RouterModule], // Exportamos RouterModule para ser usado en otros módulos
})
export class AppRoutingModule {}
