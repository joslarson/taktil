import  { SimpleMidiMessage } from './core/midi';


export function midiMessageToHex(midiMessage: SimpleMidiMessage): string {
    const { status, data1, data2 } = midiMessage;
    let result = '';
    for (let midiByte of [status, data1, data2]) {
        let hexByteString = midiByte.toString(16).toUpperCase();
        if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
        result = `${result}${hexByteString}`;
    }
    return result;
}


export function unsignedInt8ToHex(x: number) {
    const upper = (x >> 4) & 0xF;
    const lower = x & 0xF;

    return upper.toString(16) + lower.toString(16) + " ";
}


export function unsignedInt7ToHex(x: number) {
    const upper = (x >> 4) & 0x7;
    const lower = x & 0xF;

    return upper.toString(16) + lower.toString(16) + " ";
}
