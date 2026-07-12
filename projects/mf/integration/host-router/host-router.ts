import { inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, PRIMARY_OUTLET, Router, UrlSegmentGroup } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Service()
export class HostRouter {
  private readonly hostRouter = inject(Router);

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
    if (this.hostRouter.url !== this.stripOutlets(this.hostRouter, url)) {
      this.hostRouter.navigateByUrl(url);
    }
  }

  /**
   * Strips all named outlet segments from a URL, preserving only the primary route.
   * Used in opsys-map to extract the base navigation path, ignoring any
   * auxiliary outlet navigations (e.g. side panels, dialogs).
   */
  private stripOutlets(router: Router, url: string): string {
    const removeOutlets = (group: UrlSegmentGroup) => {
      for (const key of Object.keys(group.children)) {
        if (key !== PRIMARY_OUTLET) {
          delete group.children[key];
        } else {
          removeOutlets(group.children[key]);
        }
      }
    };

    const tree = router.parseUrl(url);
    removeOutlets(tree.root);
    return router.serializeUrl(tree);
  }
}
