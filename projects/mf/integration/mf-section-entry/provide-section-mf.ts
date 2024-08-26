import { provideRouter, Route, RouterFeatures, withComponentInputBinding } from '@angular/router';

import { PageNotFoundComponent } from './fallback.component';

const defineRoutes = (path: string, children: Route[]) => {
  return [
    {
      path: path,
      children: children,
    },
    { path: '**', component: PageNotFoundComponent },
  ] as Route[];
};

export const provideSectionMf = (config: { path: string, children: Route[] }, ...features: RouterFeatures[]) => {
  return provideRouter(defineRoutes(config.path, config.children), withComponentInputBinding(), ...features);
};
