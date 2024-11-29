import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MfLoader } from '@mf/integration/mf-loader';

@Component({
  imports: [
    MfLoader,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <div class="block" [mfLoader]="mf()"></div>
      <div class="block" [mfLoader]="mf()"></div>
    </div>`,
  styles: `
    .container {
      display: flex;
    }

    .block {
      width: 50%;
      margin-right: 10%;
    }`,
})
export class Third {
  protected readonly mf = signal({ elementId: 'mf4', tag: 'mf4-v19' });
}
