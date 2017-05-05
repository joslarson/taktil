import { expect } from 'chai';

import { midiMessageToHex } from './utils';


describe('midiMessageToHex', () => {
    it('should return midi message hex representation string', () => {
        expect(midiMessageToHex({ status: 0xB0, data1: 0xA4, data2: 0x7F })).to.equal('B0A47F');
    });
});
