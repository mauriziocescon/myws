import { createApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { defineRoutes, EntryComponent } from '@mc/integration/mf-entry';

import { mf4Routes } from '@mc/components/mf4';

(async () => {
  const app = await createApplication({
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideRouter(defineRoutes('mf4', mf4Routes)),
    ],
  });
  const element = createCustomElement(EntryComponent, { injector: app.injector });
  customElements.define('mf4-v18', element);
})();
