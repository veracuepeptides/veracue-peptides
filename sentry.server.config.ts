import * as Sentry from '@sentry/nextjs'

Sentry.init({
  // SENTRY_DSN is the server-side name; fall back to the public DSN so setting only
  // NEXT_PUBLIC_SENTRY_DSN does not leave server, action, webhook and cron errors unreported.
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  // Disabled: uses Node's inspector/debugger protocol to capture local variables on error,
  // which is known to corrupt stream internals (TransformStream/kState) on newer Node
  // versions like this project's Node 24 runtime — was causing
  // "controller[kState].transformAlgorithm is not a function" crashes.
  includeLocalVariables: false,
  enableLogs: true,
})
