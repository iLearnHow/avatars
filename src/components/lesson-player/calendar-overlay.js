/**
 * Calendar Overlay - 366-Day Lesson Selection
 * Provides intuitive calendar interface for lesson selection
 * @version 1.0.0
 * @author iLearnHow
 */

import { Logger } from '../../utils/logger.js';
import { ErrorHandler } from '../../utils/error-handler.js';
import { config } from '../../core/config.js';

export class CalendarOverlay {
    constructor() {
        this.isVisible = false;
        this.isReady = false;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.selectedDay = null;
        this.eventListeners = new Map();
        
        // UI elements
        this.overlay = null;
        this.calendar = null;
        this.monthSelector = null;
        this.yearSelector = null;
        this.daysGrid = null;
        this.closeButton = null;
    }

    /**
     * Initialize the calendar overlay
     */
    async initialize() {
        try {
            Logger.info('calendar_overlay_init', 'Initializing calendar overlay');
            
            // Create overlay elements
            this.createOverlay();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize with current date
            this.initializeCurrentDate();
            
            // Mark as ready
            this.isReady = true;
            
            Logger.info('calendar_overlay_ready', 'Calendar overlay initialized successfully');
            
        } catch (error) {
            ErrorHandler.handle(error, { context: 'calendar_overlay', phase: 'initialization' });
            throw error;
        }
    }

    /**
     * Create the overlay structure
     */
    createOverlay() {
        // Create main overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'calendar-overlay';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-label', 'Lesson Calendar');
        this.overlay.setAttribute('aria-modal', 'true');
        
        // Create calendar container
        this.calendar = document.createElement('div');
        this.calendar.className = 'calendar-container';
        
        // Create header
        const header = this.createHeader();
        
        // Create month/year selectors
        const selectors = this.createSelectors();
        
        // Create days grid
        this.daysGrid = this.createDaysGrid();
        
        // Create close button
        this.closeButton = this.createCloseButton();
        
        // Assemble calendar
        this.calendar.appendChild(header);
        this.calendar.appendChild(selectors);
        this.calendar.appendChild(this.daysGrid);
        this.calendar.appendChild(this.closeButton);
        
        // Add to overlay
        this.overlay.appendChild(this.calendar);
        
        // Add to page
        document.body.appendChild(this.overlay);
        
        // Apply styles
        this.applyStyles();
    }

    /**
     * Create calendar header
     */
    createHeader() {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        
        header.innerHTML = `
            <h2>Choose Your Lesson</h2>
            <p>Select any day of the year to start learning</p>
        `;
        
        return header;
    }

    /**
     * Create month and year selectors
     */
    createSelectors() {
        const selectors = document.createElement('div');
        selectors.className = 'calendar-selectors';
        
        // Month selector
        this.monthSelector = document.createElement('select');
        this.monthSelector.className = 'month-selector';
        this.monthSelector.setAttribute('aria-label', 'Select month');
        
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            this.monthSelector.appendChild(option);
        });
        
        // Year selector
        this.yearSelector = document.createElement('select');
        this.yearSelector.className = 'year-selector';
        this.yearSelector.setAttribute('aria-label', 'Select year');
        
        // Add years (current year + 10 years)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            this.yearSelector.appendChild(option);
        }
        
        // Navigation buttons
        const navButtons = document.createElement('div');
        navButtons.className = 'calendar-nav';
        
        navButtons.innerHTML = `
            <button class="nav-btn prev-btn" aria-label="Previous month">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            <button class="nav-btn next-btn" aria-label="Next month">
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
            </button>
        `;
        
        // Assemble selectors
        selectors.appendChild(this.monthSelector);
        selectors.appendChild(this.yearSelector);
        selectors.appendChild(navButtons);
        
        return selectors;
    }

    /**
     * Create days grid
     */
    createDaysGrid() {
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';
        grid.setAttribute('role', 'grid');
        grid.setAttribute('aria-label', 'Calendar days');
        
        // Create day headers
        const headers = document.createElement('div');
        headers.className = 'calendar-headers';
        headers.setAttribute('role', 'row');
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header-cell';
            header.setAttribute('role', 'columnheader');
            header.textContent = day;
            headers.appendChild(header);
        });
        
        grid.appendChild(headers);
        
        // Create days container
        const daysContainer = document.createElement('div');
        daysContainer.className = 'calendar-days';
        daysContainer.setAttribute('role', 'rowgroup');
        
        grid.appendChild(daysContainer);
        
        return grid;
    }

    /**
     * Create close button
     */
    createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'calendar-close';
        closeBtn.setAttribute('aria-label', 'Close calendar');
        
        closeBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        `;
        
        return closeBtn;
    }

    /**
     * Apply CSS styles
     */
    applyStyles() {
        const styles = `
            .calendar-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .calendar-overlay.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .calendar-container {
                background: ${config.get('ui.theme.background')};
                border-radius: 12px;
                padding: 24px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .calendar-overlay.visible .calendar-container {
                transform: scale(1);
            }
            
            .calendar-header {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .calendar-header h2 {
                margin: 0 0 8px 0;
                color: ${config.get('ui.theme.text')};
                font-size: 24px;
                font-weight: 700;
            }
            
            .calendar-header p {
                margin: 0;
                color: #64748b;
                font-size: 14px;
            }
            
            .calendar-selectors {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 20px;
                justify-content: center;
            }
            
            .month-selector,
            .year-selector {
                padding: 8px 12px;
                border: 2px solid #e2e8f0;
                border-radius: 6px;
                background: white;
                font-size: 14px;
                cursor: pointer;
                transition: border-color 0.2s ease;
            }
            
            .month-selector:focus,
            .year-selector:focus {
                outline: none;
                border-color: ${config.get('ui.theme.primary')};
            }
            
            .calendar-nav {
                display: flex;
                gap: 8px;
            }
            
            .nav-btn {
                background: ${config.get('ui.theme.primary')};
                color: white;
                border: none;
                border-radius: 6px;
                width: 36px;
                height: 36px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .nav-btn:hover {
                background: ${config.get('ui.theme.accent')};
                transform: scale(1.05);
            }
            
            .nav-btn svg {
                fill: currentColor;
            }
            
            .calendar-grid {
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                overflow: hidden;
            }
            
            .calendar-headers {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                background: #f8fafc;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .calendar-header-cell {
                padding: 12px 8px;
                text-align: center;
                font-weight: 600;
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
            }
            
            .calendar-days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
            }
            
            .calendar-day {
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #f1f5f9;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s ease;
                position: relative;
            }
            
            .calendar-day:hover {
                background: #f0f9ff;
                color: ${config.get('ui.theme.primary')};
            }
            
            .calendar-day.selected {
                background: ${config.get('ui.theme.primary')};
                color: white;
            }
            
            .calendar-day.today {
                background: ${config.get('ui.theme.accent')};
                color: white;
                font-weight: 700;
            }
            
            .calendar-day.other-month {
                color: #cbd5e1;
                cursor: not-allowed;
            }
            
            .calendar-day.lesson-available::after {
                content: '';
                position: absolute;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 4px;
                background: ${config.get('ui.theme.success')};
                border-radius: 50%;
            }
            
            .calendar-close {
                position: absolute;
                top: 16px;
                right: 16px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            
            .calendar-close:hover {
                background: #f1f5f9;
            }
            
            .calendar-close svg {
                fill: #64748b;
            }
            
            .calendar-day-info {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s ease;
                z-index: 10;
            }
            
            .calendar-day-info::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 4px solid transparent;
                border-top-color: #1e293b;
            }
            
            .calendar-day:hover .calendar-day-info {
                opacity: 1;
                visibility: visible;
            }
            
            @media (max-width: 768px) {
                .calendar-container {
                    padding: 16px;
                    margin: 16px;
                }
                
                .calendar-selectors {
                    flex-direction: column;
                    gap: 8px;
                }
                
                .calendar-day {
                    font-size: 12px;
                }
            }
        `;
        
        // Inject styles
        if (!document.getElementById('calendar-overlay-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'calendar-overlay-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Month/year selector changes
        this.monthSelector.addEventListener('change', () => {
            this.currentMonth = parseInt(this.monthSelector.value);
            this.renderCalendar();
        });
        
        this.yearSelector.addEventListener('change', () => {
            this.currentYear = parseInt(this.yearSelector.value);
            this.renderCalendar();
        });
        
        // Navigation buttons
        const prevBtn = this.calendar.querySelector('.prev-btn');
        const nextBtn = this.calendar.querySelector('.next-btn');
        
        prevBtn.addEventListener('click', () => this.previousMonth());
        nextBtn.addEventListener('click', () => this.nextMonth());
        
        // Close button
        this.closeButton.addEventListener('click', () => this.hide());
        
        // Overlay click to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hide();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isVisible) return;
            
            switch (e.code) {
                case 'Escape':
                    e.preventDefault();
                    this.hide();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousMonth();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextMonth();
                    break;
            }
        });
        
        // Store references for cleanup
        this.eventListeners.set('monthSelector', this.monthSelector);
        this.eventListeners.set('yearSelector', this.yearSelector);
        this.eventListeners.set('prevBtn', prevBtn);
        this.eventListeners.set('nextBtn', nextBtn);
        this.eventListeners.set('closeBtn', this.closeButton);
        this.eventListeners.set('overlay', this.overlay);
    }

    /**
     * Initialize with current date
     */
    initializeCurrentDate() {
        const now = new Date();
        this.currentMonth = now.getMonth();
        this.currentYear = now.getFullYear();
        
        // Set selectors to current values
        this.monthSelector.value = this.currentMonth;
        this.yearSelector.value = this.currentYear;
        
        // Render initial calendar
        this.renderCalendar();
    }

    /**
     * Render the calendar for current month/year
     */
    renderCalendar() {
        const daysContainer = this.calendar.querySelector('.calendar-days');
        daysContainer.innerHTML = '';
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const today = new Date();
        const isCurrentMonth = this.currentMonth === today.getMonth() && this.currentYear === today.getFullYear();
        
        // Generate calendar days
        for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(currentDate, {
                isCurrentMonth: currentDate.getMonth() === this.currentMonth,
                isToday: isCurrentMonth && currentDate.getDate() === today.getDate(),
                isSelected: this.selectedDay && this.isSameDay(currentDate, this.selectedDay)
            });
            
            daysContainer.appendChild(dayElement);
        }
        
        Logger.info('calendar_overlay_rendered', `Calendar rendered for ${this.getMonthName(this.currentMonth)} ${this.currentYear}`);
    }

    /**
     * Create a day element
     */
    createDayElement(date, options) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.setAttribute('role', 'gridcell');
        dayElement.setAttribute('aria-label', `${this.getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`);
        
        const dayNumber = date.getDate();
        dayElement.textContent = dayNumber;
        
        // Add classes based on options
        if (!options.isCurrentMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (options.isToday) {
            dayElement.classList.add('today');
        }
        
        if (options.isSelected) {
            dayElement.classList.add('selected');
        }
        
        // Add lesson availability indicator
        if (this.isLessonAvailable(date)) {
            dayElement.classList.add('lesson-available');
        }
        
        // Add tooltip with lesson info
        if (options.isCurrentMonth) {
            const tooltip = this.createDayTooltip(date);
            dayElement.appendChild(tooltip);
            
            // Add click handler
            dayElement.addEventListener('click', () => {
                this.selectDay(date);
            });
        }
        
        return dayElement;
    }

    /**
     * Create tooltip for day
     */
    createDayTooltip(date) {
        const tooltip = document.createElement('div');
        tooltip.className = 'calendar-day-info';
        
        const dayOfYear = this.getDayOfYear(date);
        tooltip.textContent = `Day ${dayOfYear} - Lesson Available`;
        
        return tooltip;
    }

    /**
     * Check if lesson is available for date
     */
    isLessonAvailable(date) {
        if (date.getMonth() !== this.currentMonth) return false;
        
        const dayOfYear = this.getDayOfYear(date);
        return dayOfYear >= 1 && dayOfYear <= 366;
    }

    /**
     * Get day of year (1-366)
     */
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    /**
     * Check if two dates are the same day
     */
    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    /**
     * Get month name
     */
    getMonthName(monthIndex) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    }

    /**
     * Select a day
     */
    selectDay(date) {
        this.selectedDay = date;
        this.renderCalendar();
        
        const dayOfYear = this.getDayOfYear(date);
        
        // Dispatch selection event
        const event = new CustomEvent('calendar:daySelected', {
            detail: {
                date: date,
                dayOfYear: dayOfYear,
                month: date.getMonth(),
                year: date.getFullYear()
            }
        });
        
        window.dispatchEvent(event);
        
        // Hide overlay after selection
        setTimeout(() => this.hide(), 300);
        
        Logger.info('calendar_overlay_selected', `Day ${dayOfYear} selected`);
    }

    /**
     * Navigate to previous month
     */
    previousMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else {
            this.currentMonth--;
        }
        
        this.monthSelector.value = this.currentMonth;
        this.yearSelector.value = this.currentYear;
        this.renderCalendar();
    }

    /**
     * Navigate to next month
     */
    nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else {
            this.currentMonth++;
        }
        
        this.monthSelector.value = this.currentMonth;
        this.yearSelector.value = this.currentYear;
        this.renderCalendar();
    }

    /**
     * Show the calendar overlay
     */
    show() {
        this.isVisible = true;
        this.overlay.classList.add('visible');
        
        // Focus management
        this.overlay.setAttribute('aria-hidden', 'false');
        this.closeButton.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        Logger.info('calendar_overlay_shown', 'Calendar overlay displayed');
    }

    /**
     * Hide the calendar overlay
     */
    hide() {
        this.isVisible = false;
        this.overlay.classList.remove('visible');
        
        // Focus management
        this.overlay.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        Logger.info('calendar_overlay_hidden', 'Calendar overlay hidden');
    }

    /**
     * Toggle calendar visibility
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Get calendar status
     */
    getStatus() {
        return {
            isReady: this.isReady,
            isVisible: this.isVisible,
            currentMonth: this.currentMonth,
            currentYear: this.currentYear,
            selectedDay: this.selectedDay ? {
                date: this.selectedDay.toISOString(),
                dayOfYear: this.getDayOfYear(this.selectedDay)
            } : null
        };
    }

    /**
     * Shutdown the calendar overlay
     */
    async shutdown() {
        Logger.info('calendar_overlay_shutdown', 'Shutting down calendar overlay');
        
        // Hide if visible
        if (this.isVisible) {
            this.hide();
        }
        
        // Remove event listeners
        this.eventListeners.forEach((element, type) => {
            if (element && element.removeEventListener) {
                // Remove specific listeners based on type
                switch (type) {
                    case 'monthSelector':
                        element.removeEventListener('change', () => this.renderCalendar());
                        break;
                    case 'yearSelector':
                        element.removeEventListener('change', () => this.renderCalendar());
                        break;
                    case 'prevBtn':
                        element.removeEventListener('click', () => this.previousMonth());
                        break;
                    case 'nextBtn':
                        element.removeEventListener('click', () => this.nextMonth());
                        break;
                    case 'closeBtn':
                        element.removeEventListener('click', () => this.hide());
                        break;
                    case 'overlay':
                        element.removeEventListener('click', (e) => {
                            if (e.target === this.overlay) this.hide();
                        });
                        break;
                }
            }
        });
        
        // Remove from DOM
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        
        this.isReady = false;
        Logger.info('calendar_overlay_shutdown_complete', 'Calendar overlay shutdown complete');
    }
} 