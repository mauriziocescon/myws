import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MfLoaderDirective } from '@mf/integration/mf-loader';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [
    RouterLink,
    MfLoaderDirective,
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
export class AComponent {
  mf = signal({ elementId: 'mf4', tag: 'mf4-v18' });
}
