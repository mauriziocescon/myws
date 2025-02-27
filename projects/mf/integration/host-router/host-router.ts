import { inject, Injectable, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HostRouter {
  private readonly hostRouter = inject(Router);
  private readonly hostZone = inject(NgZone);

  /**
   * Url at host level used by mf to sync its router.
   * Note: cannot expose a signal cause cross-app signals don't work.
   */
  private readonly hostUrlSubject$ = new BehaviorSubject(this.hostRouter.url);
  readonly hostUrl$ = this.hostUrlSubject$.asObservable();

  /**
   * Anytime the host router has successfully
   * processed a NavigationEnd event
   * (either originated from itself or any mf on screen),
   * we notify all loaded mfs about the url change.
   *
   * Host event: NavigationEnd
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
   *
   * Mf event: NavigationStart
   *
   * @param url
   */
  mfRouterEvent(url: string) {
    if (this.hostRouter.url !== url) {
      // method called by mf: needs zone.run for mf zone based
      // Note: no need of zone.run in case everything is zoneless
      this.hostZone.run(() => this.hostRouter.navigateByUrl(url));
    }
  }
}
