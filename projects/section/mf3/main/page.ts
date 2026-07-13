import { Component, computed, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MfLoader } from '@mf/integration/mf-loader';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    RouterOutlet,
    MfLoader,
  ],
  template: `
    <div class="mf-container">
      <div class="mf-header">
        <span class="mf-badge">MF3</span>
        <h4>MF3 – Page</h4>
      </div>
      <div class="mf-body">
        <p class="info">This is MF3's main page. It embeds MF4 as a standalone widget and has child routes below.</p>
        <nav class="nav-links">
          <a class="link" [routerLink]="'/mf2'">
            <span class="link-action">Navigate to MF2</span>
            <span class="link-url">/mf2</span>
          </a>
          <a class="link" [routerLink]="'/mf3/a'">
            <span class="link-action">Load child route A</span>
            <span class="link-url">/mf3/a</span>
          </a>
          <a class="link" [routerLink]="'/mf3/b'">
            <span class="link-action">Load child route B (renders MF4)</span>
            <span class="link-url">/mf3/b</span>
          </a>
        </nav>
        <hr>
        <p class="section-label">⬇ MF4 embedded directly (not via route, receives an input):</p>
        <div [mfLoader]="mf()" [mfInputs]="inputs()"></div>
        <hr>
        <p class="section-label">⬇ Child route rendered here:</p>
        <router-outlet />
      </div>
    </div>
  `,
  styles: `
    .mf-container {
      border: 2px solid #f57c00;
      border-radius: 8px;
      margin: 0.5rem;
      overflow: hidden;
    }

    .mf-header {
      background: #f57c00;
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
      color: #f57c00;
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
      color: #f57c00;
      border: 1px solid #f57c00;
      border-radius: 4px;
      text-decoration: none;
      font-size: 0.85rem;
    }

    .link:hover {
      background: #fff3e0;
    }

    .link-action {
      font-weight: 500;
    }

    .link-url {
      font-size: 0.75rem;
      font-family: monospace;
      color: #666;
    }

    .section-label {
      font-size: 0.85rem;
      color: #555;
      margin: 0.5rem 0 0.25rem;
    }
  `,
})
export class Page implements OnDestroy {
  protected readonly mf = signal({ elementId: 'mf4', tag: 'mf4-v22' });

  private readonly value = signal(0);
  private readonly intervalId = setInterval(() => this.value.update(v => v + 1), 1000);

  protected readonly inputs = computed(() => ({ value: this.value() }));

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
