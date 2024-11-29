import { createApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { provideSectionMf, SectionEntry } from '@mf/integration/mf-section-entry';

import { mf3Routes } from 'section/mf3';

(async () => {
  const app = await createApplication({
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
      provideHttpClient(withFetch()),
      provideSectionMf({ path: 'mf3', children: mf3Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(SectionEntry, { injector: app.injector });
  customElements.define('mf3-v19', element);
})();
