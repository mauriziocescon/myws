import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoBootstrap, inject, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { GenericComponent } from '@mc/components/generic';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    GenericComponent,
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class AppModule implements DoBootstrap {
  private injector = inject(Injector);

  ngDoBootstrap(): void {
    const element = createCustomElement(GenericComponent, { injector: this.injector });
    customElements.define('mf2-v18', element);
  }
}
