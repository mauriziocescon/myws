import { provideRouter, Route, RouterFeatures, withComponentInputBinding } from '@angular/router';

import { PageNotFound } from './fallback';

const defineRoutes = (path: string, children: Route[]) => {
  return [
    {
      // base path = mf1
      path: path,

      // business routes defined for mf1 section
      children: children,
    },

    // wildcard to avoid exceptions while routing from /mf1 to /mf_x
    { path: '**', component: PageNotFound },
  ] as Route[];
};

export const provideSectionMf = (config: { path: string, children: Route[] }, ...features: RouterFeatures[]) => {
  return provideRouter(defineRoutes(config.path, config.children), withComponentInputBinding(), ...features);
};
