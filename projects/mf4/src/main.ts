import { createApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { BaseComponent } from '@mc/integration/mf-base';

(async () => {
  const app = await createApplication({
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
    ],
  });
  const element = createCustomElement(BaseComponent, { injector: app.injector });
  customElements.define('mf4-v18', element);
})();
