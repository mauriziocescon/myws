import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
  ],
  template: `
    <div class="sub-page">
      <span class="sub-badge">MF2 – Child B</span>
      <p class="info">Child route of MF2. Rendered inside MF2's router-outlet.</p>
      <nav class="nav-links">
        <a class="link" [routerLink]="'/mf1'">
          <span class="link-action">Navigate to MF1</span>
          <span class="link-url">/mf1</span>
        </a>
        <a class="link" [routerLink]="'/mf2/a'">
          <span class="link-action">Switch to sibling child A</span>
          <span class="link-url">/mf2/a</span>
        </a>
      </nav>
    </div>
  `,
  styles: `
    .sub-page {
      border-left: 3px solid #388e3c;
      padding: 0.75rem 1rem;
      margin: 0.5rem 0;
      background: #e8f5e9;
      border-radius: 0 4px 4px 0;
    }

    .sub-badge {
      display: inline-block;
      background: #388e3c;
      color: #fff;
      font-weight: bold;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 3px;
      margin-bottom: 0.5rem;
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
      background: #c8e6c9;
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
export class Second {
}
