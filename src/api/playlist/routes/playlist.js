'use strict';

/**
 * playlist router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::playlist.playlist', {
 config: {
   update: {
     policies : ['global::is-author']
   },
   delete: {
     policies : ['global::is-author']
   },
   find: {
     middlewares: ['plugin::spiff.playlist-find']
   },
   findOne: {
     middlewares: ['plugin::spiff.playlist-find-one']
   },
 },
})
