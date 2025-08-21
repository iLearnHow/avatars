/**
 * Logger - Comprehensive Logging System
 * Centralized logging with multiple levels and output formats
 * @author iLearnHow
 * @version 1.0.0
 */

/**
 * Log Levels
 */
export const LogLevel = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
    TRACE: 4
};

/**
 * Log Level Names
 */
export const LogLevelNames = {
    [LogLevel.ERROR]: 'ERROR',
    [LogLevel.WARN]: 'WARN',
    [LogLevel.INFO]: 'INFO',
    [LogLevel.DEBUG]: 'DEBUG',
    [LogLevel.TRACE]: 'TRACE'
};

/**
 * Logger Class
 * Provides centralized logging functionality
 */
export class Logger {
    constructor(name, options = {}) {
        this.name = name;
        this.level = options.level || LogLevel.INFO;
        this.enabled = options.enabled !== false;
        this.timestamp = options.timestamp !== false;
        this.colors = options.colors !== false;
        this.maxLogs = options.maxLogs || 1000;
        this.logs = [];
        
        // Color codes for console output
        this.colors = {
            [LogLevel.ERROR]: '\x1b[31m', // Red
            [LogLevel.WARN]: '\x1b[33m',  // Yellow
            [LogLevel.INFO]: '\x1b[36m',  // Cyan
            [LogLevel.DEBUG]: '\x1b[35m', // Magenta
            [LogLevel.TRACE]: '\x1b[37m', // White
            reset: '\x1b[0m'
        };
    }

    /**
     * Log an error message
     * @param {string} message - Error message
     * @param {...any} args - Additional arguments
     */
    error(message, ...args) {
        this.log(LogLevel.ERROR, message, ...args);
    }

    /**
     * Log a warning message
     * @param {string} message - Warning message
     * @param {...any} args - Additional arguments
     */
    warn(message, ...args) {
        this.log(LogLevel.WARN, message, ...args);
    }

    /**
     * Log an info message
     * @param {string} message - Info message
     * @param {...any} args - Additional arguments
     */
    info(message, ...args) {
        this.log(LogLevel.INFO, message, ...args);
    }

    /**
     * Log a debug message
     * @param {string} message - Debug message
     * @param {...any} args - Additional arguments
     */
    debug(message, ...args) {
        this.log(LogLevel.DEBUG, message, ...args);
    }

    /**
     * Log a trace message
     * @param {string} message - Trace message
     * @param {...any} args - Additional arguments
     */
    trace(message, ...args) {
        this.log(LogLevel.TRACE, message, ...args);
    }

    /**
     * Log a message at the specified level
     * @param {number} level - Log level
     * @param {string} message - Log message
     * @param {...any} args - Additional arguments
     */
    log(level, message, ...args) {
        if (!this.enabled || level > this.level) {
            return;
        }

        const timestamp = this.timestamp ? new Date().toISOString() : '';
        const levelName = LogLevelNames[level];
        const logEntry = {
            timestamp,
            level,
            levelName,
            name: this.name,
            message,
            args,
            time: Date.now()
        };

        // Store log entry
        this.storeLog(logEntry);

        // Output to console
        this.outputToConsole(logEntry);
    }

    /**
     * Store log entry
     * @param {Object} logEntry - Log entry object
     */
    storeLog(logEntry) {
        this.logs.push(logEntry);
        
        // Keep only recent logs
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
    }

    /**
     * Output log entry to console
     * @param {Object} logEntry - Log entry object
     */
    outputToConsole(logEntry) {
        const { timestamp, levelName, name, message, args } = logEntry;
        
        let output = '';
        
        if (this.colors) {
            const color = this.colors[logEntry.level];
            const reset = this.colors.reset;
            
            if (timestamp) {
                output += `${color}[${timestamp}]${reset} `;
            }
            output += `${color}[${levelName}]${reset} `;
            output += `${color}[${name}]${reset} `;
            output += `${color}${message}${reset}`;
        } else {
            if (timestamp) {
                output += `[${timestamp}] `;
            }
            output += `[${levelName}] `;
            output += `[${name}] `;
            output += message;
        }
        
        // Use appropriate console method based on level
        switch (logEntry.level) {
            case LogLevel.ERROR:
                console.error(output, ...args);
                break;
            case LogLevel.WARN:
                console.warn(output, ...args);
                break;
            case LogLevel.INFO:
                console.info(output, ...args);
                break;
            case LogLevel.DEBUG:
                console.debug(output, ...args);
                break;
            case LogLevel.TRACE:
                console.trace(output, ...args);
                break;
            default:
                console.log(output, ...args);
        }
    }

    /**
     * Set log level
     * @param {number} level - New log level
     */
    setLevel(level) {
        this.level = level;
    }

    /**
     * Enable/disable logging
     * @param {boolean} enabled - Whether to enable logging
     */
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Get recent logs
     * @param {number} count - Number of logs to return
     * @param {number} level - Minimum log level
     * @returns {Array} Recent logs
     */
    getRecentLogs(count = 10, level = LogLevel.ERROR) {
        return this.logs
            .filter(log => log.level >= level)
            .slice(-count);
    }

    /**
     * Get logs by level
     * @param {number} level - Log level
     * @returns {Array} Logs at specified level
     */
    getLogsByLevel(level) {
        return this.logs.filter(log => log.level === level);
    }

    /**
     * Get log statistics
     * @returns {Object} Log statistics
     */
    getLogStats() {
        const stats = {
            total: this.logs.length,
            byLevel: {}
        };
        
        Object.values(LogLevel).forEach(level => {
            if (typeof level === 'number') {
                stats.byLevel[LogLevelNames[level]] = this.getLogsByLevel(level).length;
            }
        });
        
        return stats;
    }

    /**
     * Clear logs
     */
    clearLogs() {
        this.logs = [];
    }

    /**
     * Export logs
     * @param {Object} options - Export options
     * @returns {Object} Exported logs
     */
    exportLogs(options = {}) {
        const { format = 'json', level = LogLevel.ERROR, count } = options;
        
        let logs = this.logs.filter(log => log.level >= level);
        
        if (count) {
            logs = logs.slice(-count);
        }
        
        switch (format) {
            case 'json':
                return {
                    name: this.name,
                    timestamp: Date.now(),
                    logs: logs.map(log => ({
                        timestamp: log.timestamp,
                        level: log.levelName,
                        name: log.name,
                        message: log.message,
                        args: log.args
                    }))
                };
            case 'text':
                return logs.map(log => 
                    `[${log.timestamp}] [${log.levelName}] [${log.name}] ${log.message}`
                ).join('\n');
            default:
                return logs;
        }
    }

    /**
     * Create a child logger
     * @param {string} childName - Child logger name
     * @param {Object} options - Logger options
     * @returns {Logger} Child logger
     */
    createChild(childName, options = {}) {
        const fullName = `${this.name}:${childName}`;
        return new Logger(fullName, {
            level: this.level,
            enabled: this.enabled,
            timestamp: this.timestamp,
            colors: this.colors,
            ...options
        });
    }
}

/**
 * Global Logger Manager
 * Manages multiple loggers across the application
 */
export class LoggerManager {
    constructor() {
        this.loggers = new Map();
        this.defaultOptions = {
            level: LogLevel.INFO,
            enabled: true,
            timestamp: true,
            colors: true
        };
    }

    /**
     * Get or create a logger
     * @param {string} name - Logger name
     * @param {Object} options - Logger options
     * @returns {Logger} Logger instance
     */
    getLogger(name, options = {}) {
        if (!this.loggers.has(name)) {
            const loggerOptions = { ...this.defaultOptions, ...options };
            this.loggers.set(name, new Logger(name, loggerOptions));
        }
        return this.loggers.get(name);
    }

    /**
     * Set default options for new loggers
     * @param {Object} options - Default options
     */
    setDefaultOptions(options) {
        this.defaultOptions = { ...this.defaultOptions, ...options };
    }

    /**
     * Set log level for all loggers
     * @param {number} level - Log level
     */
    setGlobalLevel(level) {
        this.loggers.forEach(logger => logger.setLevel(level));
    }

    /**
     * Enable/disable all loggers
     * @param {boolean} enabled - Whether to enable logging
     */
    setGlobalEnabled(enabled) {
        this.loggers.forEach(logger => logger.setEnabled(enabled));
    }

    /**
     * Get all loggers
     * @returns {Map} All loggers
     */
    getAllLoggers() {
        return this.loggers;
    }

    /**
     * Get logger statistics
     * @returns {Object} Logger statistics
     */
    getStats() {
        const stats = {
            totalLoggers: this.loggers.size,
            loggers: {}
        };
        
        this.loggers.forEach((logger, name) => {
            stats.loggers[name] = logger.getLogStats();
        });
        
        return stats;
    }

    /**
     * Export all logs
     * @param {Object} options - Export options
     * @returns {Object} All exported logs
     */
    exportAllLogs(options = {}) {
        const exportData = {
            timestamp: Date.now(),
            loggers: {}
        };
        
        this.loggers.forEach((logger, name) => {
            exportData.loggers[name] = logger.exportLogs(options);
        });
        
        return exportData;
    }

    /**
     * Clear all logs
     */
    clearAllLogs() {
        this.loggers.forEach(logger => logger.clearLogs());
    }
}

/**
 * Performance Logger
 * Specialized logger for performance metrics
 */
export class PerformanceLogger extends Logger {
    constructor(name, options = {}) {
        super(name, { ...options, level: LogLevel.DEBUG });
        this.metrics = new Map();
    }

    /**
     * Log performance metric
     * @param {string} operation - Operation name
     * @param {number} duration - Duration in milliseconds
     * @param {Object} metadata - Additional metadata
     */
    logMetric(operation, duration, metadata = {}) {
        const metric = {
            operation,
            duration,
            timestamp: Date.now(),
            metadata
        };
        
        this.metrics.set(operation, metric);
        
        this.debug(`Performance: ${operation} took ${duration.toFixed(2)}ms`, metadata);
    }

    /**
     * Get performance metrics
     * @returns {Object} Performance metrics
     */
    getMetrics() {
        return Object.fromEntries(this.metrics);
    }

    /**
     * Get average performance for operation
     * @param {string} operation - Operation name
     * @returns {number} Average duration
     */
    getAverageMetric(operation) {
        const metric = this.metrics.get(operation);
        return metric ? metric.duration : 0;
    }
}

/**
 * Logger Utility Functions
 */

/**
 * Create a logger with default settings
 * @param {string} name - Logger name
 * @returns {Logger} Logger instance
 */
export function createLogger(name) {
    return new Logger(name);
}

/**
 * Create a performance logger
 * @param {string} name - Logger name
 * @returns {PerformanceLogger} Performance logger instance
 */
export function createPerformanceLogger(name) {
    return new PerformanceLogger(name);
}

/**
 * Format log message with placeholders
 * @param {string} template - Message template
 * @param {...any} args - Arguments to substitute
 * @returns {string} Formatted message
 */
export function formatLogMessage(template, ...args) {
    return template.replace(/\{(\d+)\}/g, (match, index) => {
        return args[index] !== undefined ? args[index] : match;
    });
}

/**
 * Create a log decorator
 * @param {string} operationName - Operation name
 * @param {number} level - Log level
 * @returns {Function} Decorator function
 */
export function logDecorator(operationName, level = LogLevel.INFO) {
    return function(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const logger = new Logger(`${target.constructor.name}.${propertyKey}`);

        descriptor.value = async function(...args) {
            logger.log(level, `Starting ${operationName}`, { args });
            
            try {
                const result = await originalMethod.apply(this, args);
                logger.log(level, `Completed ${operationName}`, { result });
                return result;
            } catch (error) {
                logger.error(`Failed ${operationName}`, error);
                throw error;
            }
        };

        return descriptor;
    };
}

// Create global logger manager
export const globalLoggerManager = new LoggerManager();

// Create default logger
export const defaultLogger = globalLoggerManager.getLogger('Default'); 