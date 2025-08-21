/**
 * Cost Tracker
 * Budget management and cost tracking for AI API usage
 */

export class CostTracker {
  constructor(env) {
    this.env = env;
    this.dailyBudget = parseFloat(env.DAILY_AI_BUDGET) || 50;
    this.monthlyBudget = parseFloat(env.MONTHLY_AI_BUDGET) || 200;
    this.maxCostPerLesson = parseFloat(env.MAX_COST_PER_LESSON) || 0.05;
  }

  async checkBudget(env) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const month = new Date().toISOString().slice(0, 7); // YYYY-MM
      
      const [dailyCost, monthlyCost] = await Promise.all([
        this.getDailyCost(today),
        this.getMonthlyCost(month)
      ]);

      const dailyRemaining = this.dailyBudget - dailyCost;
      const monthlyRemaining = this.monthlyBudget - monthlyCost;

      if (dailyCost >= this.dailyBudget) {
        return {
          allowed: false,
          reason: 'daily_budget_exceeded',
          resetTime: this.getNextDayReset(),
          current: { daily: dailyCost, monthly: monthlyCost },
          limits: { daily: this.dailyBudget, monthly: this.monthlyBudget }
        };
      }

      if (monthlyCost >= this.monthlyBudget) {
        return {
          allowed: false,
          reason: 'monthly_budget_exceeded',
          resetTime: this.getNextMonthReset(),
          current: { daily: dailyCost, monthly: monthlyCost },
          limits: { daily: this.dailyBudget, monthly: this.monthlyBudget }
        };
      }

      return {
        allowed: true,
        remaining: { daily: dailyRemaining, monthly: monthlyRemaining },
        current: { daily: dailyCost, monthly: monthlyCost },
        limits: { daily: this.dailyBudget, monthly: this.monthlyBudget }
      };

    } catch (error) {
      console.error('Budget check error:', error);
      // On error, allow the request but log it
      return { allowed: true, error: error.message };
    }
  }

  async recordCost(cost, env) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const month = new Date().toISOString().slice(0, 7);
      const timestamp = new Date().toISOString();

      // Validate cost
      if (cost > this.maxCostPerLesson) {
        console.warn(`Cost ${cost} exceeds max per lesson limit ${this.maxCostPerLesson}`);
      }

      // Record in both Redis and KV for redundancy
      await Promise.all([
        this.recordDailyCost(today, cost),
        this.recordMonthlyCost(month, cost),
        this.recordCostLog(timestamp, cost)
      ]);

      console.log(`Recorded cost: $${cost.toFixed(4)}`);
      return true;

    } catch (error) {
      console.error('Record cost error:', error);
      return false;
    }
  }

  async getDailyCost(date) {
    try {
      const key = `cost:daily:${date}`;
      const cost = await this.env.ANALYTICS_KV.get(key);
      return parseFloat(cost) || 0;
    } catch (error) {
      console.error('Get daily cost error:', error);
      return 0;
    }
  }

  async getMonthlyCost(month) {
    try {
      const key = `cost:monthly:${month}`;
      const cost = await this.env.ANALYTICS_KV.get(key);
      return parseFloat(cost) || 0;
    } catch (error) {
      console.error('Get monthly cost error:', error);
      return 0;
    }
  }

  async recordDailyCost(date, cost) {
    try {
      const key = `cost:daily:${date}`;
      const current = await this.getDailyCost(date);
      const newTotal = current + cost;
      
      await this.env.ANALYTICS_KV.put(key, newTotal.toString(), { 
        expirationTtl: 86400 * 7 // 7 days
      });
    } catch (error) {
      console.error('Record daily cost error:', error);
    }
  }

  async recordMonthlyCost(month, cost) {
    try {
      const key = `cost:monthly:${month}`;
      const current = await this.getMonthlyCost(month);
      const newTotal = current + cost;
      
      await this.env.ANALYTICS_KV.put(key, newTotal.toString(), { 
        expirationTtl: 86400 * 35 // 35 days
      });
    } catch (error) {
      console.error('Record monthly cost error:', error);
    }
  }

  async recordCostLog(timestamp, cost) {
    try {
      const logEntry = {
        timestamp,
        cost,
        lessonId: 'unknown', // Would be passed from synthesis
        model: 'claude-3-5-sonnet'
      };

      const key = `cost:log:${timestamp}`;
      await this.env.ANALYTICS_KV.put(key, JSON.stringify(logEntry), {
        expirationTtl: 86400 * 30 // 30 days
      });
    } catch (error) {
      console.error('Record cost log error:', error);
    }
  }

  getNextDayReset() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
  }

  getNextMonthReset() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toISOString();
  }

  async getCostStats(days = 7) {
    try {
      const stats = [];
      const now = new Date();

      for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const cost = await this.getDailyCost(dateStr);
        stats.push({ date: dateStr, cost });
      }

      const totalCost = stats.reduce((sum, day) => sum + day.cost, 0);
      const avgCost = totalCost / days;

      return {
        period: `${days} days`,
        totalCost,
        averageCost: avgCost,
        dailyBreakdown: stats.reverse(),
        budget: {
          daily: this.dailyBudget,
          monthly: this.monthlyBudget,
          maxPerLesson: this.maxCostPerLesson
        },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Get cost stats error:', error);
      return { error: error.message };
    }
  }

  async getBudgetAlerts() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const month = new Date().toISOString().slice(0, 7);
      
      const [dailyCost, monthlyCost] = await Promise.all([
        this.getDailyCost(today),
        this.getMonthlyCost(month)
      ]);

      const alerts = [];

      // Daily budget alerts
      const dailyPercentage = (dailyCost / this.dailyBudget) * 100;
      if (dailyPercentage >= 90) {
        alerts.push({
          type: 'daily_budget_warning',
          percentage: dailyPercentage,
          remaining: this.dailyBudget - dailyCost,
          threshold: 90
        });
      }

      // Monthly budget alerts
      const monthlyPercentage = (monthlyCost / this.monthlyBudget) * 100;
      if (monthlyPercentage >= 90) {
        alerts.push({
          type: 'monthly_budget_warning',
          percentage: monthlyPercentage,
          remaining: this.monthlyBudget - monthlyCost,
          threshold: 90
        });
      }

      return {
        alerts,
        current: { daily: dailyCost, monthly: monthlyCost },
        limits: { daily: this.dailyBudget, monthly: this.monthlyBudget },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Get budget alerts error:', error);
      return { error: error.message };
    }
  }
} 