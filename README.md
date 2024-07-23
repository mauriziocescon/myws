# Myws

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Information

In this repo there are 4 angular apps (mf1 / mf2 / mf3 have basically the same code):

- host: loader of mfs,
- mf1 (✅): built with `"builder": "@angular-devkit/build-angular:browser"`, `"buildOptimizer": true`,
- mf2 (✅): built with `"builder": "@angular-devkit/build-angular:application"`, `"optimization": false`,
- mf3 (🚫): built with `"builder": "@angular-devkit/build-angular:application"`, `"optimization": true`.

In order to see the problem, just init and run `npm run start:host`. This command will

- build mf1 / mf2 / mf3 like reported above,
- concatenate the output of each mf in a single main.js file,
- move the concatenated files in the host public folder,
- start the host app.

All the `main.js` files will be available at [myws/projects/host/public/elements](https://github.com/mauriziocescon/myws/tree/develop/projects/host/public/elements).

Note: the repo has a gulp file for concatenating files, mostly for convenience. I've anyway manually tested the process as well. 
