import { Routes } from '@angular/router';

import { startsWith } from '@mf/integration/host-router';
import { MfLoaderComponent } from '@mf/integration/mf-loader';

export const routes: Routes = [
  {
    // matching any url starting with mf1/...
    matcher: startsWith('mf1'),

    // loader of the mf bundle: loads the bundle
    // and appends <mf1-v19></mf1-v19>.
    component: MfLoaderComponent,
    data: {
      // mf is used by MfLoaderComponent to load the
      // bundle and create a WC <mf1-v19></mf1-v19>
      mf: { elementId: 'mf1', tag: 'mf1-v19' },

      // inputs is an object of `ng-inputs` passed to
      // the business component behind mf1.
      inputs: { mf: { elementId: 'mf1', tag: 'mf1-v19' } },
    },
  },
  {
    matcher: startsWith('mf2'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf2', tag: 'mf2-v19' },
      inputs: { mf: { elementId: 'mf2', tag: 'mf2-v19' } },
    },
  },
  {
    matcher: startsWith('mf3'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf3', tag: 'mf3-v19' },
      inputs: { mf: { elementId: 'mf3', tag: 'mf3-v19' } },
    },
  },
  { path: '**', redirectTo: '/mf1' },
];
