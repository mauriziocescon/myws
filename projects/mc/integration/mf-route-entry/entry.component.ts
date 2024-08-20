import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MfRouterService } from '@mc/integration/mf-router';

@Component({
  selector: 'mf-route-entry',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet/>`,
})
export class EntryComponent implements OnDestroy {
  private mfRouter = inject(MfRouterService);

  domAvailable = afterNextRender(() => this.mfRouter.setup());

  ngOnDestroy(): void {
    this.mfRouter.cleanup();
  }
}
