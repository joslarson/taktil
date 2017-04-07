import { AbstractSimpleControl, MidiMessage, SysexMessage, MidiPattern, Color, utils } from 'taktil';
import { rgb2hsv, SyncedInterval } from '../utils';


const colors = {
    playGreen: { r: 0.02, g: 1.00, b: 0.06 },  // matches machine play button color
    offWhite:  { r: 0.75, g: 1.00, b: 0.35 },  // warm to match default maschine buttons
};

interface MaschineColorButtonState {
    value: number;
    color: Color;
    disabled: boolean;
    flashing: boolean;
    flashOn: boolean;
}

export default class MaschineColorButton extends AbstractSimpleControl<MaschineColorButtonState> {
    // set the default state
    state: MaschineColorButtonState = { value: 0, color: colors.offWhite, disabled: false, flashing: false, flashOn: true };
    flashInterval: SyncedInterval;

    constructor({ port, inPort, outPort, status, data1 }: {
        port?: number, inPort?: number, outPort?: number, status: number, data1: number
    }) {
        super({ port, inPort, outPort, status, data1 });
        this.patterns = [
            ...this.patterns,
            new MidiPattern({ status: this.hueStatus, data1 }),
            new MidiPattern({ status: this.saturationStatus, data1 }),
            new MidiPattern({ status: this.brightnessStatus, data1 }),
        ];
    }

    get hueStatus() {
        return this.status & 0xF0;
    }

    get saturationStatus() {
        return this.hueStatus + 1;
    }

    get brightnessStatus() {
        return this.hueStatus + 2;
    }

    getOutput(): (MidiMessage | SysexMessage)[] {
        const doNotSaturate = utils.areDeepEqual(this.state.color, colors.offWhite);
        const hsb = rgb2hsv(this.state.color);
        const { status, data1 } = this;
        let brightnessData2 = !this.activeComponent || this.state.disabled ? 0 : (this.state.value === 0 ? 20 : 127);
        if (brightnessData2 === 127 && this.state.flashing) {
            brightnessData2 = this.state.flashOn ? 127 : 20;
        }
        return [
            ...super.getOutput(),
            new MidiMessage({ status: this.hueStatus, data1, data2: hsb.h }),
            new MidiMessage({
                status: this.saturationStatus, data1,
                data2: doNotSaturate ? hsb.s : (hsb.s === 0 ? 0 : 100 + Math.round((hsb.s / 127) * 27)) }),
            new MidiMessage({
                status: this.brightnessStatus, data1,
                data2: brightnessData2,
            }),
        ];
    }

    postRender() {
        if (this.state.value > 0 && this.state.flashing) {
            if (!this.flashInterval) {
                this.flashInterval = new SyncedInterval(isOddInterval => {
                    this.setState({ flashOn: isOddInterval });
                }, 1/2).start();
            }
        } else if (this.flashInterval) {
            this.flashInterval.cancel();
            delete this.flashInterval;
        }
    }
}