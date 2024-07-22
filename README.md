# Myws

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Information

In this repo there are 4 angular apps:

- host: loader of the mfs,
- mf1 (✅): `"builder": "@angular-devkit/build-angular:browser"` with `"buildOptimizer": true`,
- mf2 (✅): `"builder": "@angular-devkit/build-angular:application"` with `"optimization": false`,
- mf3 (🚫): `"builder": "@angular-devkit/build-angular:application"`  with `"optimization": true`.

In order to see the problem, just run: `ng build host`. At [myws/projects/host/public/elements](https://github.com/mauriziocescon/myws/tree/develop/projects/host/public/elements),
you'll see all the pre-built micro frontends. 
