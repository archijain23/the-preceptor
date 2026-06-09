import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import Home from "./routes/index";
import About from "./routes/about";
import Book from "./routes/book";
import Contact from "./routes/contact";
import Services from "./routes/services";
import Testimonials from "./routes/testimonials";
import Shop from "./routes/shop";
import NotFound from "./routes/not-found";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
