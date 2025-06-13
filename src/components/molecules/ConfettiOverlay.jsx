import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ConfettiOverlay = ({ show, onComplete }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (show) {
      const colors = ['#7C3AED', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];
      const shapes = ['●', '■', '▲', '♦', '★'];
      
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360
      }));
      
      setPieces(newPieces);
      
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(piece => (
        <motion.div
          key={piece.id}
          className="absolute text-2xl font-bold"
          style={{
            left: `${piece.left}%`,
            color: piece.color,
            fontSize: `${piece.size}rem`,
            top: '-10%'
          }}
          initial={{
            y: -50,
            opacity: 1,
            rotate: 0,
            scale: 0
          }}
          animate={{
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: piece.rotation,
            scale: piece.size
          }}
          transition={{
            duration: 2,
            delay: piece.delay,
            ease: "easeOut"
          }}
        >
          {piece.shape}
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-xl text-center max-w-sm mx-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-display text-primary mb-2">
            Well Done!
          </h2>
          <p className="text-gray-600">
            You've completed all your habits for today! Keep up the amazing work!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfettiOverlay;