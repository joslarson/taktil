export type Level = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

/**
 * Simple logger implementation including integration with the Bitwig
 * API's preferences system for setting log level, log filtering via
 * regular expressions, and Midi I/O filtering.
 */
export default class Logger {
    private _levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    private _level: Level = 'DEBUG';
    private _midiLevel: 'Input' | 'Output' | 'Both' | 'None';
    private _levelSetting: API.SettableEnumValue;
    private _filter = '';
    private _filterSetting: API.SettableEnumValue;
    private _initQueue: [Level | null, any[]][] = [];

    constructor() {
        session.on('init', () => {
            host
                .getPreferences()
                .getEnumSetting(
                    'Log Midi',
                    'Development',
                    ['None', 'Input', 'Output', 'Both'],
                    'None',
                )
                .addValueObserver(midiLevel => (this._midiLevel = midiLevel));

            this._levelSetting = host
                .getPreferences()
                .getEnumSetting('Log Level', 'Development', this._levels, this._level);

            this._levelSetting.addValueObserver(level => (this._level = level));

            this._filterSetting = host
                .getPreferences()
                .getStringSetting('Log filter (Regex)', 'Development', 1000, this._filter);
            this._filterSetting.addValueObserver(value => {
                this._filter = value;
                if (value) {
                    const message = ` Log filter regex set to \\${value}\\gi `;
                    this.log(`╭───┬${'─'.repeat(message.length)}╮`);
                    this.log(`│ i │${message}` + '│');
                    this.log(`╰───┴${'─'.repeat(message.length)}╯`);
                }
            });

            while (this._initQueue.length > 0) {
                const [level, messages] = this._initQueue.shift() as [Level | null, any[]];
                this._log(level, ...messages);
            }
        });
    }

    set level(level: Level) {
        if (this._levelSetting !== undefined) {
            this._levelSetting.set(level);
        } else {
            this._level = level;
        }
    }

    get level() {
        return this._level;
    }

    set filter(value) {
        if (this._filterSetting !== undefined) {
            this._filterSetting.set(value);
        } else {
            this._filter = value;
        }
    }

    get filter() {
        return this._filter;
    }

    log(...messages: any[]) {
        this._log(null, ...messages);
    }

    error(...messages: any[]) {
        this._log('ERROR', ...messages);
    }

    warn(...messages: any[]) {
        this._log('WARN', ...messages);
    }

    info(...messages: any[]) {
        this._log('INFO', ...messages);
    }

    debug(...messages: any[]) {
        this._log('DEBUG', ...messages);
    }

    private _log(level: Level | null, ...messages: any[]) {
        if (!this._levelSetting) {
            this._initQueue.push([level, messages]);
            return;
        }

        if (level && this._levels.indexOf(level) > this._levels.indexOf(this._level)) return;

        const message = `${level ? `[${level.toUpperCase()}] ` : ''}${messages.join(' ')}`;
        if (this._filter) {
            const re = new RegExp(this._filter, 'gi');
            if (!re.test(message)) return;
        }

        const isMidiInput = new RegExp('^\\[(MIDI|SYSEX)\\] ? IN', 'gi').test(message);
        const isMidiOutput = new RegExp('^\\[(MIDI|SYSEX)\\] ? OUT', 'gi').test(message);

        if (this._midiLevel === 'None' && (isMidiInput || isMidiOutput)) return;
        if (this._midiLevel === 'Input' && isMidiOutput) return;
        if (this._midiLevel === 'Output' && isMidiInput) return;

        level === 'ERROR' ? host.errorln(message) : host.println(message);
    }
}
