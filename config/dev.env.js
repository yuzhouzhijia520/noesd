'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  OEM_BASE_API: '"http://dev.19mini.com"',
  BASE_API: '"https://dev.19mini.com"',
  BASE_NEWAPI: '"https://dev.api.19mini.com"'
})
