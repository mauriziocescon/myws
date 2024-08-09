import { createApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { RouteComponent } from '@mc/integration/mf-route';

import { routes } from '@mc/components/mf3';

(async () => {
  const app = await createApplication({
    providers: [
      provideHttpClient(withFetch()),
      provideRouter(routes('mf3')),
    ],
  });
  const element = createCustomElement(RouteComponent, { injector: app.injector });
  customElements.define('mf3-v18', element);
})();
