import { createFileRoute } from '@tanstack/react-router'
import BookingWizard from '@/components/booking/BookingWizard'

export const Route = createFileRoute('/book')({ component: BookPage })

function BookPage() {
  return (
    <section className="page-section">
      <div className="container">
        <BookingWizard />
      </div>
    </section>
  )
}
