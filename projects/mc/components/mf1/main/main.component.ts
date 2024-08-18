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
    <h3>Mf1</h3>
    @if (id()) {
      <div class="params">TabId: {{ id() }}</div>
    }
    <a class="link" [routerLink]="link()">Go to mf4</a>
    <a class="link" [routerLink]="link2()">Go to mf3/b</a>`,
  styles: `
    .params {
      padding: 0.3rem;
    }

    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent {
  id = input();
  link = signal('/mf4');
  link2 = signal('/mf3/b');
}
