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
    <h4>Mf2 section</h4>
    <a class="link" [routerLink]="link()">Go to mf1</a>
    <a class="link" [routerLink]="link2()">Go to mf2/a</a>
    <hr>
    <router-outlet/>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent {
  link = signal('/mf1');
  link2 = signal('/mf2/a');
}
