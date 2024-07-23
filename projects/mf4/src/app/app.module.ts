import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoBootstrap, Injector, NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    provideExperimentalZonelessChangeDetection(),
  ],
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap(): void {
    const element = createCustomElement(AppComponent, { injector: this.injector });
    try {
      customElements.define('mf4-v18', element);
    } catch (e) {
      console.log(e);
    }
  }
}
