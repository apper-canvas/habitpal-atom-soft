import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import HabitCard from '@/components/molecules/HabitCard';
import HabitSelector from '@/components/molecules/HabitSelector';
import ConfettiOverlay from '@/components/molecules/ConfettiOverlay';
import ApperIcon from '@/components/ApperIcon';
import { habitService, progressService } from '@/services';

const HabitTracker = () => {
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [allHabits, setAllHabits] = useState([]);
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({ completed: 0, total: 0, percentage: 0, allCompleted: false });
  const [loading, setLoading] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [allHabitsData, selectedHabitsData] = await Promise.all([
        habitService.getAllPredefined(),
        habitService.getSelected()
      ]);
      
      setAllHabits(allHabitsData);
      setSelectedHabits(selectedHabitsData);
      
      if (selectedHabitsData.length > 0) {
        await loadProgress(selectedHabitsData.map(h => h.id));
      }
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load habits');
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async (habitIds) => {
    try {
      const [progressData, statsData] = await Promise.all([
        progressService.getTodayProgress(habitIds),
        progressService.getDailyStats(habitIds)
      ]);
      
      setProgress(progressData);
      setStats(statsData);
      
      // Show confetti if all completed
      if (statsData.allCompleted && !showConfetti) {
        setShowConfetti(true);
      }
    } catch (err) {
      toast.error('Failed to load progress');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleHabitSelection = async (habitIds) => {
    try {
      const updatedHabits = await habitService.updateSelected(habitIds);
      setSelectedHabits(updatedHabits);
      
      if (updatedHabits.length > 0) {
        await loadProgress(updatedHabits.map(h => h.id));
      } else {
        setProgress([]);
        setStats({ completed: 0, total: 0, percentage: 0, allCompleted: false });
      }
      
      toast.success('Habits updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update habits');
    }
  };

  const handleToggleHabit = async (habitId) => {
    try {
      const newState = await progressService.toggleHabit(habitId);
      
      // Update progress optimistically
      setProgress(prev => prev.map(p => 
        p.habitId === habitId 
          ? { ...p, completedToday: newState }
          : p
      ));
      
      // Recalculate stats
      const habitIds = selectedHabits.map(h => h.id);
      const updatedStats = await progressService.getDailyStats(habitIds);
      setStats(updatedStats);
      
      // Show confetti if all completed
      if (updatedStats.allCompleted && !showConfetti) {
        setShowConfetti(true);
      }
      
      toast.success(newState ? 'Great job! 🎉' : 'Habit unchecked');
    } catch (err) {
      toast.error('Failed to update habit');
      // Reload to ensure consistency
      await loadProgress(selectedHabits.map(h => h.id));
    }
  };

  const handleResetDay = async () => {
    if (stats.completed === 0) {
      toast.info('No habits to reset');
      return;
    }
    
    if (!window.confirm('Are you sure you want to reset all today\'s progress?')) {
      return;
    }
    
    try {
      const habitIds = selectedHabits.map(h => h.id);
      await progressService.resetToday(habitIds);
      await loadProgress(habitIds);
      toast.success('Day reset successfully');
    } catch (err) {
      toast.error('Failed to reset day');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-card"
          >
            <div className="animate-pulse space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex space-x-2">
                {[...Array(7)].map((_, j) => (
                  <div key={j} className="w-6 h-6 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={loadData}>
          Try Again
        </Button>
      </div>
    );
  }

  if (selectedHabits.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Target" size={64} className="text-primary mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-display text-primary mb-4">
            Ready to build great habits?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Choose up to 5 habits you'd like to track daily. Small steps lead to big changes!
          </p>
          <Button
            size="lg"
            onClick={() => setShowSelector(true)}
            className="shadow-button"
          >
            <ApperIcon name="Plus" size={20} className="mr-2" />
            Choose Your Habits
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-6 text-white shadow-button"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display mb-2">Today's Progress</h2>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold">
                  {stats.completed}/{stats.total} completed
                </span>
                <div className="bg-white/20 rounded-full px-3 py-1">
                  <span className="text-sm font-medium">{stats.percentage}%</span>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ scale: stats.allCompleted ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl"
            >
              {stats.allCompleted ? '🏆' : stats.percentage > 50 ? '💪' : '🌱'}
            </motion.div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-white h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => setShowSelector(true)}
            className="flex-1"
          >
            <ApperIcon name="Settings" size={18} className="mr-2" />
            Edit Habits
          </Button>
          <Button
            variant="ghost"
            onClick={handleResetDay}
            disabled={stats.completed === 0}
            className="flex-1"
          >
            <ApperIcon name="RotateCcw" size={18} className="mr-2" />
            Reset Day
          </Button>
        </div>

        {/* Habit List */}
        <div className="space-y-4">
          <AnimatePresence>
            {selectedHabits.map((habit) => {
              const habitProgress = progress.find(p => p.habitId === habit.id);
              
              return (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  completedToday={habitProgress?.completedToday || false}
                  history={habitProgress?.history || []}
                  onToggle={() => handleToggleHabit(habit.id)}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Habit Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <HabitSelector
            habits={allHabits}
            selectedHabits={selectedHabits}
            onSelectionChange={handleHabitSelection}
            onClose={() => setShowSelector(false)}
          />
        )}
      </AnimatePresence>

      {/* Confetti Celebration */}
      <ConfettiOverlay
        show={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
    </>
  );
};

export default HabitTracker;