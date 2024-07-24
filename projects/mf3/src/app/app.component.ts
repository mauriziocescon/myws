import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div>Input: {{ tag }}</div>
    <div>Signal: {{ status() }}</div>`,
})
export class AppComponent implements OnChanges {
  @Input({ required: true }) tag: string = '';
  status = signal('Mf3 loaded!');

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`ngOnChanges: ${this.tag}`);
  }
}
