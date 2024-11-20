import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';

import { HostRouterService } from './host-router.service';

export function provideHostRouter(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const hostRouter = inject(HostRouterService);

      return new Promise<void>(resolve => {
        // attaching HostRouterService to the global scope
        // so it can be used by Mf
        const global = (globalThis as any);
        global.__myws__ = {};
        global.__myws__.HostRouterService = hostRouter;
        resolve();
      });
    }),
  ]);
}
