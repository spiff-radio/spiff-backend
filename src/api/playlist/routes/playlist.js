'use strict';

/**
 * playlist router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::playlist.playlist', {
 config: {
   find: {
     middlewares: ['plugin::spiff-api.playlist-find']
   },
   findOne: {
     middlewares: ['plugin::spiff-api.playlist-find-one']
   },
 },
})
