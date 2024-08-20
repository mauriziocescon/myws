import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngComponentOutlet]="component()" [ngComponentOutletInputs]="inputs()"/>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  private mfRouter = inject(MfRouterService);
  private mfConfig = inject(MF_CONFIG);

  @Input() mfInputs: Record<string, unknown> | undefined = undefined;

  component = signal(this.mfConfig['component']);
  inputs = signal<Record<string, unknown> | undefined>({});

  domAvailable = afterNextRender(() => this.mfRouter.setup());

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mfInputs']) {
      this.inputs.set({ ...this.mfInputs });
    }
  }

  ngOnDestroy(): void {
    this.mfRouter.cleanup();
  }
}
