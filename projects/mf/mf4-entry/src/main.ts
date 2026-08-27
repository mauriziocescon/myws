import { createApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { provideStandaloneMf, StandaloneEntry } from '@mf/integration/mf-standalone-entry';

import { Main } from 'standalone/mf4';

(async () => {
  const app = await createApplication({
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideStandaloneMf({ component: Main }),
    ],
  });
  const element = createCustomElement(StandaloneEntry, { injector: app.injector });
  customElements.define('mf4-v22', element);
})();
