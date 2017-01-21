import { session, host, MidiControl } from 'typewig';


export default {
    RESTART: new MidiControl('B11E??'),
    PLAY: new MidiControl('B06C??'),
    REC: new MidiControl('B120??'),
    SHIFT: new MidiControl('B121??'),
    PITCH_BEND:   new MidiControl({ msb: 'B4A1??', lsb: 'B4A2??' }),
};
