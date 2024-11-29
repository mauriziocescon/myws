import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      <li><strong>Host</strong></li>
      @for (url of urls(); track url) {
        <li><a class="link" [routerLink]="url">{{ url }}</a></li>
      }
    </ul>
    <hr>
    <router-outlet/>`,
  styles: `
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    li {
      font-size: 1.7rem;
      display: inline;
      padding: 0.3rem;
    }

    .link {
      padding: 0.3rem;
    }`,
})
export class App {
  protected readonly urls = signal(['/mf1', '/mf1/tab/tabId', '/mf2', '/mf2/a', '/mf3', '/mf3/a', '/mf3/b']);
}
