import { Ignitor } from '@adonisjs/core/build/standalone'

import 'reflect-metadata'
// import sourceMapSupport from 'source-map-support'

// sourceMapSupport.install({ handleUncaughtExceptions: false })

// Configure payment gateways

// mercadopago.configure({
//   client_id: process.env.MERCADO_PAGO_CLIENT_ID!!,
//   client_secret: process.env.MERCADO_PAGO_CLIENT_SECRET!!,
// })

// Create instance of ignitor

const HttpServer = new Ignitor(
  __dirname
).httpServer()

// Start Http Server

HttpServer.start()
