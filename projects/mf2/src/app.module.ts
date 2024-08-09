import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { BaseComponent } from '@mc/integration/mf-base';

@NgModule({
  imports: [
    BrowserModule,
    BaseComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection(),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(BaseComponent, { injector: this.injector });
    customElements.define('mf2-v18', element);
  }
}
