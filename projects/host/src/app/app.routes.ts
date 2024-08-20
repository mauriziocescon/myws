import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mf1',
    loadChildren: () => import('section/mf1').then(m => m.mf1Routes),
  },
  {
    path: 'mf2',
    loadChildren: () => import('section/mf2').then(m => m.mf2Routes),
  },
  {
    path: 'mf3',
    loadChildren: () => import('section/mf3').then(m => m.mf3Routes),
  },
  { path: '**', redirectTo: '/mf2' },
];
