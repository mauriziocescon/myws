import { Route } from '@angular/router';

import { MfWrapper } from '@mf/integration/mf-loader';

import { Page } from './page';
import { Third } from 'section/mf3/main/other/third';

export const mf3Routes = [{
  path: '',
  component: Page,
  title: 'Mf3',
  children: [
    {
      path: 'a',
      component: Third,
      title: 'Mf3/a',
    },
    {
      path: 'b',
      component: MfWrapper,
      title: 'Mf3/b',
      data: {
        mf: { elementId: 'mf4', tag: 'mf4-v19' },
        inputs: { mf: { elementId: 'mf4', tag: 'mf4-v19' } },
      },
    },
  ],
},
] as Route[];
