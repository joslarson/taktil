export class ApiStore {
    transport: API.Transport;
    application: API.Application;
    cursorTrack: API.CursorTrack & API.Track;

    init() {
        this.transport = host.createTransport();

        this.application = host.createApplication();

        this.cursorTrack = host.createCursorTrack('CursorTrack', 0, 0) as any as API.CursorTrack & API.Track;
        this.cursorTrack.isGroup().markInterested();
        this.cursorTrack.color().markInterested();
    }
}

const apiStore = new ApiStore();


export default apiStore;
