/**
 * Progress Tracker - Learning Analytics & Progress Monitoring
 * Tracks user progress and provides learning insights
 * @version 1.0.0
 * @author iLearnHow
 */

import { Logger } from '../../utils/logger.js';
import { ErrorHandler } from '../../utils/error-handler.js';
import { config } from '../../core/config.js';

export class ProgressTracker {
    constructor() {
        this.isReady = false;
        this.progressData = null;
        this.currentSession = null;
        this.analytics = null;
        this.storageKey = 'ilearn_progress';
        this.sessionKey = 'ilearn_session';
        
        // Tracking metrics
        this.metrics = {
            lessonsCompleted: 0,
            totalTimeSpent: 0,
            averageSynthesisTime: 0,
            preferredAge: null,
            preferredTone: null,
            completionRate: 0,
            streakDays: 0,
            lastLessonDate: null
        };
    }

    /**
     * Initialize the progress tracker
     */
    async initialize() {
        try {
            Logger.info('progress_tracker_init', 'Initializing progress tracker');
            
            // Load existing progress data
            await this.loadProgressData();
            
            // Initialize current session
            this.initializeSession();
            
            // Initialize analytics
            await this.initializeAnalytics();
            
            // Set up periodic saving
            this.setupAutoSave();
            
            // Mark as ready
            this.isReady = true;
            
            Logger.info('progress_tracker_ready', 'Progress tracker initialized successfully');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'progress_tracker', phase: 'initialization' });
            throw error;
        }
    }

    /**
     * Load progress data from storage
     */
    async loadProgressData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            
            if (stored) {
                this.progressData = JSON.parse(stored);
                Logger.info('progress_tracker_loaded', 'Progress data loaded from storage');
            } else {
                this.progressData = this.createInitialProgressData();
                Logger.info('progress_tracker_initialized', 'New progress data initialized');
            }
            
            // Validate data structure
            this.validateProgressData();
            
        } catch (error) {
            Logger.warn('progress_tracker_load_failed', 'Failed to load progress data, creating new');
            this.progressData = this.createInitialProgressData();
        }
    }

    /**
     * Create initial progress data structure
     */
    createInitialProgressData() {
        return {
            version: '1.0.0',
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            user: {
                id: this.generateUserId(),
                preferences: {
                    defaultAge: 25,
                    defaultTone: 'neutral',
                    accessibility: {
                        highContrast: false,
                        reducedMotion: false,
                        screenReader: false
                    }
                }
            },
            lessons: {
                completed: [],
                inProgress: [],
                bookmarked: []
            },
            analytics: {
                totalLessons: 0,
                totalTimeSpent: 0,
                averageSynthesisTime: 0,
                completionRate: 0,
                streakDays: 0,
                lastLessonDate: null,
                preferredAge: null,
                preferredTone: null,
                monthlyProgress: {},
                dailyActivity: {}
            },
            achievements: [],
            sessions: []
        };
    }

    /**
     * Generate unique user ID
     */
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Validate progress data structure
     */
    validateProgressData() {
        const required = ['version', 'createdAt', 'user', 'lessons', 'analytics'];
        
        for (const field of required) {
            if (!this.progressData[field]) {
                throw new Error(`Invalid progress data: missing ${field}`);
            }
        }
        
        // Ensure arrays exist
        if (!Array.isArray(this.progressData.lessons.completed)) {
            this.progressData.lessons.completed = [];
        }
        if (!Array.isArray(this.progressData.lessons.inProgress)) {
            this.progressData.lessons.inProgress = [];
        }
        if (!Array.isArray(this.progressData.lessons.bookmarked)) {
            this.progressData.lessons.bookmarked = [];
        }
    }

    /**
     * Initialize current session
     */
    initializeSession() {
        const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        this.currentSession = {
            id: sessionId,
            startTime: new Date().toISOString(),
            lessons: [],
            totalTime: 0,
            synthesisTimes: [],
            parameters: {
                ages: [],
                tones: []
            }
        };
        
        // Store session in localStorage
        localStorage.setItem(this.sessionKey, JSON.stringify(this.currentSession));
        
        Logger.info('progress_tracker_session', `New session started: ${sessionId}`);
    }

    /**
     * Initialize analytics system
     */
    async initializeAnalytics() {
        this.analytics = {
            trackEvent: (event, data) => this.trackEvent(event, data),
            trackLesson: (lessonData) => this.trackLesson(lessonData),
            trackSynthesis: (synthesisData) => this.trackSynthesis(synthesisData),
            getInsights: () => this.getInsights(),
            getProgress: () => this.getProgress(),
            getRecommendations: () => this.getRecommendations()
        };
    }

    /**
     * Set up automatic saving
     */
    setupAutoSave() {
        // Save progress every 5 minutes
        this.autoSaveInterval = setInterval(() => {
            this.saveProgressData();
        }, 5 * 60 * 1000);
        
        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveProgressData();
        });
    }

    /**
     * Record lesson load
     */
    recordLessonLoad(day, age, tone, synthesisTime) {
        try {
            const lessonRecord = {
                day: day,
                age: age,
                tone: tone,
                synthesisTime: synthesisTime,
                timestamp: new Date().toISOString(),
                sessionId: this.currentSession.id
            };
            
            // Add to current session
            this.currentSession.lessons.push(lessonRecord);
            this.currentSession.synthesisTimes.push(synthesisTime);
            this.currentSession.parameters.ages.push(age);
            this.currentSession.parameters.tones.push(tone);
            
            // Update session in storage
            localStorage.setItem(this.sessionKey, JSON.stringify(this.currentSession));
            
            // Track synthesis performance
            this.trackSynthesis({
                day: day,
                age: age,
                tone: tone,
                duration: synthesisTime,
                success: true
            });
            
            Logger.info('progress_tracker_lesson_loaded', `Lesson ${day} loaded in ${synthesisTime}ms`);
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'progress_tracker', phase: 'record_lesson_load' });
        }
    }

    /**
     * Record lesson completion
     */
    recordLessonCompletion(day, age, tone, duration, completionType = 'full') {
        try {
            const completionRecord = {
                day: day,
                age: age,
                tone: tone,
                duration: duration,
                completionType: completionType,
                timestamp: new Date().toISOString(),
                sessionId: this.currentSession.id
            };
            
            // Add to completed lessons
            this.progressData.lessons.completed.push(completionRecord);
            
            // Update analytics
            this.updateAnalytics(completionRecord);
            
            // Check for achievements
            this.checkAchievements();
            
            // Save progress
            this.saveProgressData();
            
            Logger.info('progress_tracker_lesson_completed', `Lesson ${day} completed (${completionType})`);
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'progress_tracker', phase: 'record_lesson_completion' });
        }
    }

    /**
     * Track synthesis performance
     */
    trackSynthesis(data) {
        try {
            const synthesisRecord = {
                ...data,
                timestamp: new Date().toISOString(),
                sessionId: this.currentSession.id
            };
            
            // Add to analytics
            if (!this.progressData.analytics.synthesisHistory) {
                this.progressData.analytics.synthesisHistory = [];
            }
            
            this.progressData.analytics.synthesisHistory.push(synthesisRecord);
            
            // Keep only last 1000 records
            if (this.progressData.analytics.synthesisHistory.length > 1000) {
                this.progressData.analytics.synthesisHistory = 
                    this.progressData.analytics.synthesisHistory.slice(-1000);
            }
            
            // Update average synthesis time
            this.updateAverageSynthesisTime();
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'progress_tracker', phase: 'track_synthesis' });
        }
    }

    /**
     * Track user event
     */
    trackEvent(event, data) {
        try {
            const eventRecord = {
                event: event,
                data: data,
                timestamp: new Date().toISOString(),
                sessionId: this.currentSession.id
            };
            
            // Add to analytics
            if (!this.progressData.analytics.events) {
                this.progressData.analytics.events = [];
            }
            
            this.progressData.analytics.events.push(eventRecord);
            
            // Keep only last 500 events
            if (this.progressData.analytics.events.length > 500) {
                this.progressData.analytics.events = 
                    this.progressData.analytics.events.slice(-500);
            }
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'progress_tracker', phase: 'track_event' });
        }
    }

    /**
     * Update analytics with completion data
     */
    updateAnalytics(completionRecord) {
        const analytics = this.progressData.analytics;
        
        // Update total lessons
        analytics.totalLessons++;
        
        // Update total time spent
        analytics.totalTimeSpent += completionRecord.duration;
        
        // Update last lesson date
        analytics.lastLessonDate = completionRecord.timestamp;
        
        // Update completion rate
        analytics.completionRate = this.calculateCompletionRate();
        
        // Update streak
        analytics.streakDays = this.calculateStreak();
        
        // Update preferences
        this.updatePreferences(completionRecord.age, completionRecord.tone);
        
        // Update monthly progress
        this.updateMonthlyProgress(completionRecord);
        
        // Update daily activity
        this.updateDailyActivity(completionRecord);
    }

    /**
     * Calculate completion rate
     */
    calculateCompletionRate() {
        const totalLessons = this.progressData.analytics.totalLessons;
        const totalSessions = this.progressData.sessions.length;
        
        if (totalSessions === 0) return 0;
        
        return Math.round((totalLessons / totalSessions) * 100);
    }

    /**
     * Calculate current streak
     */
    calculateStreak() {
        const completedLessons = this.progressData.lessons.completed;
        if (completedLessons.length === 0) return 0;
        
        // Sort by timestamp
        const sortedLessons = completedLessons.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        let streak = 0;
        let currentDate = new Date();
        
        for (const lesson of sortedLessons) {
            const lessonDate = new Date(lesson.timestamp);
            const daysDiff = Math.floor((currentDate - lessonDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === streak) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    /**
     * Update user preferences
     */
    updatePreferences(age, tone) {
        const analytics = this.progressData.analytics;
        
        // Update preferred age (most common)
        if (!analytics.ageFrequency) {
            analytics.ageFrequency = {};
        }
        analytics.ageFrequency[age] = (analytics.ageFrequency[age] || 0) + 1;
        
        const mostCommonAge = Object.entries(analytics.ageFrequency)
            .sort(([,a], [,b]) => b - a)[0];
        analytics.preferredAge = mostCommonAge ? parseInt(mostCommonAge[0]) : age;
        
        // Update preferred tone (most common)
        if (!analytics.toneFrequency) {
            analytics.toneFrequency = {};
        }
        analytics.toneFrequency[tone] = (analytics.toneFrequency[tone] || 0) + 1;
        
        const mostCommonTone = Object.entries(analytics.toneFrequency)
            .sort(([,a], [,b]) => b - a)[0];
        analytics.preferredTone = mostCommonTone ? mostCommonTone[0] : tone;
    }

    /**
     * Update monthly progress
     */
    updateMonthlyProgress(completionRecord) {
        const date = new Date(completionRecord.timestamp);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!this.progressData.analytics.monthlyProgress[monthKey]) {
            this.progressData.analytics.monthlyProgress[monthKey] = {
                lessons: 0,
                timeSpent: 0,
                averageSynthesisTime: 0
            };
        }
        
        const monthData = this.progressData.analytics.monthlyProgress[monthKey];
        monthData.lessons++;
        monthData.timeSpent += completionRecord.duration;
    }

    /**
     * Update daily activity
     */
    updateDailyActivity(completionRecord) {
        const date = new Date(completionRecord.timestamp);
        const dayKey = date.toISOString().split('T')[0];
        
        if (!this.progressData.analytics.dailyActivity[dayKey]) {
            this.progressData.analytics.dailyActivity[dayKey] = {
                lessons: 0,
                timeSpent: 0
            };
        }
        
        const dayData = this.progressData.analytics.dailyActivity[dayKey];
        dayData.lessons++;
        dayData.timeSpent += completionRecord.duration;
    }

    /**
     * Update average synthesis time
     */
    updateAverageSynthesisTime() {
        const synthesisHistory = this.progressData.analytics.synthesisHistory;
        if (synthesisHistory.length === 0) return;
        
        const totalTime = synthesisHistory.reduce((sum, record) => sum + record.duration, 0);
        this.progressData.analytics.averageSynthesisTime = totalTime / synthesisHistory.length;
    }

    /**
     * Check for achievements
     */
    checkAchievements() {
        const analytics = this.progressData.analytics;
        const achievements = this.progressData.achievements;
        
        // First lesson achievement
        if (analytics.totalLessons === 1 && !this.hasAchievement('first_lesson')) {
            this.addAchievement('first_lesson', 'First Steps', 'Completed your first lesson');
        }
        
        // 10 lessons achievement
        if (analytics.totalLessons === 10 && !this.hasAchievement('ten_lessons')) {
            this.addAchievement('ten_lessons', 'Getting Started', 'Completed 10 lessons');
        }
        
        // 50 lessons achievement
        if (analytics.totalLessons === 50 && !this.hasAchievement('fifty_lessons')) {
            this.addAchievement('fifty_lessons', 'Halfway There', 'Completed 50 lessons');
        }
        
        // 100 lessons achievement
        if (analytics.totalLessons === 100 && !this.hasAchievement('hundred_lessons')) {
            this.addAchievement('hundred_lessons', 'Century Club', 'Completed 100 lessons');
        }
        
        // 7-day streak achievement
        if (analytics.streakDays === 7 && !this.hasAchievement('week_streak')) {
            this.addAchievement('week_streak', 'Week Warrior', 'Maintained a 7-day learning streak');
        }
        
        // 30-day streak achievement
        if (analytics.streakDays === 30 && !this.hasAchievement('month_streak')) {
            this.addAchievement('month_streak', 'Monthly Master', 'Maintained a 30-day learning streak');
        }
        
        // Fast synthesis achievement
        if (analytics.averageSynthesisTime < 100 && !this.hasAchievement('fast_synthesis')) {
            this.addAchievement('fast_synthesis', 'Speed Demon', 'Average synthesis time under 100ms');
        }
    }

    /**
     * Check if user has specific achievement
     */
    hasAchievement(achievementId) {
        return this.progressData.achievements.some(a => a.id === achievementId);
    }

    /**
     * Add new achievement
     */
    addAchievement(id, title, description) {
        const achievement = {
            id: id,
            title: title,
            description: description,
            earnedAt: new Date().toISOString()
        };
        
        this.progressData.achievements.push(achievement);
        
        // Dispatch achievement event
        const event = new CustomEvent('achievement:earned', {
            detail: { achievement }
        });
        window.dispatchEvent(event);
        
        Logger.info('progress_tracker_achievement', `Achievement earned: ${title}`);
    }

    /**
     * Get learning insights
     */
    getInsights() {
        const analytics = this.progressData.analytics;
        
        return {
            totalLessons: analytics.totalLessons,
            totalTimeSpent: analytics.totalTimeSpent,
            averageSynthesisTime: analytics.averageSynthesisTime,
            completionRate: analytics.completionRate,
            streakDays: analytics.streakDays,
            preferredAge: analytics.preferredAge,
            preferredTone: analytics.preferredTone,
            lastLessonDate: analytics.lastLessonDate,
            achievements: this.progressData.achievements.length,
            monthlyProgress: analytics.monthlyProgress,
            dailyActivity: analytics.dailyActivity
        };
    }

    /**
     * Get progress summary
     */
    getProgress() {
        const completed = this.progressData.lessons.completed;
        const totalDays = 366;
        
        return {
            completedLessons: completed.length,
            totalDays: totalDays,
            progressPercentage: Math.round((completed.length / totalDays) * 100),
            remainingDays: totalDays - completed.length,
            completedDays: completed.map(l => l.day),
            recentActivity: this.getRecentActivity()
        };
    }

    /**
     * Get recent activity
     */
    getRecentActivity() {
        const completed = this.progressData.lessons.completed;
        const sorted = completed.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        return sorted.slice(0, 10).map(lesson => ({
            day: lesson.day,
            age: lesson.age,
            tone: lesson.tone,
            timestamp: lesson.timestamp,
            duration: lesson.duration
        }));
    }

    /**
     * Get learning recommendations
     */
    getRecommendations() {
        const insights = this.getInsights();
        const progress = this.getProgress();
        const recommendations = [];
        
        // Recommend based on completion rate
        if (insights.completionRate < 50) {
            recommendations.push({
                type: 'completion',
                title: 'Improve Completion Rate',
                description: 'Try completing more lessons to build momentum',
                priority: 'high'
            });
        }
        
        // Recommend based on streak
        if (insights.streakDays < 3) {
            recommendations.push({
                type: 'streak',
                title: 'Build a Learning Streak',
                description: 'Learn daily to build a consistent habit',
                priority: 'medium'
            });
        }
        
        // Recommend based on progress
        if (progress.progressPercentage < 25) {
            recommendations.push({
                type: 'progress',
                title: 'Explore More Topics',
                description: 'Try lessons from different days to discover new content',
                priority: 'medium'
            });
        }
        
        // Recommend based on preferences
        if (insights.preferredTone === 'neutral') {
            recommendations.push({
                type: 'variety',
                title: 'Try Different Tones',
                description: 'Experiment with fun or warm tones for variety',
                priority: 'low'
            });
        }
        
        return recommendations;
    }

    /**
     * Save progress data to storage
     */
    saveProgressData() {
        try {
            this.progressData.lastUpdated = new Date().toISOString();
            
            // Add current session to sessions list
            if (this.currentSession) {
                this.progressData.sessions.push({
                    ...this.currentSession,
                    endTime: new Date().toISOString()
                });
            }
            
            localStorage.setItem(this.storageKey, JSON.stringify(this.progressData));
            
            Logger.info('progress_tracker_saved', 'Progress data saved to storage');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'progress_tracker', phase: 'save_data' });
        }
    }

    /**
     * Export progress data
     */
    exportProgressData() {
        return {
            ...this.progressData,
            exportDate: new Date().toISOString(),
            exportVersion: '1.0.0'
        };
    }

    /**
     * Import progress data
     */
    importProgressData(data) {
        try {
            // Validate imported data
            if (!data.version || !data.user || !data.lessons || !data.analytics) {
                throw new Error('Invalid progress data format');
            }
            
            this.progressData = data;
            this.saveProgressData();
            
            Logger.info('progress_tracker_imported', 'Progress data imported successfully');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'progress_tracker', phase: 'import_data' });
            throw error;
        }
    }

    /**
     * Reset progress data
     */
    resetProgressData() {
        this.progressData = this.createInitialProgressData();
        this.saveProgressData();
        
        Logger.info('progress_tracker_reset', 'Progress data reset');
    }

    /**
     * Get tracker status
     */
    getStatus() {
        return {
            isReady: this.isReady,
            totalLessons: this.progressData.analytics.totalLessons,
            currentSession: this.currentSession ? {
                id: this.currentSession.id,
                lessons: this.currentSession.lessons.length,
                startTime: this.currentSession.startTime
            } : null,
            lastSaved: this.progressData.lastUpdated
        };
    }

    /**
     * Shutdown the progress tracker
     */
    async shutdown() {
        Logger.info('progress_tracker_shutdown', 'Shutting down progress tracker');
        
        // Save final progress
        this.saveProgressData();
        
        // Clear auto-save interval
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        // End current session
        if (this.currentSession) {
            this.currentSession.endTime = new Date().toISOString();
            this.progressData.sessions.push(this.currentSession);
        }
        
        this.isReady = false;
        Logger.info('progress_tracker_shutdown_complete', 'Progress tracker shutdown complete');
    }
} 