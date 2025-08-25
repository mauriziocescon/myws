import { createApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { provideSectionMf, SectionEntry } from '@mf/integration/mf-section-entry';

import { mf2Routes } from 'section/mf2';

(async () => {
  const app = await createApplication({
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideSectionMf({ path: 'mf2', children: mf2Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(SectionEntry, { injector: app.injector });
  customElements.define('mf2-v19', element);
})();
