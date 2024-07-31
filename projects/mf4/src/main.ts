import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { appConfig } from './app/app.config';

import { GenericComponent } from '@mc/components/generic';

(async () => {
  const app = await createApplication(appConfig);
  const element = createCustomElement(GenericComponent, { injector: app.injector });
  customElements.define('mf4-v18', element);
})();
