import { afterNextRender, ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { MfRouter } from '@mf/integration/mf-router';

import { MF_CONFIG } from './mf-config';

@Component({
  imports: [
    NgComponentOutlet,
  ],
  providers: [MfRouter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngComponentOutlet]="component()" [ngComponentOutletInputs]="mfInputs()"/>`,
})
export class StandaloneEntry {
  private readonly mfConfig = inject(MF_CONFIG);
  private readonly mfRouter = inject(MfRouter);

  readonly mfInputs = input<Record<string, unknown>>({});

  readonly component = signal(this.mfConfig['component']);

  private readonly domAvailable = afterNextRender(() => this.mfRouter.setup());
}
