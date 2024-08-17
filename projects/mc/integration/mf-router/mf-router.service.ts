import { inject, Injectable, NgZone } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

interface IHostRouter {
  getUrl(): string;

  registerRouterCallback(data: { id: string }, callback: (url: string) => void): void;

  unregisterRouterCallback(data: { id: string }): void;

  routerEvent(data: { id: string }, event: NavigationStart): void;
}

@Injectable({
  providedIn: 'root',
})
export class MfRouterService {
  private mfRouter = inject(Router);
  private mfZone = inject(NgZone);
  // setting HostRouterService from the global scope
  private hostRouter: IHostRouter = (globalThis as any).HostRouterService;

  private mfId: string | undefined = undefined;
  private navigationStartSubscription: Subscription | undefined = undefined;

  setup(data: { mfId: string }): void {
    this.mfId = data.mfId;

    this.registerRouterCallback();
    this.listenForNavigationEvent();

    this.mfRouter.navigateByUrl(this.hostRouter.getUrl());
  }

  cleanup(): void {
    this.navigationStartSubscription?.unsubscribe();
    this.unregisterRouterCallback();
  }

  private registerRouterCallback(): void {
    this.hostRouter.registerRouterCallback({ id: this.mfId as string }, (url: string) => {
      this.mfZone.run(() => {
        if (this.mfRouter.url !== url) {
          this.mfRouter.navigateByUrl(url);
        }
      });
    });
  }

  private unregisterRouterCallback(): void {
    this.hostRouter.unregisterRouterCallback({ id: this.mfId as string });
  }

  private listenForNavigationEvent(): void {
    this.navigationStartSubscription?.unsubscribe();

    this.navigationStartSubscription = this.mfRouter
      .events
      .pipe(
        filter(event => event instanceof NavigationStart),
        distinctUntilChanged((prev, curr) => prev['url'] === curr['url']),
      )
      .subscribe(event => this.hostRouter.routerEvent({ id: this.mfId as string }, event));
  }
}
