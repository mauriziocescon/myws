import { Route } from '@angular/router';

import { MainComponent } from './main.component';

export const mf1Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'tab/:id',
    component: MainComponent,
  },
] as Route[];
