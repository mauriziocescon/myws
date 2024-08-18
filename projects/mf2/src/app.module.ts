import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withComponentInputBinding } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { EntryComponent, provideRoutesMf } from '@mc/integration/mf-route-entry';

import { mf2Routes } from '@mc/components/mf2';

@NgModule({
  imports: [
    BrowserModule,
    EntryComponent,
  ],
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRoutesMf('mf2', mf2Routes, withComponentInputBinding()),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(EntryComponent, { injector: this.injector });
    customElements.define('mf2-v18', element);
  }
}
