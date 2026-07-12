import { TestBed } from '@angular/core/testing';
import { NavigationStart, provideRouter, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { MfRouter } from './mf-router';

describe('MfRouter', () => {
  let mfRouter: MfRouter;
  let router: Router;
  let hostUrlSubject$: BehaviorSubject<string>;
  let mockHostRouter: { hostUrl$: typeof hostUrlSubject$; mfRouterEvent: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    hostUrlSubject$ = new BehaviorSubject<string>('/');
    mockHostRouter = {
      hostUrl$: hostUrlSubject$.asObservable() as any,
      mfRouterEvent: vi.fn(),
    };

    // Set up the global mock before TestBed creates MfRouter
    (globalThis as any).__myws__ = { HostRouterService: mockHostRouter };

    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', children: [] }]), MfRouter],
    });

    router = TestBed.inject(Router);
    mfRouter = TestBed.inject(MfRouter);
  });

  afterEach(() => {
    mfRouter.ngOnDestroy();
    delete (globalThis as any).__myws__;
  });

  it('should be created', () => {
    expect(mfRouter).toBeTruthy();
  });

  it('should call initialNavigation on setup', () => {
    const spy = vi.spyOn(router, 'initialNavigation');
    mfRouter.setup();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate when host emits a different URL', () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockReturnValue(Promise.resolve(true));
    mfRouter.setup();

    hostUrlSubject$.next('/mf1/details');

    expect(spy).toHaveBeenCalledWith('/mf1/details');
  });

  it('should not navigate when host emits the same URL as the mf router', () => {
    const spy = vi.spyOn(router, 'navigateByUrl').mockReturnValue(Promise.resolve(true));
    mfRouter.setup();

    // Emit the same URL the router already has
    hostUrlSubject$.next(router.url);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should notify host router on mf NavigationStart events', () => {
    mfRouter.setup();

    (router.events as any).next(new NavigationStart(1, '/mf1/new-page'));

    expect(mockHostRouter.mfRouterEvent).toHaveBeenCalledWith('/mf1/new-page');
  });

  it('should unsubscribe on cleanup', () => {
    mfRouter.setup();
    mfRouter.cleanup();

    // After cleanup, new host URL emissions should not trigger navigation
    const spy = vi.spyOn(router, 'navigateByUrl').mockReturnValue(Promise.resolve(true));
    hostUrlSubject$.next('/mf2');

    expect(spy).not.toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    mfRouter.setup();
    mfRouter.ngOnDestroy();

    const spy = vi.spyOn(router, 'navigateByUrl').mockReturnValue(Promise.resolve(true));
    hostUrlSubject$.next('/mf3');

    expect(spy).not.toHaveBeenCalled();
  });
});
