import { Component, signal } from '@angular/core';

import { MfLoader } from '@mf/integration/mf-loader';

@Component({
  imports: [
    MfLoader,
  ],
  template: `
    <div class="sub-page">
      <span class="sub-badge">MF3 / Third</span>
      <div class="container">
        <div class="block" [mfLoader]="mf()"></div>
        <div class="block" [mfLoader]="mf()"></div>
      </div>
    </div>
  `,
  styles: `
    .sub-page {
      border-left: 3px solid #f57c00;
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      background: #fff3e0;
      border-radius: 0 4px 4px 0;
    }

    .sub-badge {
      display: inline-block;
      background: #f57c00;
      color: #fff;
      font-weight: bold;
      font-size: 0.7rem;
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
      margin-bottom: 0.5rem;
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
  protected readonly mf = signal({ elementId: 'mf4', tag: 'mf4-v19' });
}
