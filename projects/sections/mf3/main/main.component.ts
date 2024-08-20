import { ChangeDetectionStrategy, Component, computed, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MfLoaderDirective } from '@mf/integration/mf-loader';

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
export class MainComponent implements OnDestroy {
  link = signal('/mf2');
  mf = signal({ elementId: 'mf4', tag: 'mf4-v18' });

  private value = signal(0);
  // private intervalId = setInterval(() => this.value.update(v => v + 1), 1000);

  inputs = computed(() => ({ value: this.value() }));

  ngOnDestroy(): void {
    // clearInterval(this.intervalId);
  }
}
