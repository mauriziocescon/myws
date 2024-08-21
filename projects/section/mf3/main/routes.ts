import { Route } from '@angular/router';

import { MfLoaderComponent } from '@mf/integration/mf-loader';

import { MainComponent } from './main.component';
import { AComponent } from './a/a.component';

export const mf3Routes = [{
  path: '',
  component: MainComponent,
  title: 'Mf3',
  children: [
    {
      path: 'a',
      component: AComponent,
      title: 'Mf3/a',
    },
    {
      path: 'b',
      component: MfLoaderComponent,
      title: 'Mf3/b',
      data: {
        mf: { elementId: 'mf4', tag: 'mf4-v18' },
        inputs: { mf: { elementId: 'mf4', tag: 'mf4-v18' } },
      },
    },
  ],
},
] as Route[];
