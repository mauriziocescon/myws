import { APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders } from '@angular/core';

import { HostRouterService } from './host-router.service';

export function provideHostRouter(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const hostRouter = inject(HostRouterService);

        return () => new Promise<void>(resolve => {
          // attaching HostRouterService to the global scope
          // so it can be used by Mf
          const global = (globalThis as any);
          global.__myws__ = {};
          global.__myws__.HostRouterService = hostRouter;
          resolve();
        });
      },
      multi: true,
    },
  ]);
}
