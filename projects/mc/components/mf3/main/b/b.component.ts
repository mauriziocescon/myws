import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-b',
  standalone: true,
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>Component_B</h5>
    <a class="link" [routerLink]="link()">Go to mf4</a>
    <a class="link" [routerLink]="link2()">Go to a</a>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class BComponent {
  link = signal('/mf4');
  link2 = signal('/mf3/a');
}
