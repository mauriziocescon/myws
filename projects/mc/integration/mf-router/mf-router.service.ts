import { inject, Injectable, NgZone } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IHostRouter {
  hostUrl$: Observable<string>;

  mfRouterEvent(data: { id: string }, event: NavigationStart): void;
}

@Injectable({
  providedIn: 'root',
})
export class MfRouterService {
  private mfRouter = inject(Router);
  private mfZone = inject(NgZone);

  // setting HostRouterService from the global scope
  private hostRouter: IHostRouter = (globalThis as any).HostRouterService;

  private elId: string | undefined = undefined;
  private hostNavigationStartSubscription: Subscription | undefined = undefined;
  private mfNavigationStartSubscription: Subscription | undefined = undefined;

  setup(data: { elId: string }): void {
    this.elId = data.elId;

    this.mfRouter.initialNavigation();
    this.listenForHostNavigationEvent();
    this.listenForMfNavigationEvent();
  }

  cleanup(): void {
    this.hostNavigationStartSubscription?.unsubscribe();
    this.mfNavigationStartSubscription?.unsubscribe();
  }

  private listenForHostNavigationEvent(): void {
    this.hostNavigationStartSubscription?.unsubscribe();

    this.hostNavigationStartSubscription = this.hostRouter
      .hostUrl$
      .pipe(filter(url => this.mfRouter.url !== url))
      .subscribe(url => this.mfZone.run(() => this.mfRouter.navigateByUrl(url)));
  }

  private listenForMfNavigationEvent(): void {
    this.mfNavigationStartSubscription?.unsubscribe();

    this.mfNavigationStartSubscription = this.mfRouter
      .events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => this.hostRouter.mfRouterEvent({ id: this.elId as string }, event));
  }
}
