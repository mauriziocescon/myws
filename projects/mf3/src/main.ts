import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { appConfig } from './app/app.config';
import { RoutesComponent } from '@mc/components/routes';

(async () => {
  const app = await createApplication(appConfig);
  const element = createCustomElement(RoutesComponent, { injector: app.injector });
  customElements.define('mf3-v18', element);
})();
