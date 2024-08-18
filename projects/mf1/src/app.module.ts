import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { EntryComponent, provideRoutesMf } from '@mc/integration/mf-route-entry';

import { mf1Routes } from '@mc/components/mf1';

@NgModule({
  imports: [
    BrowserModule,
    EntryComponent,
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRoutesMf('mf1', mf1Routes, withComponentInputBinding()),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(EntryComponent, { injector: this.injector });
    customElements.define('mf1-v18', element);
  }
}
