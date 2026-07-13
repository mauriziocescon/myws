import { Route } from '@angular/router';

import { Page } from './page';

export const mf1Routes = [
  {
    path: '',
    component: Page,
    title: 'MF1',
  },
  {
    path: 'detail/:id',
    component: Page,
    title: 'MF1 – Detail',
  },
] as Route[];
