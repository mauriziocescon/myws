import { Component, computed, effect, input, signal, untracked, viewChild, ViewContainerRef } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';

import { firstValueFrom, from } from 'rxjs';
import { timeout } from 'rxjs/operators';

type StatusType = 'Loading' | 'Loaded' | 'Failed';

@Component({
  selector: 'app-mf-loader',
  standalone: true,
  imports: [],
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
export class MfLoaderComponent {
  mf = input.required<{ elementId: string, tag: string }>();

  private status = signal<StatusType | undefined>(undefined);
  private target = viewChild('target', { read: ViewContainerRef });

  isLoading = computed(() => this.status() === 'Loading');
  failed = computed(() => this.status() === 'Failed');

  mfWatcher = effect(() => {
    this.mf();
    untracked(() => this.load());
  });

  load(): void {
    this.status.set('Loading');

    this.loadElement(this.mf())
      .then(() => {
        const source$ = from(customElements.whenDefined(this.mf().tag)).pipe(timeout(3500));
        return firstValueFrom(source$);
      })
      .then(() => {
        // create element and append it on the DOM
        const ngElement = document.createElement(this.mf().tag) as NgElement & WithProperties<Record<string, any>>;
        this.target()!.element.nativeElement.appendChild(ngElement);
        this.status.set('Loaded');
      })
      .catch(error => {
        error = error.type === 'error' ? { message: 'check the console logs!', name: 'Unexpected' } : error;
        console.error(error);
        this.status.set('Failed');
      });
  }

  loadElement(metadata: { elementId: string, tag: string }): Promise<void> {
    if (!customElements.get(metadata.tag)) {
      const url = `elements/${metadata.elementId}/main.js`;

      return new Promise<void>((resolve, reject) => {
        // main.js contains all (concatenated) js files from the bundle
        const main: HTMLScriptElement = document.createElement('script');
        main.setAttribute('src', url);
        main.setAttribute('async', '');
        main.setAttribute('type', 'application/javascript');
        const onLoadMain = () => {
          main.removeEventListener('load', onLoadMain);
          main.removeEventListener('error', onErrorMain);
          resolve();
        };
        const onErrorMain = (error: any) => {
          main.removeEventListener('load', onLoadMain);
          main.removeEventListener('error', onErrorMain);
          document.head.removeChild(main);
          const reason = `url: ${typeof error === 'string' ? error : JSON.stringify(error)}`;
          reject(reason);
        };

        main.addEventListener('load', onLoadMain);
        main.addEventListener('error', onErrorMain);
        document.head.appendChild(main);
      })
        .catch(error => Promise.reject(error.message || error));
    }

    return Promise.resolve();
  }
}
