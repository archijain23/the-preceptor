import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";

/**
 * Legal links shown at the bottom of the mobile nav overlay.
 * These pages don't belong in the primary nav hierarchy but must
 * be reachable on mobile — footer is off-screen when the menu opens.
 */
const mobileFooterLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms",   label: "Terms & Conditions" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-border/60 shadow-elegant"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-gold font-serif text-2xl group-hover:rotate-12 transition-transform duration-500">
              ✦
            </span>
            <span className="font-serif text-xl tracking-wide">{siteConfig.name}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary navigation">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `nav-link text-muted-foreground hover:text-foreground transition-colors relative group${
                    isActive ? " text-foreground" : ""
                  }`
                }
              >
                {l.label}
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </NavLink>
            ))}
          </nav>

          <Link
            to="/book"
            className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground btn-text hover:scale-[1.03] hover:shadow-gold transition-all duration-300"
          >
            Book a Session
          </Link>

          <button
            className="lg:hidden text-foreground relative w-10 h-10 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
              className="absolute"
            >
              <Menu className="w-6 h-6" />
            </motion.span>
            <motion.span
              animate={{ rotate: open ? 0 : -90, opacity: open ? 1 : 0 }}
              className="absolute"
            >
              <X className="w-6 h-6" />
            </motion.span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />

            {/* Primary nav links — centred, full-screen */}
            <nav
              className="relative h-full flex flex-col items-center justify-center gap-8 px-8"
              aria-label="Mobile primary navigation"
            >
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.07,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl text-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* Book CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6"
              >
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-gold"
                >
                  Book a Session
                </Link>
              </motion.div>

              {/* Legal links — bottom strip, subtle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-6 px-8"
              >
                {mobileFooterLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide"
                  >
                    {l.label}
                  </Link>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
