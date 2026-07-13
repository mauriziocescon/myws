import { Component, signal } from '@angular/core';
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
        <h4>Mf2 section</h4>
      </div>
      <div class="mf-body">
        <a class="link" [routerLink]="link()">Go to mf1</a>
        <a class="link" [routerLink]="link2()">Go to mf2/a</a>
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

    .link {
      padding: 0.3rem;
      color: #388e3c;
    }
  `,
})
export class Page {
  protected readonly link = signal('/mf1');
  protected readonly link2 = signal('/mf2/a');
}
