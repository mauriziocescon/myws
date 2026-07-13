import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
  ],
  template: `
    <div class="mf-container">
      <div class="mf-header">
        <span class="mf-badge">MF1</span>
        <h4>MF1 – Page</h4>
      </div>
      <div class="mf-body">
        <p class="info">This is MF1's main page. Links below trigger cross-MF navigation via the host router.</p>
        <nav class="nav-links">
          <a class="link" [routerLink]="'/mf1/detail/42'">
            <span class="link-action">Navigate within MF1</span>
            <span class="link-url">/mf1/detail/42</span>
          </a>
          <a class="link" [routerLink]="'/mf2'">
            <span class="link-action">Navigate to MF2</span>
            <span class="link-url">/mf2</span>
          </a>
          <a class="link" [routerLink]="'/mf2/b'">
            <span class="link-action">Navigate to MF2, child route</span>
            <span class="link-url">/mf2/b</span>
          </a>
        </nav>
        @if (id()) {
          <div class="params">
            <strong>Route param received:</strong> id = <code>{{ id() }}</code>
          </div>
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

    .info {
      font-size: 0.85rem;
      color: #555;
      margin: 0 0 0.75rem;
    }

    .nav-links {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 0.75rem;
    }

    .link {
      display: flex;
      flex-direction: column;
      padding: 0.4rem 0.6rem;
      color: #1976d2;
      border: 1px solid #1976d2;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .link:hover {
      background: #e3f2fd;
    }

    .link-action {
      font-weight: 500;
    }

    .link-url {
      font-size: 0.75rem;
      font-family: monospace;
      color: #666;
    }

    .params {
      padding: 0.5rem;
      background: #e3f2fd;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    code {
      background: #fff;
      padding: 0.1rem 0.3rem;
      border-radius: 2px;
    }
  `,
})
export class Page {
  readonly id = input();
}
