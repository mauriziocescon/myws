import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>Second</h5>
    <a class="link" [routerLink]="link()">Go to mf1</a>
    <a class="link" [routerLink]="link2()">Go to mf2/a</a>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class Second {
  protected readonly link = signal('/mf1');
  protected readonly link2 = signal('/mf2/a');
}
