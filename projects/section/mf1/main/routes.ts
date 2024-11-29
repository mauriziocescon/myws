import { Route } from '@angular/router';

import { Page } from './page';

export const mf1Routes = [
  {
    path: '',
    component: Page,
    title: 'Mf1',
  },
  {
    path: 'tab/:id',
    component: Page,
    title: 'Mf3 tab',
  },
] as Route[];
