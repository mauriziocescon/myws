import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

(async () => {
  const app = await createApplication(appConfig);
  const element = createCustomElement(AppComponent, { injector: app.injector });
  customElements.define('mf3-v18', element);
})();
