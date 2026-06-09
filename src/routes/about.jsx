import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <section className="page-section">
      <div className="container">
        <h1>About The Preceptor</h1>
        <p>Astrologer story goes here.</p>
      </div>
    </section>
  )
}
