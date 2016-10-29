export type Level = 'error' | 'warn' | 'success' | 'info' | 'debug';

declare const host;

export class Logger {
    private _levels = ['error', 'warn', 'success', 'info', 'debug'];
    level: Level = 'info';

    constructor(level: Level = 'info') {
        this.level = level;
    }

    error(...messages) {
        this._log('error', ...messages);
    }

    warn(...messages) {
        this._log('warn', ...messages);
    }

    success(...messages) {
        this._log('success', ...messages);
    }

    info(...messages) {
        this._log('info', ...messages);
    }

    debug(...messages) {
        this._log('debug', ...messages);
    }

    private _log(level, ...messages) {
        level = host.getPreferences().getEnumValue('Log Level', 'Development', ['error', 'warn', 'success', 'info', 'debug'], this.level);
        if (this._levels.indexOf(level) > this._levels.indexOf(this.level)) return;
        const message = `[${level.toUpperCase()}] ${messages.join(' ')}`;
        level === 'error' ? console.error(message) : console.log(message);  // eslint-disable-line no-console
    }
}

const logger = new Logger();


export default logger;