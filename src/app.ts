import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'poiadd'],
        name: 'Poiadd',
        moduleId: PLATFORM.moduleName('views/poiadd'),
        nav: true,
        title: 'Add a Place'
      },
      {
        route: 'comments',
        name: 'comments',
        moduleId: PLATFORM.moduleName('views/comments'),
        nav: true,
        title: 'Comment'
      },

      {
        route: 'map',
        name: 'map',
        moduleId: PLATFORM.moduleName('views/map'),
        nav: true,
        title: 'Map'
      },

      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }
    ]);
    this.router = router;
  }
}
