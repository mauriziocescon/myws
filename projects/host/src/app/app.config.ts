import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { HostRouterService } from '@mc/integration/host-router';

import { mfRoutes } from './app.routes';

function initializeApp(hostRouter: HostRouterService) {
  return () => new Promise<void>(resolve => {
    // attaching HostRouterService to the global scope
    const global = (globalThis as any);
    global.__myws__ = {};
    global.__myws__.HostRouterService = hostRouter;
    resolve();
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(mfRoutes, withComponentInputBinding()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [HostRouterService],
    },
  ],
};
