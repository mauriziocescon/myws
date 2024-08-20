import { Route } from '@angular/router';

import { MainComponent } from './main.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

export const mf2Routes = [{
  path: '',
  component: MainComponent,
  title: 'Mf2',
  children: [
    {
      path: 'a',
      component: AComponent,
      title: 'Mf2/a',
    },
    {
      path: 'b',
      component: BComponent,
      title: 'Mf2/b',
    },
  ],
},
] as Route[];
