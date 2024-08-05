import { inject, Injectable, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Event, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';

import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostRouterService {
  private hostRouter = inject(Router);
  private hostZone = inject(NgZone);

  private routerCallbacks: Record<string, (url: string) => void> = {};

  /**
   * Anytime there is a router event (either coming from the host
   * or any element on screen), we notify all the registered remotes
   * about the url change.
   */
  private hostRouterSubscription = this.hostRouter
    .events
    .pipe(takeUntilDestroyed(), filter((event: Event | RouterEvent): event is RouterEvent => event instanceof NavigationEnd))
    .subscribe((event: RouterEvent) => this.manageRouterEvent(event));

  getUrl(): string {
    return this.hostRouter.url;
  }

  /**
   * Register a callback for a remote to be called any time there
   * is a route event.
   * @param data
   * @param callback
   */
  registerRouterCallback(data: { id: string }, callback: (url: string) => void): void {
    this.routerCallbacks[data.id] = callback;
  }

  unregisterRouterCallback(data: { id: string }): void {
    delete this.routerCallbacks[data.id];
  }

  /**
   * Called by remotes any time a NavigationStart event
   * is triggered at remote level.
   * @param data
   * @param event
   */
  routerEvent(data: { id: string }, event: NavigationStart): void {
    // method called by remotes: different zone
    this.hostZone.run(() => {
      const url = event['url'];
      if (this.hostRouter.url !== url) {
        this.hostRouter.navigateByUrl(url);
      }
    });
  }

  private manageRouterEvent(event: RouterEvent): void {
    Object
      .keys(this.routerCallbacks)
      .forEach(id => {
        const callback = this.routerCallbacks[id];
        if (callback) {
          callback(event['url']);
        }
      });
  }
}
