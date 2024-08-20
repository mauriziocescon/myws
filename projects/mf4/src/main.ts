import { createApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { EntryComponent, provideRoutesMf } from '@mc/integration/mf-standalone-entry';

import { MainComponent } from '@mc/components/mf4';

(async () => {
  const app = await createApplication({
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideRoutesMf({ component: MainComponent }),
    ],
  });
  const element = createCustomElement(EntryComponent, { injector: app.injector });
  customElements.define('mf4-v18', element);
})();
