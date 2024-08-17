import { inject, Injectable, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Event, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostRouterService {
  private hostRouter = inject(Router);
  private hostZone = inject(NgZone);

  /**
   * Url at host level used by mf to sync.
   */
  private hostUrlSubject$ = new BehaviorSubject(this.hostRouter.url);
  hostUrl$ = this.hostUrlSubject$.asObservable();

  /**
   * Anytime there is a router event (either coming from the host
   * or any element on screen), we notify all mfs
   * about the url change.
   */
  private hostRouterSubscription = this.hostRouter
    .events
    .pipe(
      takeUntilDestroyed(),
      filter((event: Event | RouterEvent): event is RouterEvent => event instanceof NavigationEnd),
    )
    .subscribe((event: RouterEvent) => this.hostUrlSubject$.next(event['url']));

  /**
   * Called by mf any time a NavigationStart event
   * is triggered at mf level.
   * @param data
   * @param event
   */
  mfRouterEvent(data: { id: string }, event: NavigationStart): void {
    // method called by mf: different zone
    if (this.hostRouter.url !== event['url']) {
      this.hostZone.run(() => this.hostRouter.navigateByUrl(event['url']));
    }
  }
}
