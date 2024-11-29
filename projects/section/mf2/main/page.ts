import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
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
export class Page {
  protected readonly link = signal('/mf1');
  protected readonly link2 = signal('/mf2/a');
}
