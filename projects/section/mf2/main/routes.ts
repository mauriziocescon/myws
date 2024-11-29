import { Route } from '@angular/router';

import { Page } from './page';
import { First } from 'section/mf2/main/other/first';
import { Second } from 'section/mf2/main/other/second';

export const mf2Routes = [{
  path: '',
  component: Page,
  title: 'Mf2',
  children: [
    {
      path: 'a',
      component: First,
      title: 'Mf2/a',
    },
    {
      path: 'b',
      component: Second,
      title: 'Mf2/b',
    },
  ],
},
] as Route[];
