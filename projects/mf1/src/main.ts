import { createApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { EntryComponent, provideRoutesMf } from '@mc/integration/mf-route-entry';

import { mf1Routes } from '@mc/components/mf1';

(async () => {
  const app = await createApplication({
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
      provideHttpClient(withFetch()),
      provideRoutesMf({ path: 'mf1', children: mf1Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(EntryComponent, { injector: app.injector });
  customElements.define('mf1-v18', element);
})();
