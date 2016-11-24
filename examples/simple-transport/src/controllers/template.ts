import { Template } from 'typewig';


let template: Template = {
    midiInIndex: 0,  // int or null
    midiOutIndex: 0,  // int or null
    noteInput: [
        'Keys',
        '85????',
        '95????',
        'A5????',
        'B540??',
        'D5????',
        'E5????',
    ],
    shouldConsumeEvents: false,
    controls: {
        RESTART: { status: 0xB4, data1: 21, data2: 0 },
        PLAY:    { status: 0xB4, data1: 25, data2: 0 },
        REC:     { status: 0xB4, data1: 26, data2: 0 },
        SHIFT:   { status: 0xB4, data1: 24, data2: 0 },
    },
};

export default template;
