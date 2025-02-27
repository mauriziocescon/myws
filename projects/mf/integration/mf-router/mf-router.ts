import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IHostRouter {
  hostUrl$: Observable<string>;

  mfRouterEvent(url: string): void;
}

@Injectable()
export class MfRouter implements OnDestroy {
  private readonly mfRouter = inject(Router);
  private readonly mfZone = inject(NgZone);

  // getting HostRouter from the global scope
  private readonly hostRouter: IHostRouter = (globalThis as any).__myws__.HostRouterService;

  private hostNavigationStartSubscription: Subscription | undefined = undefined;
  private mfNavigationStartSubscription: Subscription | undefined = undefined;

  /**
   * Start sync
   */
  setup() {
    // router init
    this.mfRouter.initialNavigation();

    this.listenForHostNavigationEvent();
    this.listenForMfNavigationEvent();
  }

  /**
   * Stop sync
   */
  cleanup() {
    this.hostNavigationStartSubscription?.unsubscribe();
    this.mfNavigationStartSubscription?.unsubscribe();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  /**
   * Listen for host url changes and call navigateByUrl
   * with the host url.
   *
   * @private
   */
  private listenForHostNavigationEvent() {
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
   *
   * @private
   */
  private listenForMfNavigationEvent() {
    this.mfNavigationStartSubscription?.unsubscribe();

    this.mfNavigationStartSubscription = this.mfRouter
      .events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => this.hostRouter.mfRouterEvent(event['url']));
  }
}
