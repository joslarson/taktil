import host from './host';
import document from './document';


export type Level = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export class Logger {
    private _levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    private _level: Level = 'DEBUG';
    private _levelSetting;
    private _filter = '';
    private _filterSetting;

    constructor() {
        document.on('init', () => {
            this._levelSetting = host.getPreferences().getEnumSetting(
                'Log Level', 'Development', this._levels, this._level
            );
            
            this._levelSetting.addValueObserver(level => this._level = level);

            this._filterSetting = host.getPreferences().getStringSetting('Log filter (Regex)', 'Development', 1000, this._filter);
            this._filterSetting.addValueObserver(value => {
                this._filter = value;
                if (value) {
                    const message = ` Log filter regex set to \\${value}\\gi `;
                    console.log(`╭───┬${'─'.repeat(message.length)}╮`);
                    console.log(`│ i │${message}│`);
                    console.log(`╰───┴${'─'.repeat(message.length)}╯`);
                }
            });
        });
    }

    setLevel(level: Level) {
        if (this._levelSetting !== undefined) {
            this._levelSetting.set(level);
        } else {
            this._level = level;
        }
    }

    setFilter(value) {
        if (this._filterSetting !== undefined) {
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
        if (this._filter) {
            const re = new RegExp(this._filter, 'gi');
            if (!re.test(message)) return;
        }
        level === 'ERROR' ? console.error(message) : console.log(message);
    }
}

const logger = new Logger();


export default logger;