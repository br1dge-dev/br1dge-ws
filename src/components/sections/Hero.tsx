import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Bridge - Only element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="text-[20rem] font-bold leading-none"
          animate={{
            color: ['#00FFFF', '#FF00FF', '#7C3AED', '#00FFFF'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          whileHover={{
            scale: 1.5,
            filter: 'blur(2px)',
          }}
        >
          ͆
        </motion.span>
      </motion.div>
    </section>
  );
}
