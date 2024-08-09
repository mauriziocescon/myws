import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { GenericComponent } from '@mc/components/generic';

@NgModule({
  imports: [
    BrowserModule,
    GenericComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection(),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(GenericComponent, { injector: this.injector });
    customElements.define('mf2-v18', element);
  }
}
