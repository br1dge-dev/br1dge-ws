import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import BridgeLogo from '../ui/BridgeLogo';
import MouseTracker from '../interactive/MouseTracker';

export default function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* MouseTracker nur auf Desktop (nicht Mobile) */}
      <div className="hidden md:block">
        <MouseTracker />
      </div>

      {/* Animated Snake Grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(51, 51, 51, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 51, 51, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0',
        }}
        animate={{
          backgroundPositionX: ['0px', '60px', '0px'],
          backgroundPositionY: ['0px', '0px', '60px', '60px', '0px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
      />

      {/* Parallax floating elements - Bridge only, centered */}
      <motion.div style={{ y: parallaxY }} className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Bridge symbol - Central element, larger */}
        <motion.div
          className=""
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 3 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
        >
          <BridgeLogo />
        </motion.div>
      </motion.div>
    </section>
  );
}
