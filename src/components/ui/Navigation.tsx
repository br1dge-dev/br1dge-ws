import { motion } from 'framer-motion';

export default function Navigation() {
  return (
    <motion.nav
      className="fixed top-6 left-6 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.a
        href="#hero"
        className="text-4xl font-bold"
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        ͆
      </motion.a>
    </motion.nav>
  );
}
