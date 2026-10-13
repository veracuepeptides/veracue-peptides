import * as Sentry from '@sentry/nextjs'

Sentry.init({
  // Same fallback as the server config: one DSN setting is enough.
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  enableLogs: true,
})
