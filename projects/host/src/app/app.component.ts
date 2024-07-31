import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { MfLoaderComponent } from '@mc/integration/mf-loader';
import { HostRouterService } from '@mc/integration/host-router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MfLoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (url of urls(); track url) {
      <button (click)="goTo(url)">Load {{ url }}</button>
    }
    <hr>
    <router-outlet/>`,
})
export class AppComponent {
  router = inject(Router);

  urls = signal<string[]>(['mf1', 'mf2', 'mf3', 'mf3/a', 'mf4']);

  constructor() {
    // exposing HostRouterService using the global scope
    (globalThis as any).HostRouterService = inject(HostRouterService);
  }

  goTo(url: string): void {
    this.router.navigateByUrl(`/${url}`);
  }
}
