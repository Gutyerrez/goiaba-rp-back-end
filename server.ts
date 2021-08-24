import 'reflect-metadata'

import mercadopago from 'mercadopago'

import { Ignitor } from '@adonisjs/core/build/standalone'

// Configure payment gateways

mercadopago.configure({
  client_id: '7934218825408920',
  client_secret: 'GsL793YiuuoFGvGHUOfWo35q68acv2Ve',
})

// Create instance of ignitor

new Ignitor(
  __dirname
).httpServer().start()
