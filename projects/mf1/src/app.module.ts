import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { routes, RoutesComponent } from '@mc/components/routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes('mf1')),
    RoutesComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(RoutesComponent, { injector: this.injector });
    customElements.define('mf1-v18', element);
  }
}
