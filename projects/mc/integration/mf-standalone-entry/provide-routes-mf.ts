import { makeEnvironmentProviders } from '@angular/core';
import { provideRouter, Route } from '@angular/router';

import { MF_CONFIG } from './mf-config';

const defineRoutes = (component: any) => {
  return [
    {
      path: '**',
      component: component,
    },
  ] as Route[];
};

export const provideRoutesMf = (component: any) => [
  provideRouter(defineRoutes(component)),
  makeEnvironmentProviders([
    {
      provide: MF_CONFIG,
      useFactory: () => ({ component }),
    },
  ]),
];
