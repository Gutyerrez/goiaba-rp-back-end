import Route from '@ioc:Adonis/Core/Route'

// Version route
Route.get('/', 'VersionController.index')

// Users route
Route.group(() => {
  // Authentication
  Route.post('/authentication', 'AuthenticationController.store')

  // List all users
  Route.get('/', 'UsersController.index')

  // Show user
  Route.get('/:userIdEmailOrUsername', 'UsersController.show')

  // Create user
  Route.post('/', 'UsersController.store')

  // Purchases route
  Route.group(() => {
    // List purchases
    Route.get('/', 'UsersPurchasesController.index')

    // Show purchases
    Route.get('/:idOrUserId', 'UsersPurchasesController.show')

    // Create purchase
    Route.post('/', 'UsersPurchasesController.store')

    // Update purchase
    Route.put('/:id', 'UsersPurchasesController.update')
  }).prefix('/purchases')
}).prefix('/users')
