import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MfRouterService } from '@mc/integration/mf-router';

import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AComponent,
    BComponent,
  ],
  template: `
    <div>Input: {{ desc }}</div>
    <div>Signal: {{ status() }}</div>
    <button (click)="onClick()">Output</button>
    <hr>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {
  private mfRouter = inject(MfRouterService);

  @Input({ required: true }) mf: { elementId: string, tag: string } = { elementId: '', tag: '' };
  @Input({ required: true }) desc: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  status = signal('Mf3 loaded!');

  ngOnInit(): void {
    this.mfRouter.setup({ elId: this.mf.elementId });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['desc'] && !changes['desc'].isFirstChange()) {
      console.log(`ngOnChanges: desc = ${this.desc}`);
    }
  }

  ngOnDestroy(): void {
    this.mfRouter.cleanup();
  }

  onClick(): void {
    this.valueChanged.emit(`value: ${Date.now()}`);
  }
}
