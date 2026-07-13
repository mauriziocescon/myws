# Myws

Angular micro-frontend architecture demo — standard routing capabilities across independently-built apps, with a shared host shell.

> Angular 22 · Zoneless · Web Components via `@angular/elements`

## Overview

A **host** shell coordinates 4 micro-frontends:

| MF | Type | URL | Custom Element |
|----|------|-----|----------------|
| mf1 | section | `/mf1` | `<mf1-v22>` |
| mf2 | section | `/mf2` | `<mf2-v22>` |
| mf3 | section | `/mf3` | `<mf3-v22>` |
| mf4 | standalone | _(none)_ | `<mf4-v22>` |

Each MF is built as a standalone Angular application, packaged as a custom element. Sections participate in URL routing; the standalone MF is loaded on demand without a route.

## How routing works

1. **Host** detects navigation → runs `navigateByUrl` → broadcasts the new URL to all loaded MFs.
2. **MF** detects internal `NavigationStart` → tells the host to `navigateByUrl` → host broadcasts back.
3. Sync happens through a `HostRouter` instance exposed on `globalThis.__myws__`, consumed by each MF's `MfRouter`.

This keeps every router in sync at the URL level, giving each MF full access to Angular's route features (guards, resolvers, lazy children, etc.).

## Project structure

```
projects/
├── host/                        # Shell app
├── section/                     # Library: mf1, mf2, mf3 business code & routes
├── standalone/                  # Library: mf4 business code
└── mf/
    ├── integration/             # Shared library (@mf/integration)
    │   ├── host-router/         #   HostRouter, provideHostRouter, startsWith matcher
    │   ├── mf-router/           #   MfRouter (injected in every MF)
    │   ├── mf-loader/           #   MfWrapper, MfLoader, MfBundleLoader
    │   ├── mf-section-entry/    #   SectionEntry, provideSectionMf
    │   └── mf-standalone-entry/ #   StandaloneEntry, provideStandaloneMf
    ├── mf1-entry/               # Entry app → builds <mf1-v22>
    ├── mf2-entry/               # Entry app → builds <mf2-v22>
    ├── mf3-entry/               # Entry app → builds <mf3-v22>
    └── mf4-entry/               # Entry app → builds <mf4-v22>
mock-server/                     # json-server (fake API on port 3000)
scripts/
    bundle-mf.ts                 # Post-build: creates index.js and copies to host/public/elements/
```

## Key pieces

### Host routing (production / debug)

`app-routes-mf.ts` — used in the `production` and `debug` build configurations:

```ts
{
  matcher: startsWith('mf1'),
  component: MfWrapper,
  data: {
    mf: { elementId: 'mf1', tag: 'mf1-v22' },
    inputs: { mf: { elementId: 'mf1', tag: 'mf1-v22' } },
  },
}
```

`MfWrapper` dynamically loads the JS bundle, defines the custom element, creates it, and appends it to the DOM.

### Host routing (dev mode)

`app-routes.ts` — used in the default `development` configuration:

```ts
{ path: 'mf1', loadChildren: () => import('section/mf1').then(m => m.mf1Routes) }
```

In dev mode the host lazy-loads the section libraries directly (no WC, no bundles). Much faster iteration.

### HostRouter ↔ MfRouter sync

`HostRouter` (host side):
- Listens for `NavigationEnd` → pushes URL to all MFs via `hostUrl$` (BehaviorSubject).
- Exposes `mfRouterEvent(url)` for MFs to request navigation.
- Attached to `globalThis.__myws__.HostRouterService` at app init.

`MfRouter` (MF side):
- Reads `HostRouter` from `globalThis`.
- On `hostUrl$` change → calls its own `router.navigateByUrl(url)`.
- On internal `NavigationStart` → calls `hostRouter.mfRouterEvent(url)`.

### Section entry (mf1–mf3)

Each entry app bootstraps with `provideSectionMf({ path, children })` (wraps `provideRouter`), creates a `SectionEntry` component (a `<router-outlet>`), and registers it as a custom element.

### Standalone entry (mf4)

Bootstraps with `provideStandaloneMf({ component })`, creates a `StandaloneEntry` component (uses `NgComponentOutlet`), and registers it as a custom element. No URL binding.

## Commands

| Command | What it does |
|---------|--------------|
| `npm run serve` | Dev mode — serves the host with lazy-loaded sections + mock server. No WC bundles needed. |
| `npm run serve:host` | Builds all 4 MF bundles → copies to `host/public/elements/` → serves host in `debug` config + mock server. |
| `npm run build:all` | Builds all MF bundles + host (production). |
| `npm run test` | Runs `@mf/integration` unit tests (vitest). |
| `npm start` | Production server (serves built host + API from the same Express process). |

## Notes

- **Zoneless**: no `zone.js` anywhere. All apps use Angular's native change detection.
- **Independent builds**: each MF bundles its own Angular runtime, so they could theoretically run different Angular versions.
- **No `CUSTOM_ELEMENTS_SCHEMA`**: WCs are created programmatically in `MfLoader`, not used in templates.
- **Cross-app signals don't work**: that's why `HostRouter` uses an RxJS `BehaviorSubject` instead of a signal.
- Some Angular routing features may not be covered.
