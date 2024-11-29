import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';

import { HostRouter } from './host-router';

export function provideHostRouter(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const hostRouter = inject(HostRouter);

      return new Promise<void>(resolve => {
        // attaching HostRouter to the global scope
        // so it can be used by Mf
        const global = (globalThis as any);
        global.__myws__ = {};
        global.__myws__.HostRouterService = hostRouter;
        resolve();
      });
    }),
  ]);
}
