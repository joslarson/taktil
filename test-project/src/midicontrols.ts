import { session, host, SimpleMidiControl } from 'typewig';


class KnobControl extends SimpleMidiControl {
    cacheOnMidiIn = true;
}


export default {
    // TOP LEFT

    CHANNEL:  new SimpleMidiControl({ status: 0xB0, data1: 0x15 }),
    PLUGIN:   new SimpleMidiControl({ status: 0xB0, data1: 0x16 }),
    ARRANGE:  new SimpleMidiControl({ status: 0xB0, data1: 0x17 }),
    MIX:      new SimpleMidiControl({ status: 0xB0, data1: 0x18 }),
    BROWSE:   new SimpleMidiControl({ status: 0xB0, data1: 0x19 }),
    SAMPLING: new SimpleMidiControl({ status: 0xB0, data1: 0x1A }),
    ALL:      new SimpleMidiControl({ status: 0xB0, data1: 0x1B }),
    AUTO:     new SimpleMidiControl({ status: 0xB0, data1: 0x1C }),
    FS1:      new SimpleMidiControl({ status: 0xB0, data1: 0x1D }),
    FS2:      new SimpleMidiControl({ status: 0xB0, data1: 0x1E }),


    // METERS

    IN1:  new SimpleMidiControl({ status: 0xB1, data1: 0x15 }),
    IN2:  new SimpleMidiControl({ status: 0xB1, data1: 0x16 }),
    IN3:  new SimpleMidiControl({ status: 0xB1, data1: 0x17 }),
    IN4:  new SimpleMidiControl({ status: 0xB1, data1: 0x18 }),
    MST:  new SimpleMidiControl({ status: 0xB1, data1: 0x19 }),
    GRP:  new SimpleMidiControl({ status: 0xB1, data1: 0x1A }),
    SND:  new SimpleMidiControl({ status: 0xB1, data1: 0x1B }),
    CUE:  new SimpleMidiControl({ status: 0xB1, data1: 0x1C }),
    KNOB: new SimpleMidiControl({ status: 0xB1, data1: 0x1D }),


    // PERFORMANCE

    TAP:         new SimpleMidiControl({ status: 0xB2, data1: 0x15 }),
    STEP_MODE:   new SimpleMidiControl({ status: 0xB2, data1: 0x16 }),
    MACRO:       new SimpleMidiControl({ status: 0xB2, data1: 0x17 }),
    NOTE_REPEAT: new SimpleMidiControl({ status: 0xB2, data1: 0x18 }),


    // GROUPS

    GROUP_A: new SimpleMidiControl({ status: 0xB3, data1: 0x66 }),
    GROUP_B: new SimpleMidiControl({ status: 0xB3, data1: 0x67 }),
    GROUP_C: new SimpleMidiControl({ status: 0xB3, data1: 0x68 }),
    GROUP_D: new SimpleMidiControl({ status: 0xB3, data1: 0x69 }),
    GROUP_E: new SimpleMidiControl({ status: 0xB3, data1: 0x6A }),
    GROUP_F: new SimpleMidiControl({ status: 0xB3, data1: 0x6B }),
    GROUP_G: new SimpleMidiControl({ status: 0xB3, data1: 0x6C }),
    GROUP_H: new SimpleMidiControl({ status: 0xB3, data1: 0x6D }),


    // TRANSPORT

    RESTART: new SimpleMidiControl({ status: 0xB4, data1: 0x15 }),
    METRO:   new SimpleMidiControl({ status: 0xB4, data1: 0x16 }),
    EVENTS:  new SimpleMidiControl({ status: 0xB4, data1: 0x17 }),
    GRID:    new SimpleMidiControl({ status: 0xB4, data1: 0x18 }),
    PLAY:    new SimpleMidiControl({ status: 0xB4, data1: 0x19 }),
    REC:     new SimpleMidiControl({ status: 0xB4, data1: 0x1A }),
    ERASE:   new SimpleMidiControl({ status: 0xB4, data1: 0x1B }),


    // MIDDLE

    SCENE:     new SimpleMidiControl({ status: 0xB5, data1: 0x15 }),
    PATTERN:   new SimpleMidiControl({ status: 0xB5, data1: 0x16 }),
    PAD_MODE:  new SimpleMidiControl({ status: 0xB5, data1: 0x17 }),
    NAVIGATE:  new SimpleMidiControl({ status: 0xB5, data1: 0x18 }),
    DUPLICATE: new SimpleMidiControl({ status: 0xB5, data1: 0x19 }),
    SELECT:    new SimpleMidiControl({ status: 0xB5, data1: 0x1A }),
    SOLO:      new SimpleMidiControl({ status: 0xB5, data1: 0x1B }),
    MUTE:      new SimpleMidiControl({ status: 0xB5, data1: 0x1C }),


    // PADS

    PAD_1:  new SimpleMidiControl({ status: 0x95, data1: 0x24 }),
    PAD_2:  new SimpleMidiControl({ status: 0x95, data1: 0x25 }),
    PAD_3:  new SimpleMidiControl({ status: 0x95, data1: 0x26 }),
    PAD_4:  new SimpleMidiControl({ status: 0x95, data1: 0x27 }),
    PAD_5:  new SimpleMidiControl({ status: 0x95, data1: 0x28 }),
    PAD_6:  new SimpleMidiControl({ status: 0x95, data1: 0x29 }),
    PAD_7:  new SimpleMidiControl({ status: 0x95, data1: 0x2A }),
    PAD_8:  new SimpleMidiControl({ status: 0x95, data1: 0x2B }),
    PAD_9:  new SimpleMidiControl({ status: 0x95, data1: 0x2C }),
    PAD_10: new SimpleMidiControl({ status: 0x95, data1: 0x2D }),
    PAD_11: new SimpleMidiControl({ status: 0x95, data1: 0x2E }),
    PAD_12: new SimpleMidiControl({ status: 0x95, data1: 0x2F }),
    PAD_13: new SimpleMidiControl({ status: 0x95, data1: 0x30 }),
    PAD_14: new SimpleMidiControl({ status: 0x95, data1: 0x31 }),
    PAD_15: new SimpleMidiControl({ status: 0x95, data1: 0x32 }),
    PAD_16: new SimpleMidiControl({ status: 0x95, data1: 0x33 }),


    // EDIT

    COPY:        new SimpleMidiControl({ status: 0xB6, data1: 0x15 }),
    PASTE:       new SimpleMidiControl({ status: 0xB6, data1: 0x16 }),
    NOTE:        new SimpleMidiControl({ status: 0xB6, data1: 0x17 }),
    NUDGE:       new SimpleMidiControl({ status: 0xB6, data1: 0x18 }),
    UNDO:        new SimpleMidiControl({ status: 0xB6, data1: 0x19 }),
    REDO:        new SimpleMidiControl({ status: 0xB6, data1: 0x1A }),
    QUANTIZE:    new SimpleMidiControl({ status: 0xB6, data1: 0x1B }),
    CLEAR:       new SimpleMidiControl({ status: 0xB6, data1: 0x1C }),
    JOG_DIAL:    new SimpleMidiControl({ status: 0xB6, data1: 0x1D }),
    JOG_RING:    new SimpleMidiControl({ status: 0xB6, data1: 0x1E }),
    BACK:        new SimpleMidiControl({ status: 0xB6, data1: 0x66 }),
    LEFT_ARROW:  new SimpleMidiControl({ status: 0xB6, data1: 0x67 }),
    RIGHT_ARROW: new SimpleMidiControl({ status: 0xB6, data1: 0x68 }),
    ENTER:       new SimpleMidiControl({ status: 0xB6, data1: 0x69 }),


    // SCREENS

    ARM_A: new SimpleMidiControl({ status: 0xB7, data1: 0x15 }),
    ARM_B: new SimpleMidiControl({ status: 0xB7, data1: 0x16 }),
    ARM_C: new SimpleMidiControl({ status: 0xB7, data1: 0x17 }),
    ARM_D: new SimpleMidiControl({ status: 0xB7, data1: 0x18 }),
    ARM_E: new SimpleMidiControl({ status: 0xB7, data1: 0x19 }),
    ARM_F: new SimpleMidiControl({ status: 0xB7, data1: 0x1A }),
    ARM_G: new SimpleMidiControl({ status: 0xB7, data1: 0x1B }),
    ARM_H: new SimpleMidiControl({ status: 0xB7, data1: 0x1C }),

    PREV_DEVICE:     new SimpleMidiControl({ status: 0xB9, data1: 0x15 }),
    CHILD_DEVICE:    new SimpleMidiControl({ status: 0xB9, data1: 0x16 }),
    PARENT_DEVICE:   new SimpleMidiControl({ status: 0xB9, data1: 0x17 }),
    NEXT_DEVICE:     new SimpleMidiControl({ status: 0xB9, data1: 0x18 }),
    PREV_PARAM_BANK: new SimpleMidiControl({ status: 0xB9, data1: 0x19 }),
    NEXT_PARAM_BANK: new SimpleMidiControl({ status: 0xB9, data1: 0x1C }),

    VOL_TOUCH_A: new SimpleMidiControl({ status: 0xB7, data1: 0x66 }),
    VOL_TOUCH_B: new SimpleMidiControl({ status: 0xB7, data1: 0x68 }),
    VOL_TOUCH_C: new SimpleMidiControl({ status: 0xB7, data1: 0x6A }),
    VOL_TOUCH_D: new SimpleMidiControl({ status: 0xB7, data1: 0x6C }),
    VOL_TOUCH_E: new SimpleMidiControl({ status: 0xB7, data1: 0x6E }),
    VOL_TOUCH_F: new SimpleMidiControl({ status: 0xB7, data1: 0x70 }),
    VOL_TOUCH_G: new SimpleMidiControl({ status: 0xB7, data1: 0x72 }),
    VOL_TOUCH_H: new SimpleMidiControl({ status: 0xB7, data1: 0x74 }),

    VOL_A: new KnobControl({ status: 0xB7, data1: 0x67 }),
    VOL_B: new KnobControl({ status: 0xB7, data1: 0x69 }),
    VOL_C: new KnobControl({ status: 0xB7, data1: 0x6B }),
    VOL_D: new KnobControl({ status: 0xB7, data1: 0x6D }),
    VOL_E: new KnobControl({ status: 0xB7, data1: 0x6F }),
    VOL_F: new KnobControl({ status: 0xB7, data1: 0x71 }),
    VOL_G: new KnobControl({ status: 0xB7, data1: 0x73 }),
    VOL_H: new KnobControl({ status: 0xB7, data1: 0x75 }),

    PAN_TOUCH_A: new SimpleMidiControl({ status: 0xB8, data1: 0x66 }),
    PAN_TOUCH_B: new SimpleMidiControl({ status: 0xB8, data1: 0x68 }),
    PAN_TOUCH_C: new SimpleMidiControl({ status: 0xB8, data1: 0x6A }),
    PAN_TOUCH_D: new SimpleMidiControl({ status: 0xB8, data1: 0x6C }),
    PAN_TOUCH_E: new SimpleMidiControl({ status: 0xB8, data1: 0x6E }),
    PAN_TOUCH_F: new SimpleMidiControl({ status: 0xB8, data1: 0x70 }),
    PAN_TOUCH_G: new SimpleMidiControl({ status: 0xB8, data1: 0x72 }),
    PAN_TOUCH_H: new SimpleMidiControl({ status: 0xB8, data1: 0x74 }),

    PAN_A: new SimpleMidiControl({ status: 0xB8, data1: 0x67 }),
    PAN_B: new SimpleMidiControl({ status: 0xB8, data1: 0x69 }),
    PAN_C: new SimpleMidiControl({ status: 0xB8, data1: 0x6B }),
    PAN_D: new SimpleMidiControl({ status: 0xB8, data1: 0x6D }),
    PAN_E: new SimpleMidiControl({ status: 0xB8, data1: 0x6F }),
    PAN_F: new SimpleMidiControl({ status: 0xB8, data1: 0x71 }),
    PAN_G: new SimpleMidiControl({ status: 0xB8, data1: 0x73 }),
    PAN_H: new SimpleMidiControl({ status: 0xB8, data1: 0x75 }),

    MACRO_TOUCH_1: new SimpleMidiControl({ status: 0xB0, data1: 0x66 }),
    MACRO_TOUCH_2: new SimpleMidiControl({ status: 0xB0, data1: 0x68 }),
    MACRO_TOUCH_3: new SimpleMidiControl({ status: 0xB0, data1: 0x6A }),
    MACRO_TOUCH_4: new SimpleMidiControl({ status: 0xB0, data1: 0x6C }),
    MACRO_TOUCH_5: new SimpleMidiControl({ status: 0xB0, data1: 0x6E }),
    MACRO_TOUCH_6: new SimpleMidiControl({ status: 0xB0, data1: 0x70 }),
    MACRO_TOUCH_7: new SimpleMidiControl({ status: 0xB0, data1: 0x72 }),
    MACRO_TOUCH_8: new SimpleMidiControl({ status: 0xB0, data1: 0x74 }),

    MACRO_1: new SimpleMidiControl({ status: 0xB0, data1: 0x67 }),
    MACRO_2: new SimpleMidiControl({ status: 0xB0, data1: 0x69 }),
    MACRO_3: new SimpleMidiControl({ status: 0xB0, data1: 0x6B }),
    MACRO_4: new SimpleMidiControl({ status: 0xB0, data1: 0x6D }),
    MACRO_5: new SimpleMidiControl({ status: 0xB0, data1: 0x6F }),
    MACRO_6: new SimpleMidiControl({ status: 0xB0, data1: 0x71 }),
    MACRO_7: new SimpleMidiControl({ status: 0xB0, data1: 0x73 }),
    MACRO_8: new SimpleMidiControl({ status: 0xB0, data1: 0x75 }),

    PARAM_TOUCH_1: new SimpleMidiControl({ status: 0xBA, data1: 0x66 }),
    PARAM_TOUCH_2: new SimpleMidiControl({ status: 0xBA, data1: 0x68 }),
    PARAM_TOUCH_3: new SimpleMidiControl({ status: 0xBA, data1: 0x6A }),
    PARAM_TOUCH_4: new SimpleMidiControl({ status: 0xBA, data1: 0x6C }),
    PARAM_TOUCH_5: new SimpleMidiControl({ status: 0xBA, data1: 0x6E }),
    PARAM_TOUCH_6: new SimpleMidiControl({ status: 0xBA, data1: 0x70 }),
    PARAM_TOUCH_7: new SimpleMidiControl({ status: 0xBA, data1: 0x72 }),
    PARAM_TOUCH_8: new SimpleMidiControl({ status: 0xBA, data1: 0x74 }),

    PARAM_1: new SimpleMidiControl({ status: 0xBA, data1: 0x67 }),
    PARAM_2: new SimpleMidiControl({ status: 0xBA, data1: 0x69 }),
    PARAM_3: new SimpleMidiControl({ status: 0xBA, data1: 0x6B }),
    PARAM_4: new SimpleMidiControl({ status: 0xBA, data1: 0x6D }),
    PARAM_5: new SimpleMidiControl({ status: 0xBA, data1: 0x6F }),
    PARAM_6: new SimpleMidiControl({ status: 0xBA, data1: 0x71 }),
    PARAM_7: new SimpleMidiControl({ status: 0xBA, data1: 0x73 }),
    PARAM_8: new SimpleMidiControl({ status: 0xBA, data1: 0x75 }),
};
