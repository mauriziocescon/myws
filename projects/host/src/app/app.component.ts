import { Component, signal } from '@angular/core';

type Mf = 'mf1' | 'mf2' | 'mf3' | 'mf4';

@Component({
  selector: 'app-root',
  template: `
    @for (mf of mfs(); track mf.elementId) {
      <button (click)="selectMf(mf)">Load {{ mf.elementId }}</button>
    }

    @if (selectedMf().elementId === 'mf1') {
      <app-mf-loader [mf]="selectedMf()"/>
    } @else if (selectedMf().elementId === 'mf2') {
      <app-mf-loader [mf]="selectedMf()"/>
    } @else if (selectedMf().elementId === 'mf3') {
      <app-mf-loader [mf]="selectedMf()"/>
    } @else if (selectedMf().elementId === 'mf4') {
      <app-mf-loader [mf]="selectedMf()"/>
    }
  `,
})
export class AppComponent {
  mfs = signal<{ elementId: Mf, tag: string }[]>([
    { elementId: 'mf1', tag: 'mf1-v18' },
    { elementId: 'mf2', tag: 'mf2-v18' },
    { elementId: 'mf3', tag: 'mf3-v18' },
    { elementId: 'mf4', tag: 'mf4-v18' },
  ]);
  selectedMf = signal<{ elementId: Mf, tag: string }>({ elementId: 'mf1', tag: 'mf1-v18' });

  selectMf(mf: { elementId: Mf, tag: string }): void {
    this.selectedMf.set(mf);
  }
}
