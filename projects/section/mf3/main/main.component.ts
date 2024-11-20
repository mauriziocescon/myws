import { ChangeDetectionStrategy, Component, computed, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MfLoaderDirective } from '@mf/integration/mf-loader';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    RouterOutlet,
    MfLoaderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h4>Mf3 section</h4>
    <a class="link" [routerLink]="link()">Go to mf2</a>
    <hr>
    <div [mfLoader]="mf()" [mfInputs]="inputs()"></div>
    <hr>
    <router-outlet/>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent implements OnDestroy {
  link = signal('/mf2');
  mf = signal({ elementId: 'mf4', tag: 'mf4-v19' });

  private value = signal(0);
  private intervalId = setInterval(() => this.value.update(v => v + 1), 1000);

  inputs = computed(() => ({ value: this.value() }));

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
