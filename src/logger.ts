import host from './host';
import document from './document';


export type Level = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export class Logger {
    private _levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    private _level: Level = 'INFO';
    private _levelSetting;
    private _filter = '';
    private _filterSetting;

    constructor() {
        document.on('init', () => {
            this._levelSetting = host.getPreferences().getEnumSetting(
                'Log Level', 'Development', this._levels, this._level
            );
            
            this._levelSetting.addValueObserver(level => this._level = level);

            this._filterSetting = host.getPreferences().getStringSetting('Log filter', 'Development', 0, this._filter);
            this._filterSetting.addValueObserver(value => this._filter = value);
        });
    }

    setLevel(level: Level) {
        if (this._levelSetting) {
            this._levelSetting.set(level);
        } else {
            this._level = level;
        }
    }

    setFilter(value) {
        if (this._filterSetting) {
            this._filterSetting.set(value);
        } else {
            this._filter = value;
        }
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
        if (this._levels.indexOf(level) > this._levels.indexOf(this._level)) return;
        const message = `[${level.toUpperCase()}] ${messages.join(' ')}`;
        level === 'ERROR' ? console.error(message) : console.log(message);
    }
}

const logger = new Logger();


export default logger;