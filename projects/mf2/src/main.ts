import { createApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { EntryComponent, provideRoutesMf } from '@mc/integration/mf-route-entry';

import { mf2Routes } from '@mc/components/mf2';

(async () => {
  const app = await createApplication({
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideRoutesMf({ path: 'mf2', children: mf2Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(EntryComponent, { injector: app.injector });
  customElements.define('mf2-v18', element);
})();
