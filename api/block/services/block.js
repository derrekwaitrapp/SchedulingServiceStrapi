'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async dropClaim(id){
    const response = await strapi.query("block").update({id}, {claimedByUser: null})
    return response
  }
};
