'use strict';

/**
 * playlist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::playlist.playlist', ({ strapi }) => ({

  //https://strapi.gitee.io/documentation/v3.x/guides/is-owner.html
  async create(ctx) {
    const postData = ctx.request.body.data;
    const user = ctx.state.user;

    if (!user){
      return ctx.unauthorized();
    }

    //automatically set logged user as author of the entity
    postData.author = user.id;

    //set publishedAt (= non-draft post)
    postData.publishedAt = new Date().getTime();

    //update context
    //strapi.entityService.create("api::playlist.playlist",{data:postData})
    ctx.request.body.data = postData;

    return await super.create(ctx);
  },
}));
