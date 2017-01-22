import { session, host, MidiControl } from 'typewig';


export default {
    // TOP LEFT

    CHANNEL:  new MidiControl('B015??'),
    PLUGIN:   new MidiControl('B016??'),
    ARRANGE:  new MidiControl('B017??'),
    MIX:      new MidiControl('B018??'),
    BROWSE:   new MidiControl('B019??'),
    SAMPLING: new MidiControl('B01A??'),
    ALL:      new MidiControl('B01B??'),
    AUTO:     new MidiControl('B01C??'),
    FS1:      new MidiControl('B01D??'),
    FS2:      new MidiControl('B01E??'),


    // METERS

    IN1:  new MidiControl('B115??'),
    IN2:  new MidiControl('B116??'),
    IN3:  new MidiControl('B117??'),
    IN4:  new MidiControl('B118??'),
    MST:  new MidiControl('B119??'),
    GRP:  new MidiControl('B11A??'),
    SND:  new MidiControl('B11B??'),
    CUE:  new MidiControl('B11C??'),
    KNOB: new MidiControl('B11D??'),


    // PERFORMANCE

    TAP:         new MidiControl('B215??'),
    STEP_MODE:   new MidiControl('B216??'),
    MACRO:       new MidiControl('B217??'),
    NOTE_REPEAT: new MidiControl('B218??'),


    // GROUPS

    GROUP_A: new MidiControl('B366??'),
    GROUP_B: new MidiControl('B367??'),
    GROUP_C: new MidiControl('B368??'),
    GROUP_D: new MidiControl('B369??'),
    GROUP_E: new MidiControl('B36A??'),
    GROUP_F: new MidiControl('B36B??'),
    GROUP_G: new MidiControl('B36C??'),
    GROUP_H: new MidiControl('B36D??'),


    // TRANSPORT

    RESTART: new MidiControl('B415??'),
    METRO:   new MidiControl('B416??'),
    EVENTS:  new MidiControl('B417??'),
    GRID:    new MidiControl('B418??'),
    PLAY:    new MidiControl('B419??'),
    REC:     new MidiControl('B41A??'),
    ERASE:   new MidiControl('B41B??'),


    // MIDDLE

    SCENE:     new MidiControl('B515??'),
    PATTERN:   new MidiControl('B516??'),
    PAD_MODE:  new MidiControl('B517??'),
    NAVIGATE:  new MidiControl('B518??'),
    DUPLICATE: new MidiControl('B519??'),
    SELECT:    new MidiControl('B51A??'),
    SOLO:      new MidiControl('B51B??'),
    MUTE:      new MidiControl('B51C??'),


    // PADS

    PAD_1:  new MidiControl('9524??'),
    PAD_2:  new MidiControl('9525??'),
    PAD_3:  new MidiControl('9526??'),
    PAD_4:  new MidiControl('9527??'),
    PAD_5:  new MidiControl('9528??'),
    PAD_6:  new MidiControl('9529??'),
    PAD_7:  new MidiControl('952A??'),
    PAD_8:  new MidiControl('952B??'),
    PAD_9:  new MidiControl('952C??'),
    PAD_10: new MidiControl('952D??'),
    PAD_11: new MidiControl('952E??'),
    PAD_12: new MidiControl('952F??'),
    PAD_13: new MidiControl('9530??'),
    PAD_14: new MidiControl('9531??'),
    PAD_15: new MidiControl('9532??'),
    PAD_16: new MidiControl('9533??'),


    // EDIT

    COPY:        new MidiControl('B615??'),
    PASTE:       new MidiControl('B616??'),
    NOTE:        new MidiControl('B617??'),
    NUDGE:       new MidiControl('B618??'),
    UNDO:        new MidiControl('B619??'),
    REDO:        new MidiControl('B61A??'),
    QUANTIZE:    new MidiControl('B61B??'),
    CLEAR:       new MidiControl('B61C??'),
    JOG_DIAL:    new MidiControl('B61D??'),
    JOG_RING:    new MidiControl('B61E??'),
    BACK:        new MidiControl('B666??'),
    LEFT_ARROW:  new MidiControl('B667??'),
    RIGHT_ARROW: new MidiControl('B668??'),
    ENTER:       new MidiControl('B669??'),


    // SCREENS

    ARM_A: new MidiControl('B715??'),
    ARM_B: new MidiControl('B716??'),
    ARM_C: new MidiControl('B717??'),
    ARM_D: new MidiControl('B718??'),
    ARM_E: new MidiControl('B719??'),
    ARM_F: new MidiControl('B71A??'),
    ARM_G: new MidiControl('B71B??'),
    ARM_H: new MidiControl('B71C??'),

    PREV_DEVICE:     new MidiControl('B915??'),
    CHILD_DEVICE:    new MidiControl('B916??'),
    PARENT_DEVICE:   new MidiControl('B917??'),
    NEXT_DEVICE:     new MidiControl('B918??'),
    PREV_PARAM_BANK: new MidiControl('B919??'),
    NEXT_PARAM_BANK: new MidiControl('B91C??'),

    VOL_TOUCH_A: new MidiControl('B766??'),
    VOL_TOUCH_B: new MidiControl('B768??'),
    VOL_TOUCH_C: new MidiControl('B76A??'),
    VOL_TOUCH_D: new MidiControl('B76C??'),
    VOL_TOUCH_E: new MidiControl('B76E??'),
    VOL_TOUCH_F: new MidiControl('B770??'),
    VOL_TOUCH_G: new MidiControl('B772??'),
    VOL_TOUCH_H: new MidiControl('B774??'),

    VOL_A: new MidiControl('B767??'),
    VOL_B: new MidiControl('B769??'),
    VOL_C: new MidiControl('B76B??'),
    VOL_D: new MidiControl('B76D??'),
    VOL_E: new MidiControl('B76F??'),
    VOL_F: new MidiControl('B771??'),
    VOL_G: new MidiControl('B773??'),
    VOL_H: new MidiControl('B775??'),

    PAN_TOUCH_A: new MidiControl('B866??'),
    PAN_TOUCH_B: new MidiControl('B868??'),
    PAN_TOUCH_C: new MidiControl('B86A??'),
    PAN_TOUCH_D: new MidiControl('B86C??'),
    PAN_TOUCH_E: new MidiControl('B86E??'),
    PAN_TOUCH_F: new MidiControl('B870??'),
    PAN_TOUCH_G: new MidiControl('B872??'),
    PAN_TOUCH_H: new MidiControl('B874??'),

    PAN_A: new MidiControl('B867??', 65),
    PAN_B: new MidiControl('B869??', 65),
    PAN_C: new MidiControl('B86B??', 65),
    PAN_D: new MidiControl('B86D??', 65),
    PAN_E: new MidiControl('B86F??', 65),
    PAN_F: new MidiControl('B871??', 65),
    PAN_G: new MidiControl('B873??', 65),
    PAN_H: new MidiControl('B875??', 65),

    MACRO_TOUCH_1: new MidiControl('B066??'),
    MACRO_TOUCH_2: new MidiControl('B068??'),
    MACRO_TOUCH_3: new MidiControl('B06A??'),
    MACRO_TOUCH_4: new MidiControl('B06C??'),
    MACRO_TOUCH_5: new MidiControl('B06E??'),
    MACRO_TOUCH_6: new MidiControl('B070??'),
    MACRO_TOUCH_7: new MidiControl('B072??'),
    MACRO_TOUCH_8: new MidiControl('B074??'),

    MACRO_1: new MidiControl('B067??'),
    MACRO_2: new MidiControl('B069??'),
    MACRO_3: new MidiControl('B06B??'),
    MACRO_4: new MidiControl('B06D??'),
    MACRO_5: new MidiControl('B06F??'),
    MACRO_6: new MidiControl('B071??'),
    MACRO_7: new MidiControl('B073??'),
    MACRO_8: new MidiControl('B075??'),

    PARAM_TOUCH_1: new MidiControl('BA66??'),
    PARAM_TOUCH_2: new MidiControl('BA68??'),
    PARAM_TOUCH_3: new MidiControl('BA6A??'),
    PARAM_TOUCH_4: new MidiControl('BA6C??'),
    PARAM_TOUCH_5: new MidiControl('BA6E??'),
    PARAM_TOUCH_6: new MidiControl('BA70??'),
    PARAM_TOUCH_7: new MidiControl('BA72??'),
    PARAM_TOUCH_8: new MidiControl('BA74??'),

    PARAM_1: new MidiControl('BA67??'),
    PARAM_2: new MidiControl('BA69??'),
    PARAM_3: new MidiControl('BA6B??'),
    PARAM_4: new MidiControl('BA6D??'),
    PARAM_5: new MidiControl('BA6F??'),
    PARAM_6: new MidiControl('BA71??'),
    PARAM_7: new MidiControl('BA73??'),
    PARAM_8: new MidiControl('BA75??'),
};
