import { Component, computed, input } from '@angular/core';
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
        <span class="mf-title">MF4 – Standalone</span>
      </div>
      <div class="mf-body">
        <p class="info">Standalone widget. Not tied to a URL — loaded programmatically by other MFs.</p>
        <nav class="nav-links">
          <a class="link" [routerLink]="'/mf1'">
            <span class="link-action">Navigate to MF1</span>
            <span class="link-url">/mf1</span>
          </a>
        </nav>
        @if (showValue()) {
          <div class="value">Input received from host MF: <code>{{ value() }}</code></div>
        } @else {
          <div class="value">No inputs received (loaded without bindings)</div>
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

    .info {
      font-size: 0.85rem;
      color: #555;
      margin: 0 0 0.5rem;
    }

    .nav-links {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
    }

    .link {
      display: flex;
      flex-direction: column;
      padding: 0.4rem 0.6rem;
      color: #7b1fa2;
      border: 1px solid #7b1fa2;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .link:hover {
      background: #f3e5f5;
    }

    .link-action {
      font-weight: 500;
    }

    .link-url {
      font-size: 0.75rem;
      font-family: monospace;
      color: #666;
    }

    .value {
      font-size: 0.9rem;
      padding: 0.4rem;
      background: #f3e5f5;
      border-radius: 4px;
    }

    code {
      background: #fff;
      padding: 0.1rem 0.3rem;
      border-radius: 2px;
      font-weight: bold;
    }
  `,
})
export class Main {
  readonly value = input<number>();
  protected readonly showValue = computed(() => this.value() != undefined);
}
