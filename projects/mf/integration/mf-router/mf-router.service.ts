import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IHostRouter {
  hostUrl$: Observable<string>;

  mfRouterEvent(url: string): void;
}

@Injectable()
export class MfRouterService implements OnDestroy {
  private mfRouter = inject(Router);
  private mfZone = inject(NgZone);

  // getting HostRouterService from the global scope
  private hostRouter: IHostRouter = (globalThis as any).__myws__.HostRouterService;

  private hostNavigationStartSubscription: Subscription | undefined = undefined;
  private mfNavigationStartSubscription: Subscription | undefined = undefined;

  /**
   * Init mf router sync
   */
  setup(): void {
    // router init
    this.mfRouter.initialNavigation();

    this.listenForHostNavigationEvent();
    this.listenForMfNavigationEvent();
  }

  /**
   * Paused the sync.
   */
  cleanup(): void {
    this.hostNavigationStartSubscription?.unsubscribe();
    this.mfNavigationStartSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  /**
   * Listen for host url changes and call navigateByUrl
   * with the host url.
   * @private
   */
  private listenForHostNavigationEvent(): void {
    this.hostNavigationStartSubscription?.unsubscribe();

    // changes triggered at host level: since host is zone based,
    // we need zone.run
    // Note: no need of zone.run in case everything is zoneless
    this.hostNavigationStartSubscription = this.hostRouter
      .hostUrl$
      .pipe(filter(url => this.mfRouter.url !== url))
      .subscribe(url => this.mfZone.run(() => this.mfRouter.navigateByUrl(url)));
  }

  /**
   * Listen for mf-router NavigationStart events and
   * ask the host router to navigateByUrl using the
   * new url.
   * @private
   */
  private listenForMfNavigationEvent(): void {
    this.mfNavigationStartSubscription?.unsubscribe();

    this.mfNavigationStartSubscription = this.mfRouter
      .events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => this.hostRouter.mfRouterEvent(event['url']));
  }
}
