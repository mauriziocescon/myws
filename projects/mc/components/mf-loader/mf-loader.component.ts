import { Component, computed, input, OnDestroy, OnInit, signal, viewChild, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgElement, WithProperties } from '@angular/elements';

import { firstValueFrom, from, interval } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

type StatusType = 'Loading' | 'Loaded' | 'Failed';

@Component({
  selector: 'mc-mf-loader',
  standalone: true,
  template: `
    <div>Output: {{ outputValue() }}</div>

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
  mf = input.required<{ elementId: string, tag: string }>();

  private status = signal<StatusType | undefined>(undefined);
  private target = viewChild('target', { read: ViewContainerRef });

  outputValue = signal('');
  isLoading = computed(() => this.status() === 'Loading');
  failed = computed(() => this.status() === 'Failed');

  private ngElement: NgElement & WithProperties<{ tag: string }> | undefined = undefined;
  private controller = new AbortController();

  tag$ = interval(5000)
    .pipe(takeUntilDestroyed(), map(v => `${this.mf()?.tag} - ${v}`))
    .subscribe(v => {
      if (this.ngElement) {
        this.ngElement!.tag = v;
      }
    });

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.controller.abort();
  }

  manageEvent(event: Event): void {
    const customEvent = event as CustomEvent<string>;
    this.outputValue.set(customEvent.detail);
  }

  load(): void {
    this.status.set('Loading');

    this.loadElement(this.mf())
      .then(() => {
        const source$ = from(customElements.whenDefined(this.mf().tag)).pipe(timeout(3500));
        return firstValueFrom(source$);
      })
      .then(() => {
        // create element and append it on the DOM
        this.ngElement = document.createElement(this.mf().tag) as NgElement & WithProperties<{ tag: string }>;
        this.ngElement.tag = this.mf().tag;
        this.ngElement.addEventListener('valueChanged', (e: Event) => this.manageEvent(e), { signal: this.controller.signal });
        this.target()!.element.nativeElement.appendChild(this.ngElement);
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
      const url = `elements/${metadata.elementId}/index.js`;

      return new Promise<void>((resolve, reject) => {
        // index.js contains all modules from the bundle
        const index: HTMLScriptElement = document.createElement('script');
        index.setAttribute('src', url);
        index.setAttribute('type', 'module');
        const onLoadIndex = () => {
          index.removeEventListener('load', onLoadIndex);
          index.removeEventListener('error', onErrorIndex);
          resolve();
        };
        const onErrorIndex = (error: any) => {
          index.removeEventListener('load', onLoadIndex);
          index.removeEventListener('error', onErrorIndex);
          document.head.removeChild(index);
          const reason = `url: ${typeof error === 'string' ? error : JSON.stringify(error)}`;
          reject(reason);
        };

        index.addEventListener('load', onLoadIndex);
        index.addEventListener('error', onErrorIndex);
        document.head.appendChild(index);
      })
        .catch(error => Promise.reject(error.message || error));
    }

    return Promise.resolve();
  }
}
