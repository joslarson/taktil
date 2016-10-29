export type Level = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

declare const host;

export class Logger {
    private _levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    level: Level = 'INFO';

    constructor(level: Level = 'DEBUG') {
        this.level = level;
    }

    error(...messages) {
        this._log('ERROR', ...messages);
    }

    warn(...messages) {
        this._log('WARN', ...messages);
    }

    info(...messages) {
        this._log('INFO', ...messages);
    }

    debug(...messages) {
        this._log('DEBUG', ...messages);
    }

    private _log(level, ...messages) {
        try {
            this.level = host.getPreferences().getEnumSetting('Log Level', 'Development', ['ERROR', 'WARN', 'INFO', 'DEBUG'], this.level);
        } catch (e) {
            // pass
        }
        if (this._levels.indexOf(level) > this._levels.indexOf(this.level)) return;
        const message = `[${level.toUpperCase()}] ${messages.join(' ')}`;
        level === 'ERROR' ? console.error(message) : console.log(message);  // eslint-disable-line no-console
    }
}

const logger = new Logger();


export default logger;