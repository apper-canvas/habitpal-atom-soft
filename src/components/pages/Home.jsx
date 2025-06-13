import { motion } from 'framer-motion';
import HabitTracker from '@/components/organisms/HabitTracker';

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-display text-primary mb-4"
            animate={{ 
              background: [
                'linear-gradient(45deg, #7C3AED, #EC4899)',
                'linear-gradient(45deg, #EC4899, #10B981)',
                'linear-gradient(45deg, #10B981, #7C3AED)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            HabitPal
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Your friendly companion for building amazing daily habits ✨
          </p>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <HabitTracker />
        </motion.main>
      </div>
    </div>
  );
};

export default Home;