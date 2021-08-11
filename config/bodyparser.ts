import { BodyParserConfig } from '@ioc:Adonis/Core/BodyParser'

export default {
  whitelistedMethods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
  json: {
    encoding: 'utf-8',
    limit: '1mb',
    strict: true,
    types: [ 'application/json' ],
  },
  form: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
    convertEmptyStringsToNull: true,
    types: [ 'application/x-www-form-urlencoded' ],
  },
  raw: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
    types: [ 'text/*' ],
  },
  multipart: {
    autoProcess: true,
    processManually: [],
    encoding: 'utf-8',
    convertEmptyStringsToNull: true,
    maxFields: 1000,
    limit: '20mb',
    types: [ 'multipart/form-data' ],
  },
} as BodyParserConfig
