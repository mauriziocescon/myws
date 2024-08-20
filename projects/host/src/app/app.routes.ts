import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mf1',
    loadChildren: () => import('sections/mf1').then(m => m.mf1Routes),
  },
  {
    path: 'mf2',
    loadChildren: () => import('sections/mf2').then(m => m.mf2Routes),
  },
  {
    path: 'mf3',
    loadChildren: () => import('sections/mf3').then(m => m.mf3Routes),
  },
  { path: '**', redirectTo: '/mf1' },
];
