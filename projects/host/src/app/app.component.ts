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
    <ul>
      <li>Host</li>
      @for (url of urls(); track url) {
        <li><a class="link" [routerLink]="url">{{ url }}</a></li>
      }
    </ul>
    <hr>
    <router-outlet/>`,
  styles: `
    ul {
      font-size: 1.5rem;
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    li {
      display: inline;
      padding: 0.3rem;
    }

    .link {
      padding: 0.3rem;
    }`,
})
export class AppComponent {
  urls = signal<string[]>(['/mf1', '/mf1/tab/tabId', '/mf2', '/mf2/a', '/mf3']);
}
