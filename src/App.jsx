import { Routes, Route } from 'react-router-dom';
import SiteLayout from './components/site/SiteLayout';
import HomePage from './routes/HomePage';
import ServicesPage from './routes/ServicesPage';
import BookingPage from './routes/BookingPage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import NotFoundPage from './routes/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
