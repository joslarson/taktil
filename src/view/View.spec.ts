import { View } from './View';

class TestView extends View {}

describe('View', () => {
    it('should have a name', () => {
        expect(TestView.name).not.toBe(undefined);
    });
});
