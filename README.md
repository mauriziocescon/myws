# Myws

This repo showcases a possible way of achieving standard angular routing capabilities
in a micro frontend architecture with angular. The setup is the following:

- a host (shell) loading the various parts of the application,
- 3 "sections" (mf1, mf2, mf3) available at the urls:
  - mf1 => /mf1,
  - mf2 => /mf2,
  - mf3 => /mf3,
- 1 "standalone" (mf4) not attached to any url.

All 5 applications are built independently and have (more or less) standard routing capabilities.
In particular, each `mf` app has its own router which is kept in sync with the host one (url level).
The host one receives notifications from any mf and performs the real routing operation.
Once such operation is done, it notifies every mf on screen about the change.

## Enable routing

In order to achieve ng routing capabilities, the code does 3 things.

### Host

Routes at host level are defined like this:

```ts
export const routes: Routes = [
  {
    // matching any url starting with mf1/... 
    matcher: startsWith('mf1'),

    // loader of the mf bundle: loads the bundle 
    // and appends <mf1-v18></mf1-v18>. 
    component: MfLoaderComponent,
    data: {
      // mf is used by MfLoaderComponent to load the
      // mf bundle and create a WC <mf1-v18></mf1-v18>
      mf: { elementId: 'mf1', tag: 'mf1-v18' },

      // inputs is an object of `ng-inputs` passed to
      // the business component behind mf1.
      inputs: { mf: { elementId: 'mf1', tag: 'mf1-v18' } },
    },
  },
  {
    matcher: startsWith('mf2'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf2', tag: 'mf2-v18' },
      inputs: { mf: { elementId: 'mf2', tag: 'mf2-v18' } },
    },
  },
  {
    matcher: startsWith('mf3'),
    component: MfLoaderComponent,
    data: {
      mf: { elementId: 'mf3', tag: 'mf3-v18' },
      inputs: { mf: { elementId: 'mf3', tag: 'mf3-v18' } },
    },
  },
  { path: '**', redirectTo: '/mf1' },
];
```

Host has a `HostRouterService` managing the url / route events

```ts
@Injectable({
  providedIn: 'root',
})
export class HostRouterService {
  private hostRouter = inject(Router);
  private hostZone = inject(NgZone);

  /**
   * Url at host level used by mf to sync its router.
   * Note: cannot expose a signal cause cross-app signals don't work.
   */
  private hostUrlSubject$ = new BehaviorSubject(this.hostRouter.url);
  hostUrl$ = this.hostUrlSubject$.asObservable();

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
  mfRouterEvent(url: string): void {
    if (this.hostRouter.url !== url) {
      // method called by mf: needs zone.run for mf zone based
      // Note: no need of zone.run in case everything is zoneless
      this.hostZone.run(() => this.hostRouter.navigateByUrl(url));
    }
  }
}
```

which is globally exposed like this

```ts
export function provideHostRouter(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const hostRouter = inject(HostRouterService);

        return () => new Promise<void>(resolve => {
          // attaching HostRouterService to the global scope
          // so it can be used by Mf
          const global = (globalThis as any);
          global.__myws__ = {};
          global.__myws__.HostRouterService = hostRouter;
          resolve();
        });
      },
      multi: true,
    },
  ]);
}
```

### Mf

A WC defined like this

```ts
import { mf1Routes } from 'section/mf1';

(async () => {
  const app = await createApplication({
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
      provideHttpClient(withFetch()),
      provideSectionMf({ path: 'mf1', children: mf1Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(SectionEntryComponent, { injector: app.injector });

  // definition of mf1-v18
  customElements.define('mf1-v18', element);
})();
```

## Commands

To launch the host application, just run `npm run start:host`. This command will

- build mf1 / mf2 / mf3 / mf4,
- repackage the mf apps to be loaded by the host,
- move the bundles to the host/public/elements folder,
- start the host app.

For development, you can run `npm run start host` and lazy load all the parts.

## Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.
