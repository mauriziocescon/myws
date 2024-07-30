import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>Input: {{ desc }}</div>
    <div>Signal: {{ status() }}</div>
    <button (click)="onClick()">Output</button>`,
})
export class AppComponent implements OnChanges {
  @Input({ required: true }) desc: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  status = signal('Mf1 loaded!');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['desc'] && !changes['desc'].isFirstChange()) {
      console.log(`ngOnChanges: desc = ${this.desc}`);
    }
  }

  onClick(): void {
    this.valueChanged.emit(`value: ${Date.now()}`);
  }
}
