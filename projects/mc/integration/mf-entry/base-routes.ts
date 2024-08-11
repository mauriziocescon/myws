import { Route } from '@angular/router';

import { FallbackComponent } from './fallback.component';
import { RouteComponent } from './route.component';

export const defineRoutes = (path: string, children: Route[]) => {
  return [
    {
      path: path,
      component: RouteComponent,
      children: children,
    },
    { path: '**', component: FallbackComponent },
  ] as Route[];
};
