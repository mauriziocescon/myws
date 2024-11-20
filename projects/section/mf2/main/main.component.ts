import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    RouterOutlet,

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
