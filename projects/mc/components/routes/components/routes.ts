import { Routes } from '@angular/router';

import { FallbackComponent } from './fallback.component';

import { MainComponent } from './main/main.component';
import { AComponent } from './main/a/a.component';
import { BComponent } from './main/b/b.component';

export const routes: Routes = [
  {
    path: 'mf3',
    component: MainComponent,
    children: [
      {
        path: 'a',
        component: AComponent,
      },
      {
        path: 'b',
        component: BComponent,
      },
    ],
  },
  { path: '**', component: FallbackComponent },
];
