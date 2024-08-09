import { FallbackComponent } from '@mc/integration/mf-route';

import { MainComponent } from './main.component';

export const routes = (path: string) => {
  return [
    {
      path: path,
      component: MainComponent,
    },
    { path: '**', component: FallbackComponent },
  ];
};
