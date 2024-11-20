import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MfRouterService } from '@mf/integration/mf-router';

@Component({
  imports: [
    RouterOutlet,
  ],
  providers: [MfRouterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet/>`,
})
export class SectionEntryComponent {
  private mfRouter = inject(MfRouterService);

  domAvailable = afterNextRender(() => this.mfRouter.setup());
}
