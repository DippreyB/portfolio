import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from 'framer-motion'

export default function App({
  Component,
  router,
  pageProps: { session, ...pageProps },
}) {

  return (
   
      <SessionProvider session={session}>
        <AnimatePresence  exitBeforeEnter initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>

      </SessionProvider>
  )
}
