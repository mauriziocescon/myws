import { createApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { provideStandaloneMf, StandaloneEntryComponent } from '@mf/integration/mf-standalone-entry';

import { MainComponent } from 'standalone/mf4';

(async () => {
  const app = await createApplication({
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideStandaloneMf({ component: MainComponent }),
    ],
  });
  const element = createCustomElement(StandaloneEntryComponent, { injector: app.injector });
  customElements.define('mf4-v19', element);
})();
