import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
  withExperimentalPlatformNavigation,
} from '@angular/router';

import { provideHostRouter } from '@mf/integration/host-router';

import { routes } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withExperimentalPlatformNavigation(),
      withExperimentalAutoCleanupInjectors(),
    ),
    provideHostRouter(),
  ],
};
