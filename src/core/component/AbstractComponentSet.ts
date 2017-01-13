import AbstractComponentBase from './AbstractComponentBase';
import AbstractView from '../view/AbstractView';
import MidiControl from '../midi/MidiControl';
import MidiMessage from '../midi/MidiMessage';


abstract class ComponentSet extends AbstractComponentBase {
    componentMap: { [key: string]: AbstractComponentBase } = {};
    createComponent: (index) => AbstractComponentBase;

    register(midiControls: MidiControl[], view: AbstractView) {
        super.register(midiControls, view);

        for (let i = 0; i < midiControls.length; i++) {
            let midiControl = midiControls[i];
            // create/add component
            let component: AbstractComponentBase = this.createComponent.apply(this, [i]);
            component.parent = this.constructor as typeof AbstractComponentBase;
            this.componentMap[midiControl.id] = component;
            // register component
            component.register([midiControl], view);
        }
    }

    setCreateComponentCallback(callback: (index) => AbstractComponentBase) {
        this.createComponent = callback;
        return this;
    }

    renderMidiControl(midiControl: MidiControl) {
        // pass on state to corresponding midiControl
        this.componentMap[midiControl.id].renderMidiControl(midiControl);
    }

    onMidi(midiControl: MidiControl, midi: MidiMessage) {
        // pass on midi to corresponding midiControl
        this.componentMap[midiControl.id].onMidi(midiControl, midi);
    }
}


export default AbstractComponentBase;
