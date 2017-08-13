import '../../env';
import { expect } from 'chai';

import { View } from './View';

class TestView extends View {}

describe('View', () => {
    it('should have a name', () => {
        expect(TestView.name).to.not.equal(undefined);
    });
});
