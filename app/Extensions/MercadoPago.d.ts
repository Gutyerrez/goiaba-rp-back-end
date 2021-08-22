declare module '@ioc:App/Extensions/MercadoPago' {
  import { DateTime } from 'luxon'

  export type Payment = {
    id: number
    date_created: string
    date_approved: string
    date_last_updated: string
    money_release_date: string
    payment_method_id: string
    payment_type_id:
    | 'account_money'
    | 'ticket'
    | 'bank_transfer'
    | 'atm'
    | 'credit_card'
    | 'debit_card'
    | 'prepaid_card'
    status:
    | 'pending'
    | 'approved'
    | 'authorized'
    | 'in_process'
    | 'in_mediation'
    | 'rejected'
    | 'cancelled'
    | 'refunded'
    | 'charged_back'
    status_detail: string
    currency_id:
    | 'ARS'
    | 'BRL'
    | 'CLP'
    | 'MXN'
    | 'COP'
    | 'PEN'
    | 'UYU'
    description: string
    collector_id: number
    payer: {
      id: string
      email: string
      identification: {
        type: string
        number: string
      }
      type: 'customer' | 'registered' | 'guest'
    }
    metadata: any
    additional_info: {
      id: string
      title: string
      description: string
      picture_url: string
      category_id: string
      quantity: number
      unit_price: number
    }
    order: any
    transaction_amount: number
    transaction_amount_refunded: number
    coupon_amount: number
    transaction_details: {
      net_received_amount: number
      total_paid_amount: number
      overpaid_amount: number
      installment_amount: number
    }
    installments: number
    card: {
      id: string
      first_six_digits: string
      last_four_digits: string
      expiration_month: number
      expiration_year: number
      date_created: string
      date_last_updated: string
      cardholder: {
        name: string
        identification: {
          number: string
          type: string
        }
      }
    }
  }
}
