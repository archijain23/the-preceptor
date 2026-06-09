import { Outlet, createRootRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'

function RootComponent() {
  const router = useRouter()
  useEffect(() => {
    return router.subscribe('onResolved', () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }, [router])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'oklch(0.08 0.022 272)', color: 'oklch(0.9 0.01 85)' }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function NotFoundComponent() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.5rem', background: 'oklch(0.08 0.022 272)' }}>
      <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', marginBottom: '1rem' }}>404</p>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', marginBottom: '1.5rem' }}>Page not found</h1>
      <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'oklch(0.82 0.12 85)', color: 'oklch(0.1 0.02 272)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 2rem', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none' }}>Return Home</a>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})
