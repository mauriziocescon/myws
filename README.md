# Myws

This repo showcases a possible way of achieving (more or less) standard angular
routing capabilities in a micro frontend architecture. The setup is the following:

- a `host` (shell) with a main "content area",
- 3 "sections" (`mf1`, `mf2`, `mf3`) for the "main content area" available at the urls:
  - `mf1` => /mf1,
  - `mf2` => /mf2,
  - `mf3` => /mf3,
- 1 "standalone" (`mf4`) not attached to any url.

All 5 ng-applications are built independently and have (more or less) standard ng-routing
capabilities. The four `mf_x` applications are built as angular elements and each one has
its own router which is kept in sync with the host one (url level).

The bundle of each `mf_x` is dynamically loaded based on the navigation (or other
conditions for `mf4`). In particular: the bundle is loaded, a WC is defined and
an instance of such component is created and appended to the DOM.

When any routing navigation in any `mf` starts (new url), the host receives
notifications and performs `navigateByUrl`. Once such operation ends, it notifies
every `mf` on screen about the url change and each `mf` triggers
an "internal" `navigateByUrl` with the new host url.

Each `mf_x` bundles the necessary v19 angular code. Considering each `mf_x` in the end
is a WC, they could potentially be built with different ng versions.

**PS**: there might be some ng-routing features not covered!

**PPS**: since WCs are created programmatically, there's no need to add `CUSTOM_ELEMENTS_SCHEMA`.

## Setup Host / Mf

### Host

Routes at host level are defined like this:

```ts
export const routes: Routes = [
  {
    // matching any url starting with mf1/... 
    matcher: startsWith('mf1'),

    // loader of the mf bundle: loads the bundle 
    // and appends <mf1-v19></mf1-v19>. 
    component: MfWrapper,
    data: {
      // mf is used by MfWrapper to load the
      // bundle and create a WC <mf1-v1></mf1-v19>
      mf: { elementId: 'mf1', tag: 'mf1-v19' },

      // inputs is an object of `ng-inputs` passed to
      // the business component behind mf1.
      inputs: { mf: { elementId: 'mf1', tag: 'mf1-v19' } },
    },
  },
  {
    matcher: startsWith('mf2'),
    component: MfWrapper,
    data: {
      mf: { elementId: 'mf2', tag: 'mf2-v19' },
      inputs: { mf: { elementId: 'mf2', tag: 'mf2-v19' } },
    },
  },
  {
    matcher: startsWith('mf3'),
    component: MfWrapper,
    data: {
      mf: { elementId: 'mf3', tag: 'mf3-v19' },
      inputs: { mf: { elementId: 'mf3', tag: 'mf3-v19' } },
    },
  },
  { path: '**', redirectTo: '/mf1' },
];
```

Host has a `HostRouter` managing the url / route events

```ts

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
  private hostUrl$ = this.hostUrlSubject$.asObservable();

  /**
   * Anytime the host router has successfully
   * processed a NavigationEnd event
   * (either originated from itself or any mf on screen),
   * we notify all loaded mfs about the url change.
   *
   * Host event: NavigationEnd
   */
  private readonly hostRouterSubscription = this.hostRouter
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
```

which is globally exposed like this

```ts
export function provideHostRouter(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const hostRouter = inject(HostRouter);

        return () => new Promise<void>(resolve => {
          // attaching HostRouter to the global scope
          // so it can be used by Mf
          const global = (globalThis as any);
          global.__myws__ = {};
          global.__myws__.HostRouter = hostRouter;
          resolve();
        });
      },
      multi: true,
    },
  ]);
}
```

### Mf section

A WC defined like this

```ts
import { mf1Routes } from 'section/mf1';

(async () => {
  const app = await createApplication({
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
      provideHttpClient(withFetch()),

      // this is simply calling provideRouter behind the scene
      // and set the mf "base path" to mf1: mf1 must match
      // what has been defined at host level!
      provideSectionMf({ path: 'mf1', children: mf1Routes }, withComponentInputBinding()),
    ],
  });
  const element = createCustomElement(SectionEntry, { injector: app.injector });

  // definition of mf1-v19
  customElements.define('mf1-v19', element);
})();
```

where

```ts
const defineRoutes = (path: string, children: Route[]) => {
  return [
    {
      // base path = mf1
      path: path,

      // business routes defined for mf1 section
      children: children,
    },

    // wildcard to avoid exceptions while routing from /mf1 to /mf_x
    { path: '**', component: PageNotFoundComponent },
  ] as Route[];
};

export const provideSectionMf = (config: { path: string, children: Route[] }, ...features: RouterFeatures[]) => {
  return provideRouter(defineRoutes(config.path, config.children), withComponentInputBinding(), ...features);
};
```

and

```ts

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  providers: [MfRouter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet/>`,
})
export class SectionEntry {
  private readonly mfRouter = inject(MfRouter);

  private readonly domAvailable = afterNextRender(() => this.mfRouter.setup());
}
```

Each Mf has a dedicated `MfRouter` which is communicating with the Host like this:

```ts
interface IHostRouter {
  hostUrl$: Observable<string>;

  mfRouterEvent(url: string): void;
}

@Injectable()
export class MfRouter implements OnDestroy {
  private readonly mfRouter = inject(Router);
  private readonly mfZone = inject(NgZone);

  // getting HostRouter from the global scope
  private readonly hostRouter: IHostRouter = (globalThis as any).__myws__.HostRouter;

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
```

## Commands

To launch the host application, just run `npm run start:host`. This command will

- build `mf1` / `mf2` / `mf3` / `mf4`,
- repackage the mf apps to be loaded as js modules,
- move the bundles to the `host/public/elements` folder,
- start the `host` app.

For development, you can run `npm run start host` and lazy load all the parts.
The command `npm run serve:ssr:host` runs the host using ssr.

## Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.
