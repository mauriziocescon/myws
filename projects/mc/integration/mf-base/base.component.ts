import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { MfRouterService } from '@mc/integration/mf-router';

@Component({
  selector: 'app-generic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Input: {{ desc }}</div>
    <div>Signal: {{ status() }}</div>
    <button (click)="onClick()">Output</button>`,
})
export class BaseComponent implements OnChanges {
  private mfRouter = inject(MfRouterService);

  @Input({ required: true }) mf: { elementId: string, tag: string } = { elementId: '', tag: '' };
  @Input({ required: true }) desc: string = '';
  @Output() valueChanged = new EventEmitter<string>();

  status = computed(() => `${this.mf.tag} loaded!`);

  ngOnInit(): void {
    this.mfRouter.setup({ elId: this.mf.elementId });
  }

  ngOnDestroy(): void {
    this.mfRouter.cleanup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['desc'] && !changes['desc'].isFirstChange()) {
      console.log(`ngOnChanges: desc = ${this.desc}`);
    }
  }

  onClick(): void {
    this.valueChanged.emit(`value: ${Date.now()}`);
  }
}
