'use strict';

const utils = require('@strapi/utils');
const { PolicyError } = utils.errors;

module.exports = async (policyContext, config, { strapi }) => {

  const {id : userId} = policyContext.state.user;
  const {id : entityId} = policyContext.request.params;

  strapi.log.info('is-author policy.');

  //TOUFIX TOUCHECK this is an extra DB query, no ?  Can't do without ?
  const [entity] = await strapi.entityService
  .findMany('api::playlist.playlist', {
    filters: {
      id: entityId,
      author: userId
    }
  })

  if (!entity){
    throw new PolicyError('You must be the author of the entity to do this.', { policy: 'is-author' })
  }else{
    return true;
  }

};
