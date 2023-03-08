const knexConfig = require('../../knexfile');
const knex = require('knex')(knexConfig[process.env.APP_STATUS]);
module.exports = { knex };
