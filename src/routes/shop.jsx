import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shop')({ component: ShopPage })

function ShopPage() {
  return (
    <section className="page-section">
      <div className="container">
        <h1>Digital Products</h1>
        {/* Products populated from Sanity CMS (Phase 1) */}
      </div>
    </section>
  )
}
