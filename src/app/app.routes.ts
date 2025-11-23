import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },

  // HOME
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },

  // DESPESAS
  {
    path: 'despesa-create',
    loadComponent: () =>
      import('./pages/despesa-create/despesa-create.page').then((m) => m.DespesaCreatePage),
  },
  {
    path: 'despesa-edit/:id',
    loadComponent: () =>
      import('./pages/despesa-edit/despesa-edit.page').then((m) => m.DespesaEditPage),
  },
  {
    path: 'despesas-list',
    loadComponent: () =>
      import('./pages/despesas-list/despesas-list.page').then((m) => m.DespesasListPage),
  },

  // PERFIL
  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/perfil/perfil.page').then((m) => m.PerfilPage),
  }
];
