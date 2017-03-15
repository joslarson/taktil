import { expect } from 'chai';

import AbstractView from './AbstractView';


class View extends AbstractView {
    onRegister() {

    }
}

describe('AbstractView', () => {
    it('should have a name', () => {
        expect(View.name).to.not.equal(undefined);
    });
});