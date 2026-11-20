import { makeEnvironmentProviders } from '@angular/core';
import {
  provideRouter,
  Route,
  withAutoCleanupInjectors,
  withComponentInputBinding,
  withRouterResources,
} from '@angular/router';

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
  provideRouter(
    defineRoutes(config.component),
    withAutoCleanupInjectors(),
    withComponentInputBinding(),
    withRouterResources(),
  ),
  makeEnvironmentProviders([
    {
      provide: MF_CONFIG,
      useFactory: () => ({ component: config.component }),
    },
  ]),
];
