import { motion } from 'framer-motion';
import Checkbox from '@/components/atoms/Checkbox';
import ApperIcon from '@/components/ApperIcon';
import { subDays, format } from 'date-fns';

const HabitCard = ({ 
  habit, 
  completedToday, 
  history = [], 
  onToggle, 
  disabled = false 
}) => {
  const getDayLabel = (index) => {
    const date = subDays(new Date(), 6 - index);
    return format(date, 'EEE');
  };

  const getDayDate = (index) => {
    const date = subDays(new Date(), 6 - index);
    return format(date, 'MMM d');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-6 shadow-card border border-surface-200 max-w-full overflow-hidden"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Checkbox
            checked={completedToday}
            onChange={onToggle}
            disabled={disabled}
            size="lg"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-3">
            <ApperIcon name={habit.icon} size={20} className="text-primary flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 break-words">{habit.name}</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">Past 7 days</p>
            <div className="flex space-x-1 overflow-x-auto">
              {history.map((completed, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-1 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  title={`${getDayLabel(index)}, ${getDayDate(index)}`}
                >
                  <div className="text-xs text-gray-500 font-medium min-w-[24px] text-center">
                    {getDayLabel(index)}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    completed 
                      ? 'bg-gradient-to-r from-accent to-green-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {completed ? '✅' : '⛔'}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;