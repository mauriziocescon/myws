import { createApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { provideSectionMf, SectionEntryComponent } from '@mf/integration/mf-section-entry';

import { mf1Routes } from 'section/mf1';

(async () => {
  const app = await createApplication({
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
      provideHttpClient(withFetch()),

      // this is simply calling provideRouter behind the scene
      // and set the mf "base path" to mf1: mf1 must match
      // what has been defined at host level!
      provideSectionMf({ path: 'mf1', children: mf1Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(SectionEntryComponent, { injector: app.injector });

  // definition of mf1-v18
  customElements.define('mf1-v18', element);
})();
