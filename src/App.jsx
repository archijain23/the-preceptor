import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import TorchCursor from "./components/site/TorchCursor";
import Home from "./routes/index";
import About from "./routes/about";
import Book from "./routes/book";
import Contact from "./routes/contact";
import Services from "./routes/services";
import Testimonials from "./routes/testimonials";
import Shop from "./routes/shop";
import QnA from "./routes/qna";
import NotFound from "./routes/not-found";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cosmic background layers */}
      <div id="cosmic-bg" aria-hidden="true" />
      <div id="cosmic-grain" aria-hidden="true" />

      {/* Golden torch cursor — fixed overlay, pointer-events-none */}
      <TorchCursor />

      <Nav />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/qna" element={<QnA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
