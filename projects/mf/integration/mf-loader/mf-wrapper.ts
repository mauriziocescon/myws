import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';

import { MfLoader } from './mf-loader';

@Component({
  selector: 'mc-mf-loader',
  imports: [
    MfLoader,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (mf()) {
      <div #mfLoader="mfLoader" [mfLoader]="mf()" [mfInputs]="inputs()"></div>
    }
    @if (isLoading()) {
      <div>Loading...</div>
    }
    @if (failed()) {
      <div>Failed to load!</div>
      <button (click)="reload()">Reload</button>
    }`,
})
export class MfWrapper {
  readonly mf = input.required<{ elementId: string, tag: string }>();
  readonly inputs = input<Record<string, unknown>>();

  private readonly mfLoader = viewChild.required<MfLoader>('mfLoader');
  private readonly status = computed(() => this.mfLoader()?.status());

  protected readonly isLoading = computed(() => this.status() === 'Loading');
  protected readonly failed = computed(() => this.status() === 'Failed');

  reload() {
    this.mfLoader().load();
  }
}
