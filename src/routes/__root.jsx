import { createRootRoute, Outlet } from '@tanstack/react-router'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
