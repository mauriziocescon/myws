import { afterNextRender, ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { MfRouterService } from '@mf/integration/mf-router';

import { MF_CONFIG } from './mf-config';

@Component({
  imports: [
    NgComponentOutlet,
  ],
  providers: [MfRouterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngComponentOutlet]="component()" [ngComponentOutletInputs]="mfInputs()"/>`,
})
export class StandaloneEntryComponent {
  private mfConfig = inject(MF_CONFIG);
  private mfRouter = inject(MfRouterService);

  mfInputs = input<Record<string, unknown> | undefined>(undefined);

  component = signal(this.mfConfig['component']);

  domAvailable = afterNextRender(() => this.mfRouter.setup());
}
