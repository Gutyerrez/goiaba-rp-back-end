import UserPurchase from 'App/Models/UserPurchase'

export abstract class AbstractGateway {
  protected STATUS_URL = 'https://goiabaroleplay.com/account/invoices/status'

  protected _name: string

  public abstract create: (
    purchase: UserPurchase
  ) => Promise<string | void>

  public abstract update: (
    purchase: UserPurchase
  ) => Promise<boolean | void>

  public refund = {}
}
