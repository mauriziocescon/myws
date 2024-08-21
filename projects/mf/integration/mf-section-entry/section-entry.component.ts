import { afterNextRender, ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MfRouterService } from '@mf/integration/mf-router';

@Component({
  selector: 'mf-section-entry',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet/>`,
})
export class SectionEntryComponent implements OnDestroy {
  private mfRouter = inject(MfRouterService);

  domAvailable = afterNextRender(() => this.mfRouter.setup());

  ngOnDestroy(): void {
    this.mfRouter.cleanup();
  }
}
