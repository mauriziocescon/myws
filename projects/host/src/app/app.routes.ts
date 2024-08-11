import { Routes } from '@angular/router';

import { MfLoaderComponent } from '@mc/integration/mf-loader';
import { startsWith } from '@mc/integration/utils';

import { mf1Routes } from '@mc/components/mf1';
import { mf2Routes } from '@mc/components/mf2';
import { mf3Routes } from '@mc/components/mf3';
import { mf4Routes } from '@mc/components/mf4';

export const mfRoutes: Routes = [
  {
    matcher: startsWith('mf1'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf1', tag: 'mf1-v18', routing: true },
      inputs: { mf: { elementId: 'mf1', tag: 'mf1-v18', routing: true } },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    matcher: startsWith('mf2'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf2', tag: 'mf2-v18', routing: true },
      inputs: { mf: { elementId: 'mf2', tag: 'mf2-v18', routing: true } },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    matcher: startsWith('mf3'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf3', tag: 'mf3-v18', routing: true },
      inputs: { mf: { elementId: 'mf3', tag: 'mf3-v18', routing: true } },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    matcher: startsWith('mf4'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf4', tag: 'mf4-v18', routing: true },
      inputs: { mf: { elementId: 'mf4', tag: 'mf4-v18', routing: true } },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  { path: '**', redirectTo: '/mf1' },
];

export const lzRoutes: Routes = [
  {
    path: 'mf1',
    children: mf1Routes,
  },
  {
    path: 'mf2',
    children: mf2Routes,
  },
  {
    path: 'mf3',
    children: mf3Routes,
  },
  {
    path: 'mf4',
    children: mf4Routes,
  },
  { path: '**', redirectTo: '/mf1' },
];
