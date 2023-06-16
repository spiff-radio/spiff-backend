("use strict");

module.exports = (plugin) => {
  //if you see this, the configuration do loads:
  console.log("Custom strapi-server.js for user-permissions");

  //get api routes for 'user-permissions'
  const apiRoutes = plugin.routes['content-api'].routes;

  //add middleware for GET /users/me
  apiRoutes
    .filter(route => route.handler === 'user.me')
    .map(route => {
      route.config.middlewares = [
        ...(route.config.middlewares || []),
        'plugin::spiff-api.user-me'//middleware name
      ];
      return route;
    });

    //add middleware for GET /users/:id
    apiRoutes
      .filter(route => route.handler === 'user.findOne')
      .map(route => {
        route.config.middlewares = [
          ...(route.config.middlewares || []),
          'plugin::spiff-api.user-find-one'//middleware name
        ];
        return route;
      });

    //add middleware for GET /users
    apiRoutes
      .filter(route => route.handler === 'user.find')
      .map(route => {
        route.config.middlewares = [
          ...(route.config.middlewares || []),
          'plugin::spiff-api.user-find'//middleware name
        ];
        return route;
      });

      //add middleware for PUT /users/:id
      apiRoutes
        .filter(route => route.handler === 'user.update')
        .map(route => {
          route.config.middlewares = [
            ...(route.config.middlewares || []),
            'plugin::spiff-api.user-update'
          ];
          return route;
        });

    return plugin;

};
