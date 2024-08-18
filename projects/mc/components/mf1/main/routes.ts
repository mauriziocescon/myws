import { Route } from '@angular/router';

import { MainComponent } from './main.component';

export const mf1Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Mf1',
  },
  {
    path: 'tab/:id',
    component: MainComponent,
    title: 'Mf3 tab',
  },
] as Route[];
