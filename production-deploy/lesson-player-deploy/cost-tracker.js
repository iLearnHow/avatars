/**
 * iLearn Cost Tracker
 * Real-time monitoring of API costs and usage
 */

class CostTracker {
    constructor() {
        this.costs = {
            elevenLabs: {
                totalCost: 0,
                totalCharacters: 0,
                totalRequests: 0,
                costPerThousandChars: 0.30
            },
            claude: {
                totalCost: 0,
                totalInputTokens: 0,
                totalOutputTokens: 0,
                totalRequests: 0,
                costPerMillionInputTokens: 3.00,
                costPerMillionOutputTokens: 15.00
            },
            storage: {
                totalCost: 0,
                totalGB: 0,
                costPerGB: 0.02 // Cloudflare R2 pricing
            }
        };
        
        this.dailyBudget = 500; // $500 daily budget
        this.monthlyBudget = 2000; // $2000 monthly budget
        this.startDate = new Date();
        
        this.loadFromStorage();
        this.startPeriodicSave();
    }

    /**
     * Track ElevenLabs API usage
     */
    trackElevenLabsUsage(characters, requestId = null) {
        const cost = (characters / 1000) * this.costs.elevenLabs.costPerThousandChars;
        
        this.costs.elevenLabs.totalCost += cost;
        this.costs.elevenLabs.totalCharacters += characters;
        this.costs.elevenLabs.totalRequests += 1;
        
        console.log(`💰 ElevenLabs: ${characters} chars = $${cost.toFixed(4)}`);
        
        this.saveToStorage();
        this.checkBudgetLimits();
        
        return {
            cost,
            totalCost: this.costs.elevenLabs.totalCost,
            totalCharacters: this.costs.elevenLabs.totalCharacters,
            totalRequests: this.costs.elevenLabs.totalRequests
        };
    }

    /**
     * Track Claude API usage
     */
    trackClaudeUsage(inputTokens, outputTokens, requestId = null) {
        const inputCost = (inputTokens / 1000000) * this.costs.claude.costPerMillionInputTokens;
        const outputCost = (outputTokens / 1000000) * this.costs.claude.costPerMillionOutputTokens;
        const totalCost = inputCost + outputCost;
        
        this.costs.claude.totalCost += totalCost;
        this.costs.claude.totalInputTokens += inputTokens;
        this.costs.claude.totalOutputTokens += outputTokens;
        this.costs.claude.totalRequests += 1;
        
        console.log(`🤖 Claude: ${inputTokens} input + ${outputTokens} output tokens = $${totalCost.toFixed(4)}`);
        
        this.saveToStorage();
        this.checkBudgetLimits();
        
        return {
            cost: totalCost,
            inputCost,
            outputCost,
            totalCost: this.costs.claude.totalCost,
            totalInputTokens: this.costs.claude.totalInputTokens,
            totalOutputTokens: this.costs.claude.totalOutputTokens,
            totalRequests: this.costs.claude.totalRequests
        };
    }

    /**
     * Track storage usage
     */
    trackStorageUsage(gigabytes) {
        const cost = gigabytes * this.costs.storage.costPerGB;
        
        this.costs.storage.totalCost += cost;
        this.costs.storage.totalGB += gigabytes;
        
        console.log(`💾 Storage: ${gigabytes} GB = $${cost.toFixed(4)}`);
        
        this.saveToStorage();
        this.checkBudgetLimits();
        
        return {
            cost,
            totalCost: this.costs.storage.totalCost,
            totalGB: this.costs.storage.totalGB
        };
    }

    /**
     * Get total costs
     */
    getTotalCosts() {
        const totalCost = 
            this.costs.elevenLabs.totalCost + 
            this.costs.claude.totalCost + 
            this.costs.storage.totalCost;
        
        return {
            total: totalCost,
            elevenLabs: this.costs.elevenLabs.totalCost,
            claude: this.costs.claude.totalCost,
            storage: this.costs.storage.totalCost,
            dailyBudget: this.dailyBudget,
            monthlyBudget: this.monthlyBudget,
            dailyRemaining: this.dailyBudget - this.getTodayCost(),
            monthlyRemaining: this.monthlyBudget - this.getThisMonthCost()
        };
    }

    /**
     * Get today's cost
     */
    getTodayCost() {
        // This would need to be implemented with actual date tracking
        // For now, return a fraction of total cost
        const daysSinceStart = Math.max(1, Math.floor((new Date() - this.startDate) / (1000 * 60 * 60 * 24)));
        return this.getTotalCosts().total / daysSinceStart;
    }

    /**
     * Get this month's cost
     */
    getThisMonthCost() {
        // This would need to be implemented with actual date tracking
        // For now, return total cost
        return this.getTotalCosts().total;
    }

    /**
     * Check budget limits
     */
    checkBudgetLimits() {
        const costs = this.getTotalCosts();
        
        if (costs.dailyRemaining < 0) {
            console.warn(`⚠️ Daily budget exceeded! Spent: $${costs.total.toFixed(2)}`);
            this.triggerBudgetAlert('daily');
        }
        
        if (costs.monthlyRemaining < 0) {
            console.warn(`⚠️ Monthly budget exceeded! Spent: $${costs.total.toFixed(2)}`);
            this.triggerBudgetAlert('monthly');
        }
        
        if (costs.dailyRemaining < 50) {
            console.warn(`⚠️ Daily budget warning: $${costs.dailyRemaining.toFixed(2)} remaining`);
        }
        
        if (costs.monthlyRemaining < 200) {
            console.warn(`⚠️ Monthly budget warning: $${costs.monthlyRemaining.toFixed(2)} remaining`);
        }
    }

    /**
     * Trigger budget alert
     */
    triggerBudgetAlert(type) {
        const alert = {
            type: type,
            timestamp: new Date().toISOString(),
            costs: this.getTotalCosts(),
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} budget exceeded!`
        };
        
        console.error(`🚨 BUDGET ALERT: ${alert.message}`);
        
        // Store alert
        if (typeof localStorage !== 'undefined') {
            const alerts = JSON.parse(localStorage.getItem('costAlerts') || '[]');
            alerts.push(alert);
            localStorage.setItem('costAlerts', JSON.stringify(alerts));
        }
        
        return alert;
    }

    /**
     * Estimate lesson generation cost
     */
    estimateLessonCost(lessonType = 'full') {
        if (lessonType === 'fast') {
            return {
                elevenLabs: 0,
                claude: 0,
                storage: 0.001, // Minimal storage
                total: 0.001
            };
        }
        
        // Full lesson estimation
        const avgScriptLength = 350; // characters
        const avgTokensPerPiece = 750;
        const piecesPerLesson = 37; // 12 languages × 3 content types + additional scripts
        const audioFilesPerLesson = 144; // 12 languages × 12 audio pieces
        
        const elevenLabsCost = (audioFilesPerLesson * avgScriptLength / 1000) * this.costs.elevenLabs.costPerThousandChars;
        const claudeCost = (piecesPerLesson * avgTokensPerPiece / 1000000) * this.costs.claude.costPerMillionOutputTokens;
        const storageCost = 0.01; // Estimated storage cost per lesson
        
        return {
            elevenLabs: elevenLabsCost,
            claude: claudeCost,
            storage: storageCost,
            total: elevenLabsCost + claudeCost + storageCost
        };
    }

    /**
     * Get cost report
     */
    getCostReport() {
        const costs = this.getTotalCosts();
        const lessonEstimate = this.estimateLessonCost('full');
        
        return {
            summary: {
                totalSpent: costs.total,
                dailyBudget: costs.dailyBudget,
                monthlyBudget: costs.monthlyBudget,
                dailyRemaining: costs.dailyRemaining,
                monthlyRemaining: costs.monthlyRemaining
            },
            breakdown: {
                elevenLabs: {
                    cost: costs.elevenLabs,
                    requests: this.costs.elevenLabs.totalRequests,
                    characters: this.costs.elevenLabs.totalCharacters
                },
                claude: {
                    cost: costs.claude,
                    requests: this.costs.claude.totalRequests,
                    inputTokens: this.costs.claude.totalInputTokens,
                    outputTokens: this.costs.claude.totalOutputTokens
                },
                storage: {
                    cost: costs.storage,
                    gigabytes: this.costs.storage.totalGB
                }
            },
            estimates: {
                lessonCost: lessonEstimate,
                lessonsPerDay: Math.floor(costs.dailyRemaining / lessonEstimate.total),
                lessonsPerMonth: Math.floor(costs.monthlyRemaining / lessonEstimate.total)
            }
        };
    }

    /**
     * Save to storage
     */
    saveToStorage() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('costTracker', JSON.stringify({
                costs: this.costs,
                startDate: this.startDate.toISOString(),
                dailyBudget: this.dailyBudget,
                monthlyBudget: this.monthlyBudget
            }));
        }
    }

    /**
     * Load from storage
     */
    loadFromStorage() {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('costTracker');
            if (stored) {
                const data = JSON.parse(stored);
                this.costs = data.costs || this.costs;
                this.startDate = new Date(data.startDate || this.startDate);
                this.dailyBudget = data.dailyBudget || this.dailyBudget;
                this.monthlyBudget = data.monthlyBudget || this.monthlyBudget;
            }
        }
    }

    /**
     * Start periodic save
     */
    startPeriodicSave() {
        setInterval(() => {
            this.saveToStorage();
        }, 30000); // Save every 30 seconds
    }

    /**
     * Reset costs
     */
    reset() {
        this.costs = {
            elevenLabs: { totalCost: 0, totalCharacters: 0, totalRequests: 0, costPerThousandChars: 0.30 },
            claude: { totalCost: 0, totalInputTokens: 0, totalOutputTokens: 0, totalRequests: 0, costPerMillionInputTokens: 3.00, costPerMillionOutputTokens: 15.00 },
            storage: { totalCost: 0, totalGB: 0, costPerGB: 0.02 }
        };
        this.startDate = new Date();
        this.saveToStorage();
        console.log('🔄 Cost tracker reset');
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CostTracker = CostTracker;
}
if (typeof module !== 'undefined') {
    module.exports = { CostTracker };
} 