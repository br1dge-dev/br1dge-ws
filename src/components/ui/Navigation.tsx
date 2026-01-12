import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function Navigation() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{ opacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Logo link */}
      <a
        href="#hero"
        className="text-2xl font-bold hover:text-[var(--color-accent-cyan)] transition-colors"
      >
        br1dge.xyz
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {['Projects', 'About', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm uppercase tracking-wider hover:text-[var(--color-accent-magenta)] transition-colors"
            whileHover={{ x: 3 }}
          >
            {item}
          </motion.a>
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <motion.span
          className="w-6 h-0.5 bg-current"
          animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-current"
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-current"
          animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        />
      </button>
    </motion.nav>
  );
}
