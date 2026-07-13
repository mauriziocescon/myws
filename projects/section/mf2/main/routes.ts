import { Route } from '@angular/router';

import { Page } from './page';
import { First } from 'section/mf2/main/other/first';
import { Second } from 'section/mf2/main/other/second';

export const mf2Routes = [{
  path: '',
  component: Page,
  title: 'MF2',
  children: [
    {
      path: 'a',
      component: First,
      title: 'MF2 – Child A',
    },
    {
      path: 'b',
      component: Second,
      title: 'MF2 – Child B',
    },
  ],
},
] as Route[];
