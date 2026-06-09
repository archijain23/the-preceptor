import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/site/Layout.jsx';
import HomePage from './routes/HomePage.jsx';
import ServicesPage from './routes/ServicesPage.jsx';
import BookingPage from './routes/BookingPage.jsx';
import AboutPage from './routes/AboutPage.jsx';
import ContactPage from './routes/ContactPage.jsx';
import NotFoundPage from './routes/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="book" element={<BookingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
