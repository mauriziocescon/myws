import { createApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { routes, RoutesComponent } from '@mc/components/routes';

(async () => {
  const app = await createApplication({
    providers: [
      provideHttpClient(withFetch()),
      provideRouter(routes('mf3')),
    ],
  });
  const element = createCustomElement(RoutesComponent, { injector: app.injector });
  customElements.define('mf3-v18', element);
})();
