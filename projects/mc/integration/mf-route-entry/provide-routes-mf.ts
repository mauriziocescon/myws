import { provideRouter, Route, RouterFeatures } from '@angular/router';

import { PageNotFoundComponent } from './fallback.component';
import { RouteComponent } from './route.component';

const defineRoutes = (path: string, children: Route[]) => {
  return [
    {
      path: path,
      component: RouteComponent,
      children: children,
    },
    { path: '**', component: PageNotFoundComponent },
  ] as Route[];
};

export const provideRoutesMf = (path: string, children: Route[], ...features: RouterFeatures[]) => provideRouter(defineRoutes(path, children), ...features);
