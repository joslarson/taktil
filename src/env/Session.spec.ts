import '../env';

import { Session } from './Session';
import { SimpleControl } from '../core/control/SimpleControl';
import { View } from '../core/view/View';

describe('Session', () => {
    const controls = { CTRL: new SimpleControl({ status: 0xb0, data1: 0xb1 }) };

    class TestView extends View {}
    const views = { TEST: TestView };

    session.registerControls(controls);
    session.registerViews(views);
    session.emit('init');

    describe('Views', () => {
        it('should register controls correctly', () => {
            const session1 = new Session();
            session1.registerControls(controls);
            expect(session1.controls.CTRL).toBe(undefined);
            session1.emit('init');
            expect(session1.controls.CTRL).toBe(controls.CTRL);

            const session2 = new Session();
            (session2 as any)._isInit = true;
            session2.registerControls(controls);
            expect(session2.controls.CTRL).toBe(controls.CTRL);
        });

        it('should register views correctly outside of init', () => {
            const viewInit = jest.spyOn(TestView, 'init');

            const session1 = new Session();
            session1.registerViews(views);
            expect(session1.views.TEST).toBe(undefined);
            session1.emit('init');
            expect(session1.views.TEST).toBe(undefined);

            const session2 = new Session();
            session2.registerViews(views);
            session2.registerControls(controls);
            expect(session2.views.TEST).toBe(undefined);
            session2.emit('init');
            expect(session2.views.TEST).toBe(TestView);

            expect(viewInit).toHaveBeenCalledTimes(1);
            viewInit.mockRestore();
        });

        it('should register views correctly inside of init', () => {
            const session = new Session();
            (session as any)._isInit = true;
            expect(() => session.registerViews(views)).toThrow();

            session.registerControls(controls);
            expect(() => session.registerViews(views)).not.toThrow();
            expect(session.views.TEST).toBe(TestView);
        });

        it('should activate views correctly', () => {
            session.activateView(TestView);
        });
    });

    describe('Modes', () => {
        const session = new Session();
        it('should activate/deactivate modes correctly', () => {
            const base = '__BASE__';
            const mode1 = 'TEST1';
            const mode2 = 'TEST2';
            const mode3 = 'TEST3';

            expect(() => session.activateMode(base)).toThrow();

            expect(session.modeIsActive(mode1)).toBe(false);
            session.activateMode(mode1);
            expect(session.activeModes).toEqual([mode1, base]);
            expect(session.modeIsActive(mode1)).toBe(true);

            session.activateMode(mode2);
            session.activateMode(mode3);
            expect(session.activeModes).toEqual([mode3, mode2, mode1, base]);

            session.deactivateMode(mode2);
            expect(session.activeModes).toEqual([mode3, mode1, base]);

            session.deactivateMode(mode3);
            expect(session.activeModes).toEqual([mode1, base]);

            expect(() => session.deactivateMode(base)).toThrow();
        });
    });
});
