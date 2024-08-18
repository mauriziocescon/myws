import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mf1',
    loadChildren: () => import('@mc/components/mf1').then(m => m.mf1Routes),
  },
  {
    path: 'mf2',
    loadChildren: () => import('@mc/components/mf2').then(m => m.mf2Routes),
  },
  {
    path: 'mf3',
    loadChildren: () => import('@mc/components/mf3').then(m => m.mf3Routes),
  },
  {
    path: 'mf4',
    loadChildren: () => import('@mc/components/mf4').then(m => m.mf4Routes),
  },
  { path: '**', redirectTo: '/mf1' },
];
