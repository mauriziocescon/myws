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
        <h4>Mf3 section</h4>
      </div>
      <div class="mf-body">
        <a class="link" [routerLink]="link()">Go to mf2</a>
        <hr>
        <div [mfLoader]="mf()" [mfInputs]="inputs()"></div>
        <hr>
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

    .link {
      padding: 0.3rem;
      color: #f57c00;
    }
  `,
})
export class Page implements OnDestroy {
  protected readonly link = signal('/mf2');
  protected readonly mf = signal({ elementId: 'mf4', tag: 'mf4-v19' });

  private readonly value = signal(0);
  private readonly intervalId = setInterval(() => this.value.update(v => v + 1), 1000);

  protected readonly inputs = computed(() => ({ value: this.value() }));

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
