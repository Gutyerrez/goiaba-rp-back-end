import UserPurchase from 'App/Models/UserPurchase'

export abstract class AbstractGateway {
  protected create: (purchase: UserPurchase) => string | undefined

  protected update: (purchase: UserPurchase) => boolean | undefined

  protected refound: (purchase: UserPurchase) => boolean | undefined
}
