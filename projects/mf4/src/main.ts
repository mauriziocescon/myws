import { createApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { GenericComponent } from '@mc/components/generic';

(async () => {
  const app = await createApplication({
    providers: [
      provideAnimationsAsync(),
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
    ],
  });
  const element = createCustomElement(GenericComponent, { injector: app.injector });
  customElements.define('mf4-v18', element);
})();
