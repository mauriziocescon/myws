import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4>Mf4</h4>
    <a class="link" [routerLink]="link()">Go to mf1</a>
    @if (value()) {
      <div>Input: {{ value() }}</div>
    }`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent {
  value = input<number>(-1);

  link = signal('/mf1');
}
