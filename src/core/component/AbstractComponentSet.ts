import AbstractComponentBase from './AbstractComponentBase';
import AbstractView from '../view/AbstractView';
import MidiControl from '../midi/MidiControl';
import MidiMessage from '../midi/MidiMessage';


abstract class ComponentSet extends AbstractComponentBase {
    private _componentMap: { midiControls: MidiControl[], components: AbstractComponentBase[] } = {
        midiControls: [], components: [],
    };

    abstract createComponent(index): AbstractComponentBase;

    getSubComponent(midiControl: MidiControl): AbstractComponentBase {
        return this._componentMap.components[this._componentMap.midiControls.indexOf(midiControl)];
    }

    register(midiControls: MidiControl[], view: AbstractView) {
        super.register(midiControls, view);

        for (let i = 0; i < midiControls.length; i++) {
            let midiControl = midiControls[i];
            // create/add component
            let component: AbstractComponentBase = this.createComponent.apply(this, [i]);
            component.parent = this.constructor as typeof AbstractComponentBase;
            this._componentMap.midiControls.push(midiControl);
            this._componentMap.components.push(component);
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
        this.getSubComponent(midiControl).renderMidiControl(midiControl);
    }

    onMidi(midiControl: MidiControl, midi: MidiMessage) {
        // pass on midi to corresponding midiControl
        this.getSubComponent(midiControl).onMidi(midiControl, midi);
    }
}


export default AbstractComponentBase;
