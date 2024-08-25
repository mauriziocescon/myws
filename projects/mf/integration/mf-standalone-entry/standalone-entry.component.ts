import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { MfRouterService } from '@mf/integration/mf-router';

import { MF_CONFIG } from './mf-config';

@Component({
  selector: 'mf-standalone-entry',
  standalone: true,
  imports: [
    NgComponentOutlet,
  ],
  providers: [MfRouterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngComponentOutlet]="component()" [ngComponentOutletInputs]="inputs()"/>`,
})
export class StandaloneEntryComponent implements OnChanges {
  private mfConfig = inject(MF_CONFIG);
  private mfRouter = inject(MfRouterService);

  @Input() mfInputs: Record<string, unknown> | undefined = undefined;

  component = signal(this.mfConfig['component']);
  inputs = signal<Record<string, unknown> | undefined>({});

  domAvailable = afterNextRender(() => this.mfRouter.setup());

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mfInputs']) {
      this.inputs.set({ ...this.mfInputs });
    }
  }
}
