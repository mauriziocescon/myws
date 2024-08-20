import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MfRouterService } from '@mc/integration/mf-router';

@Component({
  selector: 'mf-route-entry',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div (click)="onClick()">Mf entry component (click me)</div>
    <router-outlet/>`,
})
export class EntryComponent implements OnChanges, OnDestroy {
  private mfRouter = inject(MfRouterService);

  @Input({ required: true }) mf: { elementId: string, tag: string } = { elementId: '', tag: '' };
  @Output() valueChanged = new EventEmitter<string>();

  domAvailable = afterNextRender(() => this.mfRouter.setup());

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mf']) {
      console.log(`ngOnChanges: mf = ${JSON.stringify(this.mf)}`);
    }
  }

  ngOnDestroy(): void {
    this.mfRouter.cleanup();
  }

  onClick(): void {
    this.valueChanged.emit(`value: ${Date.now()}`);
  }
}
