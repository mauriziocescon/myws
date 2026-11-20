import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withAutoCleanupInjectors,
  withComponentInputBinding,
  withRouterResources,
} from '@angular/router';

import { provideHostRouter } from '@mf/integration/host-router';

import { routes } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withAutoCleanupInjectors(),
      withComponentInputBinding(),
      withRouterResources(),
    ),
    provideHostRouter(),
  ],
};
