import { Route } from '@angular/router';

import { MfWrapper } from '@mf/integration/mf-loader';

import { Page } from './page';
import { Third } from 'section/mf3/main/other/third';

export const mf3Routes = [{
  path: '',
  component: Page,
  title: 'MF3',
  children: [
    {
      path: 'a',
      component: Third,
      title: 'MF3 – Child A',
    },
    {
      path: 'b',
      component: MfWrapper,
      title: 'MF3 – Child B',
      data: {
        mf: { elementId: 'mf4', tag: 'mf4-v19' },
        inputs: { mf: { elementId: 'mf4', tag: 'mf4-v19' } },
      },
    },
  ],
},
] as Route[];
