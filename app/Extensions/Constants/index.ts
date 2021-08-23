import { Route } from '@ioc:App/Extensions/Router'

export const MAX_GUAVA_AMOUNT = 200000

export const PUBLIC_ROUTES: Route[] = [
  {
    path: /^[^/]*\/$/,
    methods: [ 'GET' ],
  },
  {
    path: /^(^\/users\/authentication)*\/$/,
    methods: [ 'POST' ],
  },
  {
    path: /^(^\/users)\/?/,
    methods: [ 'POST' ],
  },
]
