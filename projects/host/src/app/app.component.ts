import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MfLoaderComponent } from '@mc/integration/mf-loader';
import { HostRouterService } from '@mc/integration/host-router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MfLoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (url of urls(); track url) {
      <a class="link" [routerLink]="url">Load {{ url }}</a>
    }
    <hr>
    <router-outlet/>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class AppComponent {
  urls = signal<string[]>(['/mf1', '/mf2', '/mf3', '/mf3/a', '/mf4']);

  constructor() {
    // exposing HostRouterService using the global scope
    (globalThis as any).HostRouterService = inject(HostRouterService);
  }
}
