import { inject, Injectable, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostRouterService {
  private hostRouter = inject(Router);
  private hostZone = inject(NgZone);

  /**
   * Url at host level used by mf to sync the router.
   * Note: cannot expose a signal cause cross-app signals don't work.
   */
  private hostUrlSubject$ = new BehaviorSubject(this.hostRouter.url);
  hostUrl$ = this.hostUrlSubject$.asObservable();

  /**
   * Anytime there is a router event (either coming from
   * the host or any mf on screen), we notify all mfs
   * about the url change.
   */
  private hostRouterSubscription = this.hostRouter
    .events
    .pipe(
      takeUntilDestroyed(),
      filter(event => event instanceof NavigationEnd),
    )
    .subscribe(event => this.hostUrlSubject$.next(event['url']));

  /**
   * Called by mfs any time a NavigationStart event
   * is triggered at mf level.
   * @param url
   */
  mfRouterEvent(url: string): void {
    if (this.hostRouter.url !== url) {
      // method called by mf: needs zone.run for mf zone.js based
      // Note: no need of zone.run in case everything is zoneless
      this.hostZone.run(() => this.hostRouter.navigateByUrl(url));
    }
  }
}
