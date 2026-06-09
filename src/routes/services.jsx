import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({ component: ServicesPage })

function ServicesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <h1>Services</h1>
        {/* Services populated from Sanity CMS (Phase 1) */}
      </div>
    </section>
  )
}
