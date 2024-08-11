import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Mf1</h3>
    <a class="link" [routerLink]="link()">Go to mf4</a>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent {
  link = signal('/mf4');
}
