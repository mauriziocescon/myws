import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MfLoaderComponent } from '@mc/components/mf-loader';

type Mf = 'mf1' | 'mf2' | 'mf3' | 'mf4';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MfLoaderComponent,
  ],
  template: `
    @for (url of urls(); track url) {
      <button (click)="goTo(url)">Load {{ url }}</button>
    }
    <hr>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  router = inject(Router);

  urls = signal<Mf[]>(['mf1', 'mf2', 'mf3', 'mf4']);

  goTo(url: string): void {
    this.router.navigateByUrl(`/${url}`);
  }
}
