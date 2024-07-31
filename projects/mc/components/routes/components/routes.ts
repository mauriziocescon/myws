import { Routes } from '@angular/router';

import { FallbackComponent } from '@mc/components/routes';

import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

export const routes: Routes = [
  {
    path: 'mf3',
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
