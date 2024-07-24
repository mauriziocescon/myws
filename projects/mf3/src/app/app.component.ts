import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div>Input: {{ tag }}</div>
    <div>Signal: {{ status() }}</div>
    <button (click)="onClick()">Output</button>`,
})
export class AppComponent implements OnChanges {
  @Input({ required: true }) tag: string = '';
  @Output() valueChanged = new EventEmitter<string>();
  status = signal('Mf3 loaded!');

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges: ${this.tag}`);
  }

  onClick(): void {
    this.valueChanged.emit(`${Date.now()}`);
  }
}
