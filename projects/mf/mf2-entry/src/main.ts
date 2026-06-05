import { createApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { provideSectionMf, SectionEntry } from '@mf/integration/mf-section-entry';

import { mf2Routes } from 'section/mf2';

(async () => {
  const app = await createApplication({
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideHttpClient(),
      provideSectionMf({ path: 'mf2', children: mf2Routes }),
    ],
  });
  const element = createCustomElement(SectionEntry, { injector: app.injector });
  customElements.define('mf2-v19', element);
})();
