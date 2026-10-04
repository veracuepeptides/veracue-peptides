import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
})

// Session replay is a large add-on to the client bundle. Load it after the page has finished
// loading (from Sentry's CDN) instead of shipping it in the initial JS for every route.
if (typeof window !== 'undefined') {
  const addReplay = () => {
    Sentry.lazyLoadIntegration('replayIntegration')
      .then((replayIntegration) => Sentry.addIntegration(replayIntegration()))
      .catch(() => {
        // Replay is optional; error and performance reporting keep working without it.
      })
  }
  if (document.readyState === 'complete') addReplay()
  else window.addEventListener('load', addReplay, { once: true })
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
