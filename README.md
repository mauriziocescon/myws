# Myws

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Setup

In this repo there are 4 angular apps:

- host: loader of the mfs,
- mf1 (✅): `"builder": "@angular-devkit/build-angular:browser"` with `"buildOptimizer": true`,
- mf2 (✅): `"builder": "@angular-devkit/build-angular:application"` with `"optimization": false`,
- mf3 (🚫): `"builder": "@angular-devkit/build-angular:application"`  with `"optimization": true`.

Just run: `ng build host`.
