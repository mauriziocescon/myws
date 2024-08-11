import { createApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { defineRoutes, EntryComponent } from '@mc/integration/mf-entry';

import { mf2Routes } from '@mc/components/mf3';

(async () => {
  const app = await createApplication({
    providers: [
      provideHttpClient(withFetch()),
      provideRouter(defineRoutes('mf3', mf2Routes)),
    ],
  });
  const element = createCustomElement(EntryComponent, { injector: app.injector });
  customElements.define('mf3-v18', element);
})();
