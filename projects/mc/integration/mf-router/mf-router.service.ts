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
  private elementRouter = inject(Router);
  private elementZone = inject(NgZone);
  // setting HostRouterService from the global scope
  private hostRouter: IHostRouter = (globalThis as any).HostRouterService;

  private elId: string | undefined = undefined;
  private navigationStartSubscription: Subscription | undefined = undefined;

  setup(data: { elId: string }): void {
    this.elId = data.elId;

    this.registerRouterCallback();
    this.listenForNavigationEvent();

    this.elementRouter.navigateByUrl(this.hostRouter.getUrl());
  }

  cleanup(): void {
    this.navigationStartSubscription?.unsubscribe();
    this.unregisterRouterCallback();
  }

  private registerRouterCallback(): void {
    this.hostRouter.registerRouterCallback({ id: this.elId as string }, (url: string) => {
      this.elementZone.run(() => {
        if (this.elementRouter.url !== url) {
          this.elementRouter.navigateByUrl(url);
        }
      });
    });
  }

  private unregisterRouterCallback(): void {
    this.hostRouter.unregisterRouterCallback({ id: this.elId as string });
  }

  private listenForNavigationEvent(): void {
    this.navigationStartSubscription?.unsubscribe();

    this.navigationStartSubscription = this.elementRouter
      .events
      .pipe(
        filter(event => event instanceof NavigationStart),
        distinctUntilChanged((prev, curr) => prev['url'] === curr['url']),
      )
      .subscribe(event => this.hostRouter.routerEvent({ id: this.elId as string }, event));
  }
}
