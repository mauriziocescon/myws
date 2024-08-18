import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (url of urls(); track url) {
      <a class="link" [routerLink]="url">{{ url }}</a>
    }
    <hr>
    <router-outlet/>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class AppComponent {
  urls = signal<string[]>(['/mf1', '/mf1/tab/tabId', '/mf2', '/mf3', '/mf3/a', '/mf4']);
}
