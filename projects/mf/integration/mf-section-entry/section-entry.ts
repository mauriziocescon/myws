import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MfRouter } from '@mf/integration/mf-router';

@Component({
  imports: [
    RouterOutlet,
  ],
  providers: [MfRouter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet/>`,
})
export class SectionEntry {
  private readonly mfRouter = inject(MfRouter);

  private readonly domAvailable = afterNextRender(() => this.mfRouter.setup());
}
