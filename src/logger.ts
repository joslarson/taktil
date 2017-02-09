import session from './session';


export type Level = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export class Logger {
    private _levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    private _level: Level = 'DEBUG';
    private _midiLevel: 'Input' | 'Output' | 'Both' | 'None';
    private _levelSetting;
    private _filter = '';
    private _filterSetting;
    private _initQueue = [];

    constructor() {
        session.on('init', () => {
            host.getPreferences().getEnumSetting(
                'Log Midi',
                'Development',
                ['None', 'Input', 'Output', 'Both'],
                'None'
            ).addValueObserver(midiLevel => this._midiLevel = midiLevel);

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
                    console.log(`│ i │${message}` +               '│');
                    console.log(`╰───┴${'─'.repeat(message.length)}╯`);
                }
            });

            while (this._initQueue.length > 0) {
                const [level, messages] = this._initQueue.shift();
                this._log(level, ...messages);
            }
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

    log(...messages) {
        this.info(...messages);
    }

    debug(...messages) {
        this._log('DEBUG', ...messages);
    }

    private _log(level, ...messages) {
        if (!this._levelSetting) {
            this._initQueue.push([level, messages]);
            return;
        }

        if (this._levels.indexOf(level) > this._levels.indexOf(this._level)) return;

        const message = `[${level.toUpperCase()}] ${messages.join(' ')}`;
        if (this._filter) {
            const re = new RegExp(this._filter, 'gi');
            if (!re.test(message)) return;
        }

        const isMidiInput = new RegExp('IN  [0-9]+ \=\=\> [A-Z0-9]{6}', 'gi').test(message);
        const isMidiOutput = new RegExp('OUT [0-9]+ \<\=\=\ [A-Z0-9]{6}', 'gi').test(message);

        if (this._midiLevel === 'None' && (isMidiInput || isMidiOutput)) return;
        if (this._midiLevel === 'Input' && isMidiOutput) return;
        if (this._midiLevel === 'Output' && isMidiInput) return;

        level === 'ERROR' ? console.error(message) : console.log(message);
    }
}

const logger = new Logger();


export default logger;