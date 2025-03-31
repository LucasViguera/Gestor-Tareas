import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TaskCreateComponent } from './components/task-create/tasks-create.component';
import { TaskListComponent } from './components/tasks-list/tasks-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TasksStatsComponent } from './components/tasks-stats/tasks-stats.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'task-create', component: TaskCreateComponent, canActivate: [AuthGuard]},
  { path: 'task', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'stats', component: TasksStatsComponent,canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent,canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configuramos las rutas
  exports: [RouterModule], // Exportamos RouterModule para ser usado en otros módulos
})
export class AppRoutingModule {}
