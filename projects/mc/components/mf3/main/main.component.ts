import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    AComponent,
    BComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Main</div>
    <a class="link" [routerLink]="link()">Go to mf2</a>
    <hr>
    <router-outlet/>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent {
  link = signal('/mf2');
}
