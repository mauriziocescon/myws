import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>AComponent</h5>
    <a class="link" [routerLink]="bLink()">Go to b</a>
    <a class="link" [routerLink]="link()">Go to mf2</a>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class AComponent {
  bLink = signal('/mf3/b');
  link = signal('/mf2');
}
