import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/testimonials')({ component: TestimonialsPage })

function TestimonialsPage() {
  return (
    <section className="page-section">
      <div className="container">
        <h1>Client Testimonials</h1>
        {/* Testimonials populated from Sanity CMS (Phase 1) */}
      </div>
    </section>
  )
}
