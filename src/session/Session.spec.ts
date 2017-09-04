import { Session } from './Session';
import { Control } from '../control';
import { View } from '../view';

describe('Session', () => {
    const controls = { CTRL: new Control({ patterns: [{ status: 0xb0, data1: 0xb1 }] }) };

    class BaseView extends View {}
    const views = { BASE: BaseView };

    describe('Views', () => {
        it('should register controls correctly', () => {
            const session = new Session();
            session.registerControls(controls);
            expect(session.controls.CTRL).toBe(undefined);
            session.emit('init');
            expect(session.controls.CTRL).toBe(controls.CTRL);

            const session2 = new Session();
            (session2 as any)._isInit = true;
            session2.registerControls(controls);
            expect(session2.controls.CTRL).toBe(controls.CTRL);
        });

        it('should register views correctly outside of init', () => {
            const viewInit = jest.spyOn(BaseView, 'init');

            const session = new Session();
            session.registerViews(views);
            expect(session.views.BASE).toBe(undefined);
            session.emit('init');
            expect(session.views.BASE).toBe(undefined);

            const session2 = new Session();
            session2.registerViews(views);
            session2.registerControls(controls);
            expect(session2.views.BASE).toBe(undefined);
            session2.emit('init');
            expect(session2.views.BASE).toBe(BaseView);

            expect(viewInit).toHaveBeenCalledTimes(1);
            viewInit.mockRestore();
        });

        it('should register views correctly inside of init', () => {
            const session = new Session();
            (session as any)._isInit = true;
            session.registerViews(views);
            expect(Object.keys(session.views).length).toBe(0);

            session.registerControls(controls);
            expect(Object.keys(session.views).length).toBe(Object.keys(views).length);
            expect(session.views.BASE).toBe(BaseView);
        });

        it('should activate views correctly', () => {
            const session = new Session();
            session.registerControls(controls);
            session.registerViews(views);
            session.emit('init');
            expect(session.activeView).toBe(undefined);
            session.activateView('BASE');
            expect(session.activeView).toBe(BaseView);
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
