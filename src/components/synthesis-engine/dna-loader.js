/**
 * DNA Loader - Curriculum Data Management
 * Efficient loading and caching of 366-day curriculum data
 * @author iLearnHow
 * @version 1.0.0
 */

import { Logger } from '@utils/logger.js';
import { PerformanceMonitor } from '@utils/performance.js';

export class DNALoader {
    constructor() {
        this.logger = new Logger('DNALoader');
        this.curriculumCache = new Map();
        this.dnaData = null;
        this.initialized = false;
        
        // Month mapping for efficient data loading
        this.monthFiles = {
            1: 'january_curriculum.json',
            2: 'february_curriculum.json',
            3: 'march_curriculum.json',
            4: 'april_curriculum.json',
            5: 'may_curriculum.json',
            6: 'june_curriculum.json',
            7: 'july_curriculum.json',
            8: 'august_curriculum.json',
            9: 'september_curriculum.json',
            10: 'october_curriculum.json',
            11: 'november_curriculum.json',
            12: 'december_curriculum.json'
        };
    }

    /**
     * Load DNA data with performance monitoring
     */
    async loadDNA() {
        const startTime = performance.now();
        
        try {
            this.logger.info('Loading lesson DNA data...');
            
            // Load the main DNA file
            const dnaResponse = await fetch('assets/data/the-sun-dna.json');
            if (!dnaResponse.ok) {
                throw new Error(`Failed to load DNA data: ${dnaResponse.status}`);
            }
            
            this.dnaData = await dnaResponse.json();
            
            // Preload curriculum data for better performance
            await this.preloadCurriculumData();
            
            this.initialized = true;
            
            const loadTime = performance.now() - startTime;
            this.logger.info(`DNA data loaded in ${loadTime.toFixed(2)}ms`);
            
            PerformanceMonitor.mark('dna-load-complete');
            PerformanceMonitor.measure('dna-load-time', 'dna-load-start', 'dna-load-complete');
            
        } catch (error) {
            this.logger.error('Failed to load DNA data:', error);
            throw error;
        }
    }

    /**
     * Preload curriculum data for all months
     */
    async preloadCurriculumData() {
        const preloadPromises = Object.entries(this.monthFiles).map(([month, filename]) =>
            this.loadMonthCurriculum(parseInt(month), filename)
        );
        
        try {
            await Promise.all(preloadPromises);
            this.logger.info('All curriculum data preloaded successfully');
        } catch (error) {
            this.logger.warn('Some curriculum data failed to preload:', error);
            // Continue with partial data
        }
    }

    /**
     * Load curriculum data for a specific month
     */
    async loadMonthCurriculum(month, filename) {
        try {
            const response = await fetch(`assets/data/curriculum/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}: ${response.status}`);
            }
            
            const data = await response.json();
            this.curriculumCache.set(month, data);
            
            this.logger.debug(`Loaded curriculum for month ${month}`);
            
        } catch (error) {
            this.logger.error(`Failed to load curriculum for month ${month}:`, error);
            throw error;
        }
    }

    /**
     * Get curriculum data for a specific day
     */
    async getDayCurriculum(day) {
        if (!this.initialized) {
            throw new Error('DNA Loader not initialized');
        }
        
        const month = this.getMonthFromDay(day);
        const dayInMonth = this.getDayInMonth(day);
        
        // Get month curriculum
        let monthCurriculum = this.curriculumCache.get(month);
        
        if (!monthCurriculum) {
            // Load month curriculum if not cached
            await this.loadMonthCurriculum(month, this.monthFiles[month]);
            monthCurriculum = this.curriculumCache.get(month);
        }
        
        // Get day-specific data
        const dayData = monthCurriculum.days[dayInMonth - 1];
        
        if (!dayData) {
            throw new Error(`No curriculum data found for day ${day}`);
        }
        
        // Combine with DNA data
        return this.combineDayData(dayData, this.dnaData);
    }

    /**
     * Combine day-specific curriculum with DNA data
     */
    combineDayData(dayData, dnaData) {
        return {
            ...dnaData,
            ...dayData,
            title: dayData.title || dnaData.title,
            concept: dayData.concept || dnaData.concept,
            examples: dayData.examples || dnaData.examples,
            reflection: dayData.reflection || dnaData.reflection
        };
    }

    /**
     * Get month number from day number (1-366)
     */
    getMonthFromDay(day) {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let month = 1;
        let dayCount = 0;
        
        for (let i = 0; i < daysInMonth.length; i++) {
            dayCount += daysInMonth[i];
            if (day <= dayCount) {
                month = i + 1;
                break;
            }
        }
        
        return month;
    }

    /**
     * Get day number within month from day number (1-366)
     */
    getDayInMonth(day) {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let dayCount = 0;
        
        for (let i = 0; i < daysInMonth.length; i++) {
            dayCount += daysInMonth[i];
            if (day <= dayCount) {
                return day - (dayCount - daysInMonth[i]);
            }
        }
        
        return day;
    }

    /**
     * Use fallback DNA data when loading fails
     */
    useFallbackDNA() {
        this.logger.warn('Using fallback DNA data');
        
        this.dnaData = {
            title: 'The Sun - Our Magnificent Life-Giving Star',
            concept: 'The sun is the center of our solar system and provides energy for life on Earth.',
            examples: [
                'Plants use sunlight to make food through photosynthesis',
                'Solar panels convert sunlight into electricity',
                'The sun\'s gravity keeps planets in orbit'
            ],
            reflection: 'How does the sun affect your daily life?',
            dna: {
                ageContexts: {
                    early_childhood: {
                        baseTitle: 'The Sun - Our Bright Friend',
                        introTemplate: 'Hello little one! Let\'s learn about the big bright sun in the sky.',
                        conceptTemplate: 'The sun is like a giant light bulb in the sky that helps everything grow.',
                        reflectionTemplate: 'What do you see when you look at the sun?'
                    },
                    middle_childhood: {
                        baseTitle: 'The Sun - Earth\'s Energy Source',
                        introTemplate: 'Today we\'ll discover how the sun powers our world.',
                        conceptTemplate: 'The sun is a star that provides light and heat to Earth.',
                        reflectionTemplate: 'How would Earth be different without the sun?'
                    },
                    adolescence: {
                        baseTitle: 'The Sun - Nuclear Fusion in Action',
                        introTemplate: 'Let\'s explore the fascinating science behind our sun.',
                        conceptTemplate: 'The sun is a massive ball of hydrogen undergoing nuclear fusion.',
                        reflectionTemplate: 'What questions do you have about how the sun works?'
                    },
                    adulthood: {
                        baseTitle: 'The Sun - Stellar Evolution and Life',
                        introTemplate: 'We\'ll examine the sun\'s role in stellar evolution and life.',
                        conceptTemplate: 'The sun is a main-sequence star converting hydrogen to helium.',
                        reflectionTemplate: 'How does understanding the sun help us understand other stars?'
                    }
                },
                tonePatterns: {
                    grandmother: {
                        titleModifier: 'Warm ',
                        introStyle: 'gentle and caring',
                        conceptStyle: 'patient and nurturing',
                        exampleStyle: 'relatable and comforting',
                        reflectionStyle: 'thoughtful and encouraging'
                    },
                    fun: {
                        titleModifier: 'Amazing ',
                        introStyle: 'exciting and energetic',
                        conceptStyle: 'dynamic and engaging',
                        exampleStyle: 'cool and fascinating',
                        reflectionStyle: 'creative and inspiring'
                    },
                    neutral: {
                        titleModifier: '',
                        introStyle: 'clear and educational',
                        conceptStyle: 'precise and informative',
                        exampleStyle: 'practical and relevant',
                        reflectionStyle: 'analytical and objective'
                    }
                }
            }
        };
        
        this.initialized = true;
    }

    /**
     * Get DNA data
     */
    getDNA() {
        return this.dnaData;
    }

    /**
     * Check if loader is initialized
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Get cache statistics
     */
    getCacheStats() {
        return {
            curriculumCacheSize: this.curriculumCache.size,
            initialized: this.initialized,
            monthFiles: Object.keys(this.monthFiles).length
        };
    }

    /**
     * Clear curriculum cache
     */
    clearCache() {
        this.curriculumCache.clear();
        this.logger.info('Curriculum cache cleared');
    }

    /**
     * Reset loader state
     */
    reset() {
        this.clearCache();
        this.dnaData = null;
        this.initialized = false;
        this.logger.info('DNA Loader reset complete');
    }
} 