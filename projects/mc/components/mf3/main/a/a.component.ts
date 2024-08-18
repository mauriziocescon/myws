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
    <h5>Component_A</h5>
    <a class="link" [routerLink]="link()">Go to mf2</a>
    <a class="link" [routerLink]="link2()">Go to mf3/b</a>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class AComponent {
  link = signal('/mf2');
  link2 = signal('/mf3/b');
}
