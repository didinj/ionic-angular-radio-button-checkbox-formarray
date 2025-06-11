import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'edit',
    loadComponent: () => import('./edit/edit.page').then( m => m.EditPage)
  },
];
