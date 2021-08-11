import { HashConfig } from '@ioc:Adonis/Core/Hash'

export default {
  default: 'argon',
  list: {
    argon: {
      driver: 'argon2',
      variant: 'id',
      iterations: 3,
      memory: 4096,
      parallelism: 1,
      saltSize: 16,
    },
  },
} as HashConfig
