import { Component, signal } from '@angular/core';

import { MfLoader } from '@mf/integration/mf-loader';

@Component({
  imports: [
    MfLoader,
  ],
  template: `
    <div class="sub-page">
      <span class="sub-badge">MF3 – Child A</span>
      <p class="info">Child route of MF3. Embeds two MF4 instances side by side (no inputs passed).</p>
      <div class="container">
        <div class="block" [mfLoader]="mf()"></div>
        <div class="block" [mfLoader]="mf()"></div>
      </div>
    </div>
  `,
  styles: `
    .sub-page {
      border-left: 3px solid #f57c00;
      padding: 0.75rem 1rem;
      margin: 0.5rem 0;
      background: #fff3e0;
      border-radius: 0 4px 4px 0;
    }

    .sub-badge {
      display: inline-block;
      background: #f57c00;
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

    .container {
      display: flex;
    }

    .block {
      width: 50%;
      margin-right: 10%;
    }
  `,
})
export class Third {
  protected readonly mf = signal({ elementId: 'mf4', tag: 'mf4-v22' });
}
