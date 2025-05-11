import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth-guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'task',
    loadComponent:() =>
      import('./features/task/task.component').then((c) => c.TaskComponent),
    canActivate: [authGuard]
  },
  {
    path: 'success',
    loadComponent:() =>
      import('./features/success/success.component').then((c) => c.SuccessComponent),
    canActivate: [authGuard]
  }
];
