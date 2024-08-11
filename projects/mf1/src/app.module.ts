import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, inject, Injector, NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { defineRoutes, EntryComponent } from '@mc/integration/mf-entry';

import { mf1Routes } from '@mc/components/mf1';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(defineRoutes('mf1', mf1Routes)),
    EntryComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(EntryComponent, { injector: this.injector });
    customElements.define('mf1-v18', element);
  }
}
