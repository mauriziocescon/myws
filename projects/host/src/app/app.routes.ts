import { Routes } from '@angular/router';

import { MfLoaderComponent } from '@mc/integration/mf-loader';
import { startsWith } from '@mc/integration/utils';

export const routes: Routes = [
  {
    matcher: startsWith('mf1'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf1', tag: 'mf1-v18' },
      inputs: { mf: { elementId: 'mf1', tag: 'mf1-v18' }, desc: 'mf1 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    matcher: startsWith('mf2'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf2', tag: 'mf2-v18' },
      inputs: { mf: { elementId: 'mf2', tag: 'mf2-v18' }, desc: 'mf2 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    matcher: startsWith('mf3'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf3', tag: 'mf3-v18' },
      inputs: { mf: { elementId: 'mf3', tag: 'mf3-v18' }, desc: 'mf3 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    matcher: startsWith('mf4'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf4', tag: 'mf4-v18' },
      inputs: { mf: { elementId: 'mf4', tag: 'mf4-v18' }, desc: 'mf4 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  { path: '**', redirectTo: '/mf1' },
];
