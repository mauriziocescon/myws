# Myws

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Information

In this repo there are 4 angular apps:

- host: loader of the mfs,
- mf1 (✅): `"builder": "@angular-devkit/build-angular:browser"` with `"buildOptimizer": true`,
- mf2 (✅): `"builder": "@angular-devkit/build-angular:application"` with `"optimization": false`,
- mf3 (🚫): `"builder": "@angular-devkit/build-angular:application"`  with `"optimization": true`.

In order to see the problem, just run `start:host`. This command will

- build mf1 / mf2 / mf3 like reported above,
- concatenate the output in a single js file,
- move the concatenated file in the host public folder,
- start the host app.

Micro frontends will be available at [myws/projects/host/public/elements](https://github.com/mauriziocescon/myws/tree/develop/projects/host/public/elements).
