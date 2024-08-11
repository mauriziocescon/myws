import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { defineRoutes, EntryComponent } from '@mc/integration/mf-entry';

import { mf2Routes } from '@mc/components/mf2';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(defineRoutes('mf2', mf2Routes)),
    EntryComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection(),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(EntryComponent, { injector: this.injector });
    customElements.define('mf2-v18', element);
  }
}
