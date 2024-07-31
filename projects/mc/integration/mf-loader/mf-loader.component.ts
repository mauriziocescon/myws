import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  untracked,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';

import { firstValueFrom, from } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { MfLoaderService } from './mf-loader.service';

type StatusType = 'Loading' | 'Loaded' | 'Failed';

@Component({
  selector: 'mc-mf-loader',
  standalone: true,
  providers: [
    MfLoaderService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #target></div>

    @if (isLoading()) {
      <div>Loading...</div>
    }
    @if (failed()) {
      <div>Failed to load!</div>
      <button (click)="load()">Reload</button>
    }
  `,
})
export class MfLoaderComponent implements OnInit, OnDestroy {
  private mfLoader = inject(MfLoaderService);

  mf = input.required<{ elementId: string, tag: string }>();
  inputs = input<Record<string, unknown>>();
  outputs = input<Record<string, (data: any) => void>>();

  private status = signal<StatusType | undefined>(undefined);
  private target = viewChild('target', { read: ViewContainerRef });

  isLoading = computed(() => this.status() === 'Loading');
  failed = computed(() => this.status() === 'Failed');

  private ngElement: NgElement & WithProperties<Record<string, any>> | undefined = undefined;
  private controller = new AbortController();

  inputsWatcher = effect(() => {
    this.inputs();
    untracked(() => this.updateInputs());
  });

  outputsWatcher = effect(() => {
    this.outputs();
    untracked(() => this.updateOutputs());
  });

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.controller.abort();
  }

  load(): void {
    this.status.set('Loading');

    this.mfLoader
      .loadElement(this.mf())
      .then(() => {
        const source$ = from(customElements.whenDefined(this.mf().tag)).pipe(timeout(3500));
        return firstValueFrom(source$);
      })
      .then(() => {
        // create element and append it on the DOM
        this.ngElement = document.createElement(this.mf().tag) as NgElement & WithProperties<{ tag: string }>;
        this.updateInputs();
        this.updateOutputs();
        this.target()!.element.nativeElement.appendChild(this.ngElement);
        this.status.set('Loaded');
      })
      .catch(error => {
        error = error.type === 'error' ? { message: 'check the console logs!', name: 'Unexpected' } : error;
        console.error(error);
        this.status.set('Failed');
      });
  }

  private updateInputs(): void {
    if (this.ngElement && this.inputs()) {
      const ngElement = this.ngElement as NgElement & WithProperties<Record<string, any>>;
      const inputs = this.inputs() as Record<string, unknown>;
      Object.keys(inputs).forEach(key => ngElement[key] = inputs[key]);
    }
  }

  private updateOutputs(): void {
    if (this.ngElement && this.outputs()) {
      this.controller.abort();
      const ngElement = this.ngElement as NgElement & WithProperties<Record<string, any>>;
      const outputs = this.outputs() as Record<string, (data: unknown) => void>;

      this.controller = new AbortController();
      Object.keys(outputs).forEach(key => {
        ngElement.addEventListener(key, (event: Event) => {
          const customEvent = event as CustomEvent<string>;
          outputs[key](customEvent.detail);
        }, { signal: this.controller.signal });
      });
    }
  }
}
