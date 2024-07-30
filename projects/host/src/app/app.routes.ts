import { Routes } from '@angular/router';

import { MfLoaderComponent } from '@mc/components/mf-loader';

export const routes: Routes = [
  {
    matcher: url => {
      if (url.length === 1 && url[0].path.startsWith('mf1')) {
        return { consumed: url };
      }
      return null;
    },
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf1', tag: 'mf1-v18' },
      inputs: { desc: 'mf1 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    path: 'mf2',
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf2', tag: 'mf2-v18' },
      inputs: { desc: 'mf2 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    path: 'mf3',
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf3', tag: 'mf3-v18' },
      inputs: { desc: 'mf3 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  {
    path: 'mf4',
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf4', tag: 'mf4-v18' },
      inputs: { desc: 'mf4 desc from route' },
      outputs: { valueChanged: (v: string) => console.log(`valueChanged called with ${v}`) },
    },
  },
  { path: '**', redirectTo: '/mf1' },
];
