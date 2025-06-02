import { createApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { provideStandaloneMf, StandaloneEntry } from '@mf/integration/mf-standalone-entry';

import { MainComponent } from 'standalone/mf4';

(async () => {
  const app = await createApplication({
    providers: [
      provideZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideStandaloneMf({ component: MainComponent }),
    ],
  });
  const element = createCustomElement(StandaloneEntry, { injector: app.injector });
  customElements.define('mf4-v19', element);
})();
