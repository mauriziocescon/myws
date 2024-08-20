import {
  afterNextRender,
  Directive,
  effect,
  inject,
  input,
  OnDestroy,
  Renderer2,
  signal,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';

import { firstValueFrom, from } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { MfLoaderService } from './mf-loader.service';

type StatusType = 'Loading' | 'Loaded' | 'Failed';

@Directive({
  selector: '[mfLoader]',
  standalone: true,
  exportAs: 'mfLoader',
  providers: [
    MfLoaderService,
  ],
})
export class MfLoaderDirective implements OnDestroy {
  private vcr = inject(ViewContainerRef);
  private renderer = inject(Renderer2);
  private mfLoader = inject(MfLoaderService);

  mf = input.required<{ elementId: string, tag: string }>({ alias: 'mfLoader' });
  inputs = input<Record<string, unknown> | undefined>(undefined, { alias: 'mfInputs' });

  status = signal<StatusType | undefined>(undefined);

  private ngElement: NgElement & WithProperties<Record<string, any>> | undefined = undefined;

  private inputsWatcher = effect(() => {
    this.inputs();
    untracked(() => this.updateInputs());
  });

  private domAvailable = afterNextRender(() => this.load());

  ngOnDestroy(): void {
    this.vcr.clear();
  }

  load(): void {
    this.status.set('Loading');
    this.vcr.clear();

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
        this.renderer.appendChild(this.vcr.element.nativeElement, this.ngElement);
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
      ngElement['mfInputs'] = { ...this.inputs() };
    }
  }

  // todo: check outputs availability
  // private updateOutputs(): void {
  //   if (this.ngElement && this.outputs()) {
  //     this.controller.abort();
  //     const ngElement = this.ngElement as NgElement & WithProperties<Record<string, any>>;
  //     const outputs = this.outputs() as Record<string, (data: unknown) => void>;
  //
  //     this.controller = new AbortController();
  //     Object.keys(outputs).forEach(key => {
  //       ngElement.addEventListener(key, (event: Event) => {
  //         const customEvent = event as CustomEvent<string>;
  //         outputs[key](customEvent.detail);
  //       }, { signal: this.controller.signal });
  //     });
  //   }
  // }
}
