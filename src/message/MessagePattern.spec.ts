import { MessagePattern } from './MessagePattern';

describe('MessagePattern', () => {
    it('should convert to and from pattern string and midi message.', () => {
        const msg = { port: 0, status: 0xb4, data1: 0x19 };
        const string = '00B419??';
        expect(MessagePattern.getPatternStringFromMidiMessage(msg)).toBe(string);
        expect(MessagePattern.getMidiMessageFromPatternString(string)).toEqual(msg);
    });
});
