export class Bitwig {
    transport: API.Transport;
    application: API.Application;
    cursorTrack: API.CursorTrack & API.Track;
    trackBank: API.TrackBank;
    popupBrowser: API.PopupBrowser;

    init() {
        this.transport = host.createTransport();

        this.application = host.createApplication();

        this.cursorTrack = host.createArrangerCursorTrack(0, 16) as any as API.CursorTrack & API.Track;
        this.cursorTrack.isGroup().markInterested();
        this.cursorTrack.color().markInterested();

        this.trackBank = host.createMainTrackBank(8, 0, 0);
        this.popupBrowser = host.createPopupBrowser();
    }
}

const bitwig = new Bitwig();


export default bitwig;
