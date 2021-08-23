import { Ignitor } from '@adonisjs/core/build/standalone'

import 'reflect-metadata'

// Configure payment gateways

// mercadopago.configure({
//   client_id: process.env.MERCADO_PAGO_CLIENT_ID!!,
//   client_secret: process.env.MERCADO_PAGO_CLIENT_SECRET!!,
// })

// Create instance of ignitor

new Ignitor(
  __dirname
).httpServer().start()
