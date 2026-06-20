// FIX 3: Use named imports from framer-motion instead of the full default
// import. This allows Rollup/Vite to tree-shake the ~50% of framer-motion
// that is never used (AnimatePresence, useSpring, useScroll, etc.).
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}) {
  const variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
