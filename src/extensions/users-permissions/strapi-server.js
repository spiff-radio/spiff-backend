("use strict");

const customPolicies = require('./server/policies');

module.exports = (plugin) => {
  //if you see this, the configuration do loads:
  console.log("Custom strapi-server.js for user-permissions");

  //policies
  plugin.policies = {
    ...plugin.policies ?? {},
    ...customPolicies
  }

  //get api routes for 'user-permissions'
  const apiRoutes = plugin.routes['content-api'].routes;

  //update route GET /users/me
  apiRoutes
    .filter(route => route.handler === 'user.me')
    .map(route => {
      route.config.middlewares = [...(route.config.middlewares || []), 'plugin::spiff.user-me'];
      return route;
    });

  //update route GET /users/:id
  apiRoutes
    .filter(route => route.handler === 'user.findOne')
    .map(route => {
      route.config.middlewares = [...(route.config.middlewares || []), 'plugin::spiff.user-find-one'];
      return route;
    });

  //update route GET /users
  apiRoutes
    .filter(route => route.handler === 'user.find')
    .map(route => {
      route.config.middlewares = [...(route.config.middlewares || []), 'plugin::spiff.user-find'];
      return route;
    });

  //update route PUT /users/:id
  apiRoutes
    .filter(route => route.handler === 'user.update')
    .map(route => {
      route.config.policies = [...(route.config.policies || []), 'plugin::users-permissions.is-owner'];
      route.config.middlewares = [...(route.config.middlewares || []), 'plugin::spiff.user-update'];
      return route;
    });

  //update route DELETE /users/:id
  apiRoutes
    .filter(route => route.handler === 'user.destroy')
    .map(route => {
      route.config.policies = [...(route.config.policies || []), 'plugin::users-permissions.is-owner'];
      return route;
    });

  return plugin;

};
