const { APP_PREFIX, LOG_LEVEL } = process.env;
const internalLogger = console; //POSSIBLE CHANGE TO ANOTHER IMPLEMENTATION

const LOG_LEVEL_INFO = "INFO";
const LOG_LEVEL_DEBUG = "DEBUG";

let log_level = LOG_LEVEL;
log_level ||= LOG_LEVEL_INFO;
log_level = log_level.toUpperCase();

module.exports = () => {
    // Colors as seen on: https://gist.github.com/abritinthebay/d80eb99b2726c83feb0d97eab95206c4
    const cyan = '\x1b[36m%s\x1b[0m';
    const yellow = '\x1b[33m%s\x1b[0m';
    const red = '\x1b[31m%s\x1b[0m';
    const lightgray = '\x1b[37m%s\x1b[0m';

    const prefix = () => `  ${APP_PREFIX}:(${new Date().toISOString()}):`;

    const info = (...args) => {
        internalLogger.info(cyan, prefix(), ...args);
    };

    const warn = (...args) => {
        internalLogger.warn(yellow, prefix(), ...args);
    };

    const error = (...args) => {
        internalLogger.error(red, prefix(), ...args);
    };

    const debug = (...args) => {
        internalLogger.debug(lightgray, prefix(), ...args);
    };

    const dbLog = (message, ...args) => {
        // Database Log is expensive for run in "normal fly"
        // if (log_level === LOG_LEVEL_DEBUG) {
            internalLogger.info(message, ...args);
        // }
    }

    return {
        info,
        warn,
        error,
        debug,
        dbLog
    };
};