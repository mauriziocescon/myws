import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export const LAZY_CONFIG = new InjectionToken<Record<string, any>>('LAZY_CONFIG');

export function provideLazyComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LAZY_CONFIG,
      useFactory: () => {
        return {};
      },
    },
  ]);
}
