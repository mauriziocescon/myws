import { ChangeDetectionStrategy, Component, computed, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MfLoader } from '@mf/integration/mf-loader';

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
    RouterOutlet,
    MfLoader,
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
