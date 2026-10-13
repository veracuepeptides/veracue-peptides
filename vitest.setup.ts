// Load the same env file Next.js uses so tests see the real configuration.
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

// No test run may send real email, including mail triggered inside Payload's own hooks.
process.env.DISABLE_OUTBOUND_EMAIL = 'true'
