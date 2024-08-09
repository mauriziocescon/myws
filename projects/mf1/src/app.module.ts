import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { RouteComponent } from '@mc/integration/mf-route';

import { routes } from '@mc/components/mf1';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes('mf1')),
    RouteComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(RouteComponent, { injector: this.injector });
    customElements.define('mf1-v18', element);
  }
}
