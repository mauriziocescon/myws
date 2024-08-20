import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { interval } from 'rxjs';

import { MfLoaderDirective } from '@mc/integration/mf-loader';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    MfLoaderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Mf3</h3>
    <a class="link" [routerLink]="link()">Go to mf2</a>
    <hr>
    <div [mfLoader]="mf()" [mfInputs]="inputs()"></div>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent {
  link = signal('/mf2');
  mf = signal({ elementId: 'mf4', tag: 'mf4-v18' });

  private value$ = interval(1000);
  private value = toSignal(this.value$);
  inputs = computed(() => ({ value: this.value() }));
}
