import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <motion.button
      type="button"
      className={`${sizes[size]} flex items-center justify-center rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 ${
        checked 
          ? 'bg-gradient-to-r from-accent to-green-500 border-accent text-white shadow-soft' 
          : 'bg-white border-gray-300 hover:border-primary'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      disabled={disabled}
      onClick={onChange}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      animate={checked ? { rotate: [0, 5, -5, 0] } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <ApperIcon name="Check" size={iconSizes[size]} />
        </motion.div>
      )}
    </motion.button>
  );
};

export default Checkbox;