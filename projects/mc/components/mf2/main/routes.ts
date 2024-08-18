import { Route } from '@angular/router';

import { MainComponent } from './main.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

export const mf2Routes = [{
  path: '',
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
] as Route[];
