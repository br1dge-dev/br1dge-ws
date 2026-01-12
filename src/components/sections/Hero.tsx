import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import BridgeLogo from '../ui/BridgeLogo';

export default function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);

  const bridgeRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [particles, setParticles] = useState<any[]>([]);
  const [ripples, setRipples] = useState<any[]>([]);
  const [bridgeHovered, setBridgeHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add particles
      if (Math.random() > 0.8) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        };
        setParticles((prev: any[]) => [...prev.slice(-15), newParticle]);
      }

      // Check bridge collision
      const bridgeEl = bridgeRef.current;
      if (bridgeEl) {
        const bridgeRect = bridgeEl.getBoundingClientRect();
        const isNear = (
          e.clientX >= bridgeRect.left - 100 &&
          e.clientX <= bridgeRect.right + 100 &&
          e.clientY >= bridgeRect.top - 100 &&
          e.clientY <= bridgeRect.bottom + 100
        );
        setBridgeHovered(isNear);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        life: 1,
      };
      setRipples((prev: any[]) => [...prev, newRipple]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseX, mouseY]);

  // Update particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev: any[]) =>
        prev
          .map((p: any) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.025,
          }))
          .filter((p: any) => p.life > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles.length]);

  // Update ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const interval = setInterval(() => {
      setRipples((prev: any[]) =>
        prev
          .map((r: any) => ({
            ...r,
            life: r.life - 0.04,
          }))
          .filter((r: any) => r.life > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [ripples.length]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Snake Grid */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(51, 51, 51, 0.7) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 51, 51, 0.7) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
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
        animate={{ opacity: 0.5 }}
      />

      {/* Bridge Container */}
      <motion.div style={{ y: parallaxY }} className="relative z-10 flex items-center justify-center">
        <motion.div
          ref={bridgeRef}
          data-bridge="true"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: bridgeHovered ? 3.3 : 3,
            rotate: bridgeHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <BridgeLogo />
        </motion.div>
      </motion.div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: bridgeHovered
            ? 'var(--color-accent-magenta)'
            : 'var(--color-accent-cyan)',
        }}
        animate={{
          scale: bridgeHovered ? 2.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Click Ripples */}
      {ripples.map((ripple: any) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 rounded-full border-2 border-[var(--color-accent-magenta)] pointer-events-none z-40 mix-blend-screen"
          style={{ x: ripple.x, y: ripple.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Particles */}
      {particles.map((particle: any) => (
        <motion.div
          key={particle.id}
          className="fixed w-1 h-1 rounded-full bg-[var(--color-accent-magenta)] pointer-events-none z-40"
          style={{
            x: particle.x,
            y: particle.y,
            opacity: particle.life,
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </section>
  );
}
