import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>Input: {{ tag }}</div>
    <div>Signal: {{ status() }}</div>`,
})
export class AppComponent implements OnChanges {
  @Input({ required: true }) tag: string = '';
  status = signal('Mf1 loaded!');

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges: ${this.tag}`);
  }
}
