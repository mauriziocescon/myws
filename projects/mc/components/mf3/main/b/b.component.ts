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
    <h5>BComponent</h5>
    <a class="link" [routerLink]="aLink()">Go to a</a>
    <a class="link" [routerLink]="link()">Go to mf4</a>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class BComponent {
  aLink = signal('/mf3/a');
  link = signal('/mf4');
}
