import { FallbackComponent } from './fallback.component';

import { MainComponent } from './main/main.component';
import { AComponent } from './main/a/a.component';
import { BComponent } from './main/b/b.component';

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
