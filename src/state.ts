import Bitwig from './core/bitwig/Bitwig';
import AbstractDevice from './core/AbstractDevice';
import View from './core/View';


export class State {
    bitwig: Bitwig;
    device: AbstractDevice;
    midiIn: api.MidiIn;
    midiOut: api.MidiOut;
    padNotes;
    padMIDITable;
    view: View;
    views: { [key: string]: View; } = {};

    constructor () {
        log('new state!')
    }
}

let state: State;

(function () {
    if (!state) {
        state = new State();
        global.state = state;
    }
    return state;
})();

export default state;
