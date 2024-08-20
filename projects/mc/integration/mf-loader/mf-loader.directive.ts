import {
  afterNextRender,
  computed,
  Directive,
  effect,
  inject,
  input,
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
  providers: [
    MfLoaderService,
  ],
})
export class MfLoaderDirective {
  private vcr = inject(ViewContainerRef);
  private renderer = inject(Renderer2);
  private mfLoader = inject(MfLoaderService);

  mf = input.required<{ elementId: string, tag: string }>({ alias: 'mfLoader' });
  inputs = input<Record<string, unknown> | undefined>(undefined, { alias: 'mfInputs' });
  outputs = input<Record<string, (data: any) => void> | undefined>(undefined, { alias: 'mfOutputs' });

  private status = signal<StatusType | undefined>(undefined);

  isLoading = computed(() => this.status() === 'Loading');
  failed = computed(() => this.status() === 'Failed');

  private ngElement: NgElement & WithProperties<Record<string, any>> | undefined = undefined;

  inputsWatcher = effect(() => {
    this.inputs();
    untracked(() => this.updateInputs());
  });

  domAvailable = afterNextRender(() => this.load());

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
      ngElement['mfInputs'] = this.inputs();
    }
  }
}
