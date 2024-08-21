import { provideRouter, Route, RouterFeatures, withComponentInputBinding } from '@angular/router';

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

export const provideRouteMf = (config: { path: string, children: Route[] }, ...features: RouterFeatures[]) => {
  return provideRouter(defineRoutes(config.path, config.children), withComponentInputBinding(), ...features);
};
