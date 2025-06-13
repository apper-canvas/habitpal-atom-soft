import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const HabitSelector = ({ 
  habits = [], 
  selectedHabits = [], 
  onSelectionChange, 
  onClose 
}) => {
  const [selectedIds, setSelectedIds] = useState(
    selectedHabits.map(h => h.id)
  );

  const categories = [...new Set(habits.map(h => h.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');

  const filteredHabits = habits.filter(h => 
    activeCategory ? h.category === activeCategory : true
  );

  const handleToggle = (habitId) => {
    setSelectedIds(prev => {
      if (prev.includes(habitId)) {
        return prev.filter(id => id !== habitId);
      } else if (prev.length < 5) {
        return [...prev, habitId];
      }
      return prev;
    });
  };

  const handleSave = () => {
    onSelectionChange(selectedIds);
    onClose();
  };

  const categoryColors = {
    wellness: 'bg-blue-100 text-blue-700 border-blue-200',
    fitness: 'bg-green-100 text-green-700 border-green-200',
    mindfulness: 'bg-purple-100 text-purple-700 border-purple-200',
    learning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    social: 'bg-pink-100 text-pink-700 border-pink-200',
    productivity: 'bg-indigo-100 text-indigo-700 border-indigo-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display text-primary">
              Choose Your Habits
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Select up to 5 habits to track daily ({selectedIds.length}/5)
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Category Filter */}
          <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-pill text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-button'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Habit List */}
          <div className="space-y-3">
            {filteredHabits.map(habit => {
              const isSelected = selectedIds.includes(habit.id);
              const canSelect = selectedIds.length < 5 || isSelected;
              
              return (
                <motion.button
                  key={habit.id}
                  onClick={() => handleToggle(habit.id)}
                  disabled={!canSelect}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-primary bg-surface-100'
                      : canSelect
                      ? 'border-gray-200 hover:border-primary hover:bg-surface-50'
                      : 'border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                  whileHover={canSelect ? { scale: 1.02 } : {}}
                  whileTap={canSelect ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${categoryColors[habit.category] || 'bg-gray-100 text-gray-600'}`}>
                      <ApperIcon name={habit.icon} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 break-words">
                        {habit.name}
                      </h3>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary"
                      >
                        <ApperIcon name="Check" size={20} />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={selectedIds.length === 0}
              className="flex-1"
            >
              Save Selection
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HabitSelector;