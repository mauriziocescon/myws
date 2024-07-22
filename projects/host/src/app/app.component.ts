import { Component, signal } from '@angular/core';

type StatusType = 'Loading' | 'Loaded' | 'Failed';

@Component({
  selector: 'app-root',
  template: `
    @for (mf of mfs(); track mf.elementId) {
      <button (click)="selectMf(mf)">Load {{ mf.elementId }}</button>
    }
    <app-mf-loader [mf]="selectedMf()"/>
  `,
})
export class AppComponent {
  mfs = signal<{ elementId: string, tag: string }[]>([
    { elementId: 'mf1', tag: 'mf1-v18' },
    { elementId: 'mf2', tag: 'mf2-v18' },
    { elementId: 'mf3', tag: 'mf3-v18' },
  ]);
  selectedMf = signal<{ elementId: string, tag: string }>(this.mfs()[0]);

  selectMf(mf: { elementId: string, tag: string }): void {
    this.selectedMf.set(mf);
  }
}
