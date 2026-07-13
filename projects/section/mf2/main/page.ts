import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <div class="mf-container">
      <div class="mf-header">
        <span class="mf-badge">MF2</span>
        <h4>MF2 – Page</h4>
      </div>
      <div class="mf-body">
        <p class="info">This is MF2's main page with child routes rendered below.</p>
        <nav class="nav-links">
          <a class="link" [routerLink]="'/mf1'">
            <span class="link-action">Navigate to MF1</span>
            <span class="link-url">/mf1</span>
          </a>
          <a class="link" [routerLink]="'/mf2/a'">
            <span class="link-action">Load child route A</span>
            <span class="link-url">/mf2/a</span>
          </a>
          <a class="link" [routerLink]="'/mf2/b'">
            <span class="link-action">Load child route B</span>
            <span class="link-url">/mf2/b</span>
          </a>
        </nav>
        <hr>
        <router-outlet />
      </div>
    </div>
  `,
  styles: `
    .mf-container {
      border: 2px solid #388e3c;
      border-radius: 8px;
      margin: 0.5rem;
      overflow: hidden;
    }

    .mf-header {
      background: #388e3c;
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
      color: #388e3c;
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
    }

    .link {
      display: flex;
      flex-direction: column;
      padding: 0.4rem 0.6rem;
      color: #388e3c;
      border: 1px solid #388e3c;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .link:hover {
      background: #e8f5e9;
    }

    .link-action {
      font-weight: 500;
    }

    .link-url {
      font-size: 0.75rem;
      font-family: monospace;
      color: #666;
    }
  `,
})
export class Page {
}
