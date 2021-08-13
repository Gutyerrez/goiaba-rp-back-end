import Route from '@ioc:Adonis/Core/Route'

// Version route
Route.get('/', 'VersionController.index')

// Users route
Route.group(() => {
  // List all users
  Route.get('/', 'UsersController.index')

  // Show user
  Route.get('/:userIdEmailOrUsername', 'UsersController.show')

  // Create user
  Route.post('/', 'UsersController.store')

  // User authentication route
  Route.post('/authentication', 'AuthenticationController.store')
}).prefix('/users')
