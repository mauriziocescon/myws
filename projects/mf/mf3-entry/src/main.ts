import { createApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { EntryComponent, provideRouteMf } from '@mf/integration/mf-section-entry';

import { mf3Routes } from 'section/mf3';

(async () => {
  const app = await createApplication({
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
      provideHttpClient(withFetch()),
      provideRouteMf({ path: 'mf3', children: mf3Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(EntryComponent, { injector: app.injector });
  customElements.define('mf3-v18', element);
})();
