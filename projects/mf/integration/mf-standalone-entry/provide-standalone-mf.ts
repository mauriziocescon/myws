import { makeEnvironmentProviders } from '@angular/core';
import { provideRouter, Route, withComponentInputBinding } from '@angular/router';

import { MF_CONFIG } from './mf-config';

const defineRoutes = (component: any) => {
  return [
    {
      path: '**',
      component: component,
    },
  ] as Route[];
};

export const provideStandaloneMf = (config: { component: any }) => [
  provideRouter(defineRoutes(config.component), withComponentInputBinding()),
  makeEnvironmentProviders([
    {
      provide: MF_CONFIG,
      useFactory: () => ({ component: config.component }),
    },
  ]),
];
