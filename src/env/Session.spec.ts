import '../env';

import { Session } from './Session';
import { SimpleControl } from '../core/control/SimpleControl';
import { View } from '../core/view/View';

// allows me to recreate session globally
declare let session: Session;

describe('Session', () => {
    const controls = { CTRL: new SimpleControl({ status: 0xb0, data1: 0xb1 }) };

    class BaseView extends View {}
    const views = { BASE: BaseView };

    session.emit('init');

    describe('Views', () => {
        it('should register controls correctly', () => {
            session = new Session();
            session.registerControls(controls);
            expect(session.controls.CTRL).toBe(undefined);
            session.emit('init');
            expect(session.controls.CTRL).toBe(controls.CTRL);

            session = new Session();
            (session as any)._isInit = true;
            session.registerControls(controls);
            expect(session.controls.CTRL).toBe(controls.CTRL);
        });

        it('should register views correctly outside of init', () => {
            const viewInit = jest.spyOn(BaseView, 'init');

            session = new Session();
            session.registerViews(views);
            expect(session.views.BASE).toBe(undefined);
            session.emit('init');
            expect(session.views.BASE).toBe(undefined);

            session = new Session();
            session.registerViews(views);
            session.registerControls(controls);
            expect(session.views.BASE).toBe(undefined);
            session.emit('init');
            expect(session.views.BASE).toBe(BaseView);

            expect(viewInit).toHaveBeenCalledTimes(1);
            viewInit.mockRestore();
        });

        it('should register views correctly inside of init', () => {
            session = new Session();
            (session as any)._isInit = true;
            session.registerViews(views);
            expect(Object.keys(session.views).length).toBe(0);

            session.registerControls(controls);
            expect(Object.keys(session.views).length).toBe(Object.keys(views).length);
            expect(session.views.BASE).toBe(BaseView);
        });

        it('should activate views correctly', () => {
            session = new Session();
            session.registerControls(controls);
            session.registerViews(views);
            session.emit('init');
            expect(session.activeView).toBe(undefined);
            session.activateView('BASE');
            expect(session.activeView).toBe(BaseView);
        });
    });

    describe('Modes', () => {
        session = new Session();
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
