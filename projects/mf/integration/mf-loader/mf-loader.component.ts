import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';

import { MfLoaderDirective } from './mf-loader.directive';

@Component({
  selector: 'mc-mf-loader',
  imports: [
    MfLoaderDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (mf()) {
      <div [mfLoader]="mf()"
           [mfInputs]="inputs()"
           #mfLoader="mfLoader">
      </div>
    }
    @if (isLoading()) {
      <div>Loading...</div>
    }
    @if (failed()) {
      <div>Failed to load!</div>
      <button (click)="reload()">Reload</button>
    }`,
})
export class MfLoaderComponent {
  mf = input.required<{ elementId: string, tag: string }>();
  inputs = input<Record<string, unknown>>();

  private mfLoader = viewChild.required<MfLoaderDirective>('mfLoader');
  private status = computed(() => this.mfLoader()?.status());

  isLoading = computed(() => this.status() === 'Loading');
  failed = computed(() => this.status() === 'Failed');

  reload(): void {
    this.mfLoader().load();
  }
}
