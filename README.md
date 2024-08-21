# Myws

This repo contains an ng-workspace having 5 angular apps:

- **host**: shell and loader of mfs,
- **mf1**: zone.js based section having a couple of routes,
- **mf2**: zoneless section having a couple of child routes,
- **mf3**: zone.js based section having a couple of routes one of those loading another mf,
- **mf4**: a zoneless standalone reusable component.

Each mf has (more or less) regular routing capabilities.

To launch the host application, just `npm run start:host`. This command will

- build mf1 / mf2 / mf3 / mf4,
- create `index.js` files,
- move the bundles to the host/public/elements folder,
- start the host app.

For development, you can run `npm run start host` and lazy load all the parts.

## Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.
