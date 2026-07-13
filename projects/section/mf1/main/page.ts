import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
  ],
  template: `
    <div class="mf-container">
      <div class="mf-header">
        <span class="mf-badge">MF1</span>
        <h4>Mf1 section</h4>
      </div>
      <div class="mf-body">
        <a class="link" [routerLink]="link()">Go to mf2</a>
        <a class="link" [routerLink]="link2()">Go to mf2/b</a>
        <a class="link" [routerLink]="link3()">Go to /mf1/tab/tabId</a>
        @if (id()) {
          <div class="params">TabId: {{ id() }}</div>
        }
      </div>
    </div>
  `,
  styles: `
    .mf-container {
      border: 2px solid #1976d2;
      border-radius: 8px;
      margin: 0.5rem;
      overflow: hidden;
    }

    .mf-header {
      background: #1976d2;
      color: #fff;
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .mf-header h4 {
      margin: 0;
    }

    .mf-badge {
      background: #fff;
      color: #1976d2;
      font-weight: bold;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .mf-body {
      padding: 1rem;
    }

    .params {
      padding: 0.3rem;
    }

    .link {
      padding: 0.3rem;
      color: #1976d2;
    }
  `,
})
export class Page {
  readonly id = input();
  protected readonly link = signal('/mf2');
  protected readonly link2 = signal('/mf2/b');
  protected readonly link3 = signal('/mf1/tab/tabId');
}
