import { createApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { defineRoutes, EntryComponent } from '@mc/integration/mf-route-entry';

import { mf3Routes } from '@mc/components/mf3';

(async () => {
  const app = await createApplication({
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
      provideHttpClient(withFetch()),
      provideRouter(defineRoutes('mf3', mf3Routes)),
    ],
  });
  const element = createCustomElement(EntryComponent, { injector: app.injector });
  customElements.define('mf3-v18', element);
})();
