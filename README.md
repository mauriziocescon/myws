# Myws

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Information

In this repo there are 5 angular apps:

- host: loader of mfs,
- mf1: module based with zone.js,
- mf2: module based without zone.js,
- mf3: standalone with zone.js,
- mf4: standalone without zone.js.

To launch the host application, just `npm run start:host`. This command will

- build mf1 / mf2 / mf3 / mf4,
- create `index.js` files,
- move the bundles tp the host public folder,
- start the host app.

All `index.js` files will be available at [myws/projects/host/public/elements](https://github.com/mauriziocescon/myws/tree/develop/projects/host/public/elements).
