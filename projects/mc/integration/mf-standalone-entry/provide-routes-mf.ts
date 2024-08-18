import { provideRouter, Route } from '@angular/router';

const defineRoutes = (component: any) => {
  return [
    {
      path: '**',
      component: component,
    },
  ] as Route[];
};

export const provideRoutesMf = (component: any) => provideRouter(defineRoutes(component));
