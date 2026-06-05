import { createApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { provideSectionMf, SectionEntry } from '@mf/integration/mf-section-entry';

import { mf3Routes } from 'section/mf3';

(async () => {
  const app = await createApplication({
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideHttpClient(),
      provideSectionMf({ path: 'mf3', children: mf3Routes }),
    ],
  });
  const element = createCustomElement(SectionEntry, { injector: app.injector });
  customElements.define('mf3-v19', element);
})();
