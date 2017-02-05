import { session, host, SimpleMidiControl, MidiMessage, SysexMessage } from 'typewig';

import { rgb2hsb, rgb2hsv } from './utils';


class MaschineButton extends SimpleMidiControl {
    cacheOnMidiIn = false;
}

class MaschineKnob extends SimpleMidiControl {
    cacheOnMidiIn = true;
}


class MaschinePanKnob extends MaschineKnob {
    defaultState = { ...this.defaultState, value: 65 };
}


class MaschineColorButton extends MaschineButton {
    defaultState = { ...this.defaultState, color: { r: 0.80, g: 1, b: 0.4 } };  // warm to match default buttons
    constructor({ port, inPort, outPort, status, data1 }: {
        port?: number, inPort?: number, outPort?: number, status: number, data1: number
    }) {
        super({ port, inPort, outPort, status, data1 });
        const hueStatus = (this.status & 0xF0).toString(16).toUpperCase();
        const saturationStatus = ((this.status & 0xF0) + 1).toString(16).toUpperCase();
        const brightnessStatus = ((this.status & 0xF0) + 2).toString(16).toUpperCase();
        const data1Hex = this.data1.toString(16).toUpperCase();
        this.patterns = [...this.patterns, `${hueStatus}${data1Hex}??`, `${saturationStatus}${data1Hex}??`, `${brightnessStatus}${data1Hex}??`];
    }

    getRenderMessages({ value, color }: { value: number, color?: { r: number, g: number, b: number } }): (MidiMessage | SysexMessage)[] {
        const hsb = rgb2hsv(color);
        return [
            ...super.getRenderMessages({ value, color }),
            new MidiMessage({ status: (this.status & 0xF0), data1: this.data1, data2: hsb.h }),
            new MidiMessage({ status: (this.status & 0xF0) + 1, data1: this.data1, data2: hsb.s }),
            new MidiMessage({ status: (this.status & 0xF0) + 2, data1: this.data1, data2: value === 0 ? 20 : 127 }),
        ];
    }
}


export default {
    // TOP LEFT

    CHANNEL:  new MaschineButton({ status: 0xB0, data1: 0x15 }),
    PLUGIN:   new MaschineButton({ status: 0xB0, data1: 0x16 }),
    ARRANGE:  new MaschineButton({ status: 0xB0, data1: 0x17 }),
    MIX:      new MaschineButton({ status: 0xB0, data1: 0x18 }),
    BROWSE:   new MaschineButton({ status: 0xB0, data1: 0x19 }),
    SAMPLING: new MaschineButton({ status: 0xB0, data1: 0x1A }),
    ALL:      new MaschineButton({ status: 0xB0, data1: 0x1B }),
    AUTO:     new MaschineButton({ status: 0xB0, data1: 0x1C }),
    FS1:      new MaschineButton({ status: 0xB0, data1: 0x1D }),
    FS2:      new MaschineButton({ status: 0xB0, data1: 0x1E }),


    // METERS

    IN1:  new MaschineButton({ status: 0xB1, data1: 0x15 }),
    IN2:  new MaschineButton({ status: 0xB1, data1: 0x16 }),
    IN3:  new MaschineButton({ status: 0xB1, data1: 0x17 }),
    IN4:  new MaschineButton({ status: 0xB1, data1: 0x18 }),
    MST:  new MaschineButton({ status: 0xB1, data1: 0x19 }),
    GRP:  new MaschineButton({ status: 0xB1, data1: 0x1A }),
    SND:  new MaschineButton({ status: 0xB1, data1: 0x1B }),
    CUE:  new MaschineButton({ status: 0xB1, data1: 0x1C }),
    KNOB: new MaschineButton({ status: 0xB1, data1: 0x1D }),


    // PERFORMANCE

    TAP:         new MaschineButton({ status: 0xB2, data1: 0x15 }),
    STEP_MODE:   new MaschineButton({ status: 0xB2, data1: 0x16 }),
    MACRO:       new MaschineButton({ status: 0xB2, data1: 0x17 }),
    NOTE_REPEAT: new MaschineButton({ status: 0xB2, data1: 0x18 }),


    // GROUPS

    GROUP_A: new MaschineColorButton({ status: 0xB3, data1: 0x66 }),
    GROUP_B: new MaschineColorButton({ status: 0xB3, data1: 0x67 }),
    GROUP_C: new MaschineColorButton({ status: 0xB3, data1: 0x68 }),
    GROUP_D: new MaschineColorButton({ status: 0xB3, data1: 0x69 }),
    GROUP_E: new MaschineColorButton({ status: 0xB3, data1: 0x6A }),
    GROUP_F: new MaschineColorButton({ status: 0xB3, data1: 0x6B }),
    GROUP_G: new MaschineColorButton({ status: 0xB3, data1: 0x6C }),
    GROUP_H: new MaschineColorButton({ status: 0xB3, data1: 0x6D }),


    // TRANSPORT

    RESTART: new MaschineButton({ status: 0xB4, data1: 0x15 }),
    METRO:   new MaschineButton({ status: 0xB4, data1: 0x16 }),
    EVENTS:  new MaschineButton({ status: 0xB4, data1: 0x17 }),
    GRID:    new MaschineButton({ status: 0xB4, data1: 0x18 }),
    PLAY:    new MaschineButton({ status: 0xB4, data1: 0x19 }),
    REC:     new MaschineButton({ status: 0xB4, data1: 0x1A }),
    ERASE:   new MaschineButton({ status: 0xB4, data1: 0x1B }),


    // MIDDLE

    SCENE:     new MaschineButton({ status: 0xB5, data1: 0x15 }),
    PATTERN:   new MaschineButton({ status: 0xB5, data1: 0x16 }),
    PAD_MODE:  new MaschineButton({ status: 0xB5, data1: 0x17 }),
    NAVIGATE:  new MaschineButton({ status: 0xB5, data1: 0x18 }),
    DUPLICATE: new MaschineButton({ status: 0xB5, data1: 0x19 }),
    SELECT:    new MaschineButton({ status: 0xB5, data1: 0x1A }),
    SOLO:      new MaschineButton({ status: 0xB5, data1: 0x1B }),
    MUTE:      new MaschineButton({ status: 0xB5, data1: 0x1C }),


    // PADS

    PAD_1:  new MaschineColorButton({ status: 0x95, data1: 0x24 }),
    PAD_2:  new MaschineColorButton({ status: 0x95, data1: 0x25 }),
    PAD_3:  new MaschineColorButton({ status: 0x95, data1: 0x26 }),
    PAD_4:  new MaschineColorButton({ status: 0x95, data1: 0x27 }),
    PAD_5:  new MaschineColorButton({ status: 0x95, data1: 0x28 }),
    PAD_6:  new MaschineColorButton({ status: 0x95, data1: 0x29 }),
    PAD_7:  new MaschineColorButton({ status: 0x95, data1: 0x2A }),
    PAD_8:  new MaschineColorButton({ status: 0x95, data1: 0x2B }),
    PAD_9:  new MaschineColorButton({ status: 0x95, data1: 0x2C }),
    PAD_10: new MaschineColorButton({ status: 0x95, data1: 0x2D }),
    PAD_11: new MaschineColorButton({ status: 0x95, data1: 0x2E }),
    PAD_12: new MaschineColorButton({ status: 0x95, data1: 0x2F }),
    PAD_13: new MaschineColorButton({ status: 0x95, data1: 0x30 }),
    PAD_14: new MaschineColorButton({ status: 0x95, data1: 0x31 }),
    PAD_15: new MaschineColorButton({ status: 0x95, data1: 0x32 }),
    PAD_16: new MaschineColorButton({ status: 0x95, data1: 0x33 }),


    // EDIT

    COPY:        new MaschineButton({ status: 0xB6, data1: 0x15 }),
    PASTE:       new MaschineButton({ status: 0xB6, data1: 0x16 }),
    NOTE:        new MaschineButton({ status: 0xB6, data1: 0x17 }),
    NUDGE:       new MaschineButton({ status: 0xB6, data1: 0x18 }),
    UNDO:        new MaschineButton({ status: 0xB6, data1: 0x19 }),
    REDO:        new MaschineButton({ status: 0xB6, data1: 0x1A }),
    QUANTIZE:    new MaschineButton({ status: 0xB6, data1: 0x1B }),
    CLEAR:       new MaschineButton({ status: 0xB6, data1: 0x1C }),
    JOG_DIAL:    new MaschineButton({ status: 0xB6, data1: 0x1D }),
    JOG_RING:    new MaschineButton({ status: 0xB6, data1: 0x1E }),
    BACK:        new MaschineButton({ status: 0xB6, data1: 0x66 }),
    LEFT_ARROW:  new MaschineButton({ status: 0xB6, data1: 0x67 }),
    RIGHT_ARROW: new MaschineButton({ status: 0xB6, data1: 0x68 }),
    ENTER:       new MaschineButton({ status: 0xB6, data1: 0x69 }),


    // SCREENS

    ARM_A: new MaschineButton({ status: 0xB7, data1: 0x15 }),
    ARM_B: new MaschineButton({ status: 0xB7, data1: 0x16 }),
    ARM_C: new MaschineButton({ status: 0xB7, data1: 0x17 }),
    ARM_D: new MaschineButton({ status: 0xB7, data1: 0x18 }),
    ARM_E: new MaschineButton({ status: 0xB7, data1: 0x19 }),
    ARM_F: new MaschineButton({ status: 0xB7, data1: 0x1A }),
    ARM_G: new MaschineButton({ status: 0xB7, data1: 0x1B }),
    ARM_H: new MaschineButton({ status: 0xB7, data1: 0x1C }),

    PREV_DEVICE:     new MaschineButton({ status: 0xB9, data1: 0x15 }),
    CHILD_DEVICE:    new MaschineButton({ status: 0xB9, data1: 0x16 }),
    PARENT_DEVICE:   new MaschineButton({ status: 0xB9, data1: 0x17 }),
    NEXT_DEVICE:     new MaschineButton({ status: 0xB9, data1: 0x18 }),
    PREV_PARAM_BANK: new MaschineButton({ status: 0xB9, data1: 0x19 }),
    NEXT_PARAM_BANK: new MaschineButton({ status: 0xB9, data1: 0x1C }),

    VOL_TOUCH_A: new MaschineButton({ status: 0xB7, data1: 0x66 }),
    VOL_TOUCH_B: new MaschineButton({ status: 0xB7, data1: 0x68 }),
    VOL_TOUCH_C: new MaschineButton({ status: 0xB7, data1: 0x6A }),
    VOL_TOUCH_D: new MaschineButton({ status: 0xB7, data1: 0x6C }),
    VOL_TOUCH_E: new MaschineButton({ status: 0xB7, data1: 0x6E }),
    VOL_TOUCH_F: new MaschineButton({ status: 0xB7, data1: 0x70 }),
    VOL_TOUCH_G: new MaschineButton({ status: 0xB7, data1: 0x72 }),
    VOL_TOUCH_H: new MaschineButton({ status: 0xB7, data1: 0x74 }),

    VOL_A: new MaschineKnob({ status: 0xB7, data1: 0x67 }),
    VOL_B: new MaschineKnob({ status: 0xB7, data1: 0x69 }),
    VOL_C: new MaschineKnob({ status: 0xB7, data1: 0x6B }),
    VOL_D: new MaschineKnob({ status: 0xB7, data1: 0x6D }),
    VOL_E: new MaschineKnob({ status: 0xB7, data1: 0x6F }),
    VOL_F: new MaschineKnob({ status: 0xB7, data1: 0x71 }),
    VOL_G: new MaschineKnob({ status: 0xB7, data1: 0x73 }),
    VOL_H: new MaschineKnob({ status: 0xB7, data1: 0x75 }),

    PAN_TOUCH_A: new MaschineButton({ status: 0xB8, data1: 0x66 }),
    PAN_TOUCH_B: new MaschineButton({ status: 0xB8, data1: 0x68 }),
    PAN_TOUCH_C: new MaschineButton({ status: 0xB8, data1: 0x6A }),
    PAN_TOUCH_D: new MaschineButton({ status: 0xB8, data1: 0x6C }),
    PAN_TOUCH_E: new MaschineButton({ status: 0xB8, data1: 0x6E }),
    PAN_TOUCH_F: new MaschineButton({ status: 0xB8, data1: 0x70 }),
    PAN_TOUCH_G: new MaschineButton({ status: 0xB8, data1: 0x72 }),
    PAN_TOUCH_H: new MaschineButton({ status: 0xB8, data1: 0x74 }),

    PAN_A: new MaschinePanKnob({ status: 0xB8, data1: 0x67 }),
    PAN_B: new MaschinePanKnob({ status: 0xB8, data1: 0x69 }),
    PAN_C: new MaschinePanKnob({ status: 0xB8, data1: 0x6B }),
    PAN_D: new MaschinePanKnob({ status: 0xB8, data1: 0x6D }),
    PAN_E: new MaschinePanKnob({ status: 0xB8, data1: 0x6F }),
    PAN_F: new MaschinePanKnob({ status: 0xB8, data1: 0x71 }),
    PAN_G: new MaschinePanKnob({ status: 0xB8, data1: 0x73 }),
    PAN_H: new MaschinePanKnob({ status: 0xB8, data1: 0x75 }),

    // MACRO_TOUCH_1: new MaschineButton({ status: 0xB0, data1: 0x66 }),
    // MACRO_TOUCH_2: new MaschineButton({ status: 0xB0, data1: 0x68 }),
    // MACRO_TOUCH_3: new MaschineButton({ status: 0xB0, data1: 0x6A }),
    // MACRO_TOUCH_4: new MaschineButton({ status: 0xB0, data1: 0x6C }),
    // MACRO_TOUCH_5: new MaschineButton({ status: 0xB0, data1: 0x6E }),
    // MACRO_TOUCH_6: new MaschineButton({ status: 0xB0, data1: 0x70 }),
    // MACRO_TOUCH_7: new MaschineButton({ status: 0xB0, data1: 0x72 }),
    // MACRO_TOUCH_8: new MaschineButton({ status: 0xB0, data1: 0x74 }),

    // MACRO_1: new MaschineButton({ status: 0xB0, data1: 0x67 }),
    // MACRO_2: new MaschineButton({ status: 0xB0, data1: 0x69 }),
    // MACRO_3: new MaschineButton({ status: 0xB0, data1: 0x6B }),
    // MACRO_4: new MaschineButton({ status: 0xB0, data1: 0x6D }),
    // MACRO_5: new MaschineButton({ status: 0xB0, data1: 0x6F }),
    // MACRO_6: new MaschineButton({ status: 0xB0, data1: 0x71 }),
    // MACRO_7: new MaschineButton({ status: 0xB0, data1: 0x73 }),
    // MACRO_8: new MaschineButton({ status: 0xB0, data1: 0x75 }),

    PARAM_TOUCH_1: new MaschineButton({ status: 0xBA, data1: 0x66 }),
    PARAM_TOUCH_2: new MaschineButton({ status: 0xBA, data1: 0x68 }),
    PARAM_TOUCH_3: new MaschineButton({ status: 0xBA, data1: 0x6A }),
    PARAM_TOUCH_4: new MaschineButton({ status: 0xBA, data1: 0x6C }),
    PARAM_TOUCH_5: new MaschineButton({ status: 0xBA, data1: 0x6E }),
    PARAM_TOUCH_6: new MaschineButton({ status: 0xBA, data1: 0x70 }),
    PARAM_TOUCH_7: new MaschineButton({ status: 0xBA, data1: 0x72 }),
    PARAM_TOUCH_8: new MaschineButton({ status: 0xBA, data1: 0x74 }),

    PARAM_1: new MaschineButton({ status: 0xBA, data1: 0x67 }),
    PARAM_2: new MaschineButton({ status: 0xBA, data1: 0x69 }),
    PARAM_3: new MaschineButton({ status: 0xBA, data1: 0x6B }),
    PARAM_4: new MaschineButton({ status: 0xBA, data1: 0x6D }),
    PARAM_5: new MaschineButton({ status: 0xBA, data1: 0x6F }),
    PARAM_6: new MaschineButton({ status: 0xBA, data1: 0x71 }),
    PARAM_7: new MaschineButton({ status: 0xBA, data1: 0x73 }),
    PARAM_8: new MaschineButton({ status: 0xBA, data1: 0x75 }),
};
