/**
 * How a card payment appears on the customer's bank statement. Card payments are processed through
 * the VeracuePay gateway, whose merchant name is what the bank shows. Customers are told in the order
 * confirmation and in the order email, so the charge is recognised and not disputed.
 */
export const CARD_STATEMENT_NAME = 'Kaivora LLC'

export const CARD_STATEMENT_NOTE = `This charge will appear on your card statement as "${CARD_STATEMENT_NAME}". Card payments are processed by our payment partner, VeracuePay.`
