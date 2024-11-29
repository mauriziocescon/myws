import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4>Mf1 section</h4>
    <a class="link" [routerLink]="link()">Go to mf2</a>
    <a class="link" [routerLink]="link2()">Go to mf2/b</a>
    <a class="link" [routerLink]="link3()">Go to /mf1/tab/tabId</a>
    @if (id()) {
      <div class="params">TabId: {{ id() }}</div>
    }`,
  styles: `
    .params {
      padding: 0.3rem;
    }

    .link {
      padding: 0.3rem;
    }`,
})
export class Page {
  readonly id = input();
  protected readonly link = signal('/mf2');
  protected readonly link2 = signal('/mf2/b');
  protected readonly link3 = signal('/mf1/tab/tabId');
}
