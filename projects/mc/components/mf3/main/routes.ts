import { FallbackComponent } from '@mc/integration/mf-route';

import { MainComponent } from './main.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

export const routes = (path: string) => {
  return [
    {
      path: path,
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
};
