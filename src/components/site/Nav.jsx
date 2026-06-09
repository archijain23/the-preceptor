import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, siteConfig } from '@/content/site';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-deep/80 backdrop-blur-xl border-b border-border/40 shadow-elegant' : 'py-5'
        }`}
      >
        <nav className="container-luxe flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-gold font-serif text-2xl leading-none group-hover:scale-110 transition-transform duration-300">✦</span>
            <span className="font-serif text-xl tracking-wide">{siteConfig.name}</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((l) =>
              l.hash ? (
                <li key={l.label}>
                  <a
                    href={l.hash}
                    className="nav-link text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="nav-link text-muted-foreground hover:text-foreground transition-colors duration-300"
                    activeProps={{ className: 'nav-link text-foreground' }}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <Link
            to="/book"
            className="hidden md:inline-flex btn-primary btn-text py-2.5 px-6 text-sm"
          >
            Book a Session
          </Link>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-deep/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {l.hash ? (
                  <a
                    href={l.hash}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl text-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.to}
                    className="font-serif text-4xl text-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/book" className="btn-primary btn-text mt-4">
                Book a Session
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
