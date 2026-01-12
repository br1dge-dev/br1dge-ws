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

      {/* Parallax floating elements - Bridge only */}
      <motion.div style={{ y: parallaxY }} className="relative z-10 text-center flex flex-col items-center justify-center h-full">
        {/* Bridge symbol - Central element */}
        <motion.div
          className="scale-[1.5]"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1.5 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          <BridgeLogo />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-8 h-12 border-2 border-gray-600 rounded-full mx-auto flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div className="w-1.5 h-1.5 bg-[var(--color-accent-cyan)] rounded-full" />
          </motion.div>
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
