import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>Mf4 reusable component</h5>
    <a class="link" [routerLink]="link()">Go to mf1</a>
    @if (showValue()) {
      <div class="link">Input: {{ value() }}</div>
    } @else {
      <div class="link">No inputs!</div>
    }`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class Main {
  readonly value = input<number>();
  protected readonly showValue = computed(() => this.value() != undefined);

  protected readonly link = signal('/mf1');
}
