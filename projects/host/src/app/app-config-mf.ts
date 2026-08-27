import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withExperimentalAutoCleanupInjectors } from '@angular/router';

import { provideHostRouter } from '@mf/integration/host-router';

import { routes } from './app-routes-mf';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      // withExperimentalPlatformNavigation(),
      withExperimentalAutoCleanupInjectors(),
    ),
    provideHostRouter(),
  ],
};
