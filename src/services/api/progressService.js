import { format, subDays, isToday } from 'date-fns';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProgressService {
  constructor() {
    this.progress = this.loadProgress();
  }

  loadProgress() {
    const stored = localStorage.getItem('habitpal-progress');
    return stored ? JSON.parse(stored) : {};
  }

  saveProgress() {
    localStorage.setItem('habitpal-progress', JSON.stringify(this.progress));
  }

  async getTodayProgress(habitIds) {
    await delay(150);
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayData = this.progress[today] || {};
    
    return habitIds.map(habitId => ({
      habitId,
      completedToday: todayData[habitId] || false,
      history: this.getWeekHistory(habitId)
    }));
  }

  getWeekHistory(habitId) {
    const history = [];
    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const dayData = this.progress[date] || {};
      history.push(dayData[habitId] || false);
    }
    return history;
  }

  async toggleHabit(habitId) {
    await delay(100);
    const today = format(new Date(), 'yyyy-MM-dd');
    
    if (!this.progress[today]) {
      this.progress[today] = {};
    }
    
    this.progress[today][habitId] = !this.progress[today][habitId];
    this.saveProgress();
    
    return this.progress[today][habitId];
  }

  async resetToday(habitIds) {
    await delay(200);
    const today = format(new Date(), 'yyyy-MM-dd');
    
    if (!this.progress[today]) {
      this.progress[today] = {};
    }
    
    habitIds.forEach(habitId => {
      this.progress[today][habitId] = false;
    });
    
    this.saveProgress();
    return true;
  }

  async getDailyStats(habitIds) {
    await delay(100);
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayData = this.progress[today] || {};
    
    const completed = habitIds.filter(habitId => todayData[habitId]).length;
    const total = habitIds.length;
    
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      allCompleted: completed === total && total > 0
    };
  }
}

export default new ProgressService();