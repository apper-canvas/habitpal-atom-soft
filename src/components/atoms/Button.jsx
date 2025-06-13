import { motion } from 'framer-motion';

const Button = ({ 
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-pill";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-purple-600 text-white shadow-button hover:shadow-lg focus:ring-primary/50",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-soft focus:ring-primary/50",
    ghost: "text-primary hover:bg-surface-100 focus:ring-primary/50",
    danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-button hover:shadow-lg focus:ring-error/50"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;