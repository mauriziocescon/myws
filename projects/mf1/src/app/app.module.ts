import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    provideHttpClient(),
  ],
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap(): void {
    const element = createCustomElement(AppComponent, { injector: this.injector });
    try {
      customElements.define('mf1-v18', element);
    } catch (e) {
      console.log(e);
    }
  }
}
