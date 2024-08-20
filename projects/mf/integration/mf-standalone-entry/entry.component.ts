import { afterNextRender, ChangeDetectionStrategy, Component, inject, Input, OnDestroy } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { MfRouterService } from '@mf/integration/mf-router';

import { MF_CONFIG } from './mf-config';

@Component({
  selector: 'mf-standalone-entry',
  standalone: true,
  imports: [
    NgComponentOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngComponentOutlet]="component" [ngComponentOutletInputs]="mfInputs"/>`,
})
export class EntryComponent implements OnDestroy {
  private mfRouter = inject(MfRouterService);
  private mfConfig = inject(MF_CONFIG);

  @Input() mfInputs: Record<string, unknown> = {};
  component = this.mfConfig['component'];

  domAvailable = afterNextRender(() => this.mfRouter.setup());

  ngOnDestroy(): void {
    this.mfRouter.cleanup();
  }
}
