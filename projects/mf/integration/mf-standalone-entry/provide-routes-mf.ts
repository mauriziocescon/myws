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

export const provideRoutesMf = (config: { component: any }) => [
  provideRouter(defineRoutes(config.component)),
  makeEnvironmentProviders([
    {
      provide: MF_CONFIG,
      useFactory: () => ({ component: config.component }),
    },
  ]),
];
