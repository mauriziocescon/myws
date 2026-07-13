import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
  ],
  template: `
    <div class="mf-container">
      <div class="mf-header">
        <span class="mf-badge">MF4</span>
        <span class="mf-title">Mf4 reusable component</span>
      </div>
      <div class="mf-body">
        <a class="link" [routerLink]="link()">Go to mf1</a>
        @if (showValue()) {
          <div class="value">Input: {{ value() }}</div>
        } @else {
          <div class="value">No inputs!</div>
        }
      </div>
    </div>
  `,
  styles: `
    .mf-container {
      border: 2px solid #7b1fa2;
      border-radius: 8px;
      margin: 0.5rem;
      overflow: hidden;
    }

    .mf-header {
      background: #7b1fa2;
      color: #fff;
      padding: 0.4rem 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .mf-title {
      font-weight: bold;
      font-size: 0.9rem;
    }

    .mf-badge {
      background: #fff;
      color: #7b1fa2;
      font-weight: bold;
      font-size: 0.7rem;
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
    }

    .mf-body {
      padding: 0.75rem;
    }

    .link {
      padding: 0.3rem;
      color: #7b1fa2;
    }

    .value {
      padding: 0.3rem;
      font-family: monospace;
    }
  `,
})
export class Main {
  readonly value = input<number>();
  protected readonly showValue = computed(() => this.value() != undefined);

  protected readonly link = signal('/mf1');
}
