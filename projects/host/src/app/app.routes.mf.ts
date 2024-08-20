import { Routes } from '@angular/router';

import { startsWith } from '@mc/integration/host-router';
import { MfLoaderComponent } from '@mc/integration/mf-loader';

export const routes: Routes = [
  {
    matcher: startsWith('mf1'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf1', tag: 'mf1-v18' },
      inputs: { mf: { elementId: 'mf1', tag: 'mf1-v18' } },
    },
  },
  {
    matcher: startsWith('mf2'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf2', tag: 'mf2-v18' },
      inputs: { mf: { elementId: 'mf2', tag: 'mf2-v18' } },
    },
  },
  {
    matcher: startsWith('mf3'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf3', tag: 'mf3-v18' },
      inputs: { mf: { elementId: 'mf3', tag: 'mf3-v18' } },
    },
  },
  { path: '**', redirectTo: '/mf1' },
];
