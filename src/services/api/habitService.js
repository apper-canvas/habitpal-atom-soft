import predefinedHabits from '../mockData/habits.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class HabitService {
  constructor() {
    this.selectedHabits = this.loadSelectedHabits();
  }

  loadSelectedHabits() {
    const stored = localStorage.getItem('habitpal-selected-habits');
    return stored ? JSON.parse(stored) : [];
  }

  saveSelectedHabits(habits) {
    localStorage.setItem('habitpal-selected-habits', JSON.stringify(habits));
    this.selectedHabits = habits;
  }

  async getAllPredefined() {
    await delay(200);
    return [...predefinedHabits];
  }

  async getSelected() {
    await delay(100);
    return [...this.selectedHabits];
  }

  async updateSelected(habitIds) {
    await delay(300);
    if (habitIds.length > 5) {
      throw new Error('You can select up to 5 habits only');
    }
    
    const selectedHabits = predefinedHabits.filter(habit => 
      habitIds.includes(habit.id)
    );
    
    this.saveSelectedHabits(selectedHabits);
    return [...selectedHabits];
  }

  async getById(id) {
    await delay(100);
    const habit = predefinedHabits.find(h => h.id === id);
    if (!habit) {
      throw new Error('Habit not found');
    }
    return { ...habit };
  }
}

export default new HabitService();