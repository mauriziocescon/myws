import {
  ChangeDetectionStrategy,
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

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Entry component</div>
    <div>Input: {{ desc }}</div>
    <button (click)="onClick()">Output</button>
    @if (hasRouting()) {
      <hr>
      <router-outlet/>
    }`,
})
export class EntryComponent implements OnInit, OnChanges, OnDestroy {
  private mfRouter = inject(MfRouterService);

  @Input({ required: true }) mf: { elementId: string, tag: string, routing?: boolean } = {
    elementId: '',
    tag: '',
    routing: false,
  };
  @Input({ required: true }) desc: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  hasRouting = signal(false);

  ngOnInit(): void {
    if (this.mf.routing === true) {
      this.hasRouting.set(true);
      this.mfRouter.setup({ elId: this.mf.elementId });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['desc'] && !changes['desc'].isFirstChange()) {
      console.log(`ngOnChanges: desc = ${this.desc}`);
    }
  }

  ngOnDestroy(): void {
    if (this.mf.routing === true) {
      this.mfRouter.cleanup();
    }
  }

  onClick(): void {
    this.valueChanged.emit(`value: ${Date.now()}`);
  }
}
