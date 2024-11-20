import { createApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { provideSectionMf, SectionEntryComponent } from '@mf/integration/mf-section-entry';

import { mf2Routes } from 'section/mf2';

(async () => {
  const app = await createApplication({
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideSectionMf({ path: 'mf2', children: mf2Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(SectionEntryComponent, { injector: app.injector });
  customElements.define('mf2-v19', element);
})();
