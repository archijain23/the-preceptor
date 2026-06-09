import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Quote,
  PlayCircle,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const reviews = [
  // ... your reviews array
];

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselReviews = reviews.slice(0, 5);
  const moreReviews = reviews.slice(5);
  const activeReview = carouselReviews[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(
        (current) => (current + 1) % carouselReviews.length
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [carouselReviews.length]);

  const goPrevious = () => {
    setActiveIndex(
      (current) =>
        (current + carouselReviews.length - 1) %
        carouselReviews.length
    );
  };

  const goNext = () => {
    setActiveIndex(
      (current) => (current + 1) % carouselReviews.length
    );
  };

  return (
    <>
      <Helmet>
        <title>Testimonials — The Precetor</title>
        <meta
          name="description"
          content="Real stories from clients across the United States and the world after their consultations with The Precetor."
        />
        <meta
          property="og:title"
          content="Client Stories — The Precetor"
        />
        <meta
          property="og:description"
          content="Trusted by 8,400+ clients across 47 countries."
        />
      </Helmet>

      <div className="bg-hero starfield min-h-screen">
        {/* Keep all your existing JSX here unchanged */}
      </div>
    </>
  );
}