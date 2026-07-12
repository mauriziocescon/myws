import { TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationStart, provideRouter, Router } from '@angular/router';

import { firstValueFrom, skip } from 'rxjs';

import { HostRouter } from './host-router';

describe('HostRouter', () => {
  let hostRouter: HostRouter;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    router = TestBed.inject(Router);
    hostRouter = TestBed.inject(HostRouter);
  });

  it('should be created', () => {
    expect(hostRouter).toBeTruthy();
  });

  it('should emit the initial router URL on hostUrl$', async () => {
    const url = await firstValueFrom(hostRouter.hostUrl$);
    expect(url).toBe(router.url);
  });

  it('should emit new URL after NavigationEnd', async () => {
    const nextUrl = firstValueFrom(hostRouter.hostUrl$.pipe(skip(1)));

    // Simulate a NavigationEnd event on the router
    (router.events as any).next(new NavigationEnd(1, '/mf2', '/mf2'));

    const url = await nextUrl;
    expect(url).toBe('/mf2');
  });

  it('should not emit on NavigationStart events', async () => {
    let emitted = false;
    const sub = hostRouter.hostUrl$.pipe(skip(1)).subscribe(() => (emitted = true));

    (router.events as any).next(new NavigationStart(1, '/mf2'));

    // Give micro-task queue a chance to flush
    await Promise.resolve();
    expect(emitted).toBe(false);

    sub.unsubscribe();
  });

  it('should call navigateByUrl when mfRouterEvent is called with a different URL', () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockReturnValue(Promise.resolve(true));

    hostRouter.mfRouterEvent('/mf3/details');

    expect(spy).toHaveBeenCalledWith('/mf3/details');
  });

  it('should not call navigateByUrl when mfRouterEvent is called with the same URL', () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockReturnValue(Promise.resolve(true));

    // router.url is '/' by default
    hostRouter.mfRouterEvent(router.url);

    expect(spy).not.toHaveBeenCalled();
  });
});
