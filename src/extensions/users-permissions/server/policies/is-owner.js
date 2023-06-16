'use strict';

const utils = require('@strapi/utils');
const { PolicyError } = utils.errors;

module.exports = (policyContext, config, { strapi }) => {

  const {id : authId} = policyContext.state.user;
  const {id : userId} = policyContext.request.params;

  strapi.log.info('is-owner policy.');

  const isOwner = (authId == userId);

  if (!isOwner){
    throw new PolicyError('You must be the owner of the entity to do this.', { policy: 'is-owner' })
  }else{
    return true;
  }

};
