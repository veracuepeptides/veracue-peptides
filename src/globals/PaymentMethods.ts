import type { GlobalConfig } from 'payload'
import { PAYMENT_METHOD_KEYS } from '../lib/payments/methods'
import { revalidatePaymentMethods } from '../lib/revalidate'

const isStaff = ({ req: { user } }: any) => !!user && ['admin', 'staff'].includes(user.role as string)

export const PaymentMethods: GlobalConfig = {
  slug: 'payment-methods',
  label: 'Payment Methods',
  admin: {
    group: 'Store Management',
    description:
      'Turn the payment options on checkout on or off, drag rows to change their order, and edit the text customers see. The first option that is on is the one pre-selected. At least one option must stay on.',
  },
  access: {
    // Read by the server with full access; nothing public needs the raw document.
    read: isStaff,
    update: isStaff,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidatePaymentMethods()
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'methods',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: PAYMENT_METHOD_KEYS.length,
      admin: {
        initCollapsed: false,
        description:
          'This list controls display only (on or off, order and wording). The payment handling itself is built into the site. A method that is switched off stops taking new orders straight away; payments already in progress still complete.',
      },
      validate: (value: any) => {
        if (!Array.isArray(value)) return true
        const keys = value.map((row: any) => row?.key).filter(Boolean)
        if (new Set(keys).size !== keys.length) return 'Each payment method can only appear once.'
        if (value.length > 0 && !value.some((row: any) => row?.enabled !== false)) {
          return 'At least one payment method must stay on, otherwise customers cannot place an order.'
        }
        return true
      },
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Card (via VeracuePay)', value: 'veracuepay' },
            { label: 'Zelle', value: 'zelle' },
            { label: 'Stripe (Custom Payment Link)', value: 'stripe_link' },
          ],
          admin: {
            description:
              'Which checkout payment path this row controls. The card option also needs the VeracuePay settings in the server environment; without them it stays hidden even when it is on here.',
          },
        },
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'On',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'The option title at checkout, for example "Zelle" or "Credit / Debit Card".' },
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          admin: { description: 'The small line under the title at checkout.' },
        },
      ],
    },
  ],
}
