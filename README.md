# Myws

This repo showcases a possible way of achieving standard angular routing capabilities
in a micro frontend architecture with angular. The setup is the following:

- a host (shell) loading the various parts of the application,
- 3 "sections" (mf1, mf2, mf3) available at the urls:
  - mf1 => /mf1,
  - mf2 => /mf2,
  - mf3 => /mf3,
- 1 "standalone" (mf4) not attached to any url.

All 5 applications are built independently and have routing capabilities. In particular,
each app has its own router which is kept in sync with the host one. The host one receives
notifications from any mf and perform
is notified any time there is a change at mf level and of the ultimate

## Enable routing

In order to achieve ng routing capabilities, the code does 3 things:
- 







an ng-workspace having 5 angular apps:

- **host**: shell and loader of mfs,
- **mf1**: zone.js based section having a couple of routes,
- **mf2**: zoneless section having a couple of child routes,
- **mf3**: zone.js based section having a couple of routes one of those loading another mf,
- **mf4**: a zoneless standalone reusable component.

Each mf has (more or less) regular routing capabilities. To launch the host application, just `npm run start:host`. This command will

- build mf1 / mf2 / mf3 / mf4,
- create `index.js` files,
- move the bundles to the host/public/elements folder,
- start the host app.

For development, you can run `npm run start host` and lazy load all the parts.

## Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.
