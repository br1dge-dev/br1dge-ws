import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import BridgeLogo from '../ui/BridgeLogo';
import MouseTracker from '../interactive/MouseTracker';

export default function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center md:items-center">
      {/* MouseTracker nur auf Desktop (nicht Mobile) */}
      <div className="hidden md:block">
        <MouseTracker />
      </div>

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-surface)] to-[var(--color-surface)]"
        style={{ opacity }}
      />

      {/* Parallax floating elements - Bridge only, centered */}
      <motion.div style={{ y: parallaxY }} className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Bridge symbol - Central element, larger */}
        <motion.div
          className="scale-[3]"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 3 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          <BridgeLogo />
        </motion.div>
      </motion.div>

      {/* Decorative grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
}
