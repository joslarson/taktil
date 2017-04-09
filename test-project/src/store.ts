export class Store {
    transport: API.Transport;
    application: API.Application;
    cursorTrack: API.CursorTrack & API.Track;
    utilCursorTrack: API.CursorTrack & API.Track;
    trackBank: API.TrackBank;
    popupBrowser: API.PopupBrowser;
    sceneBank: API.SceneBank;
    createScene: API.Action;
    masterTrack: API.MasterTrack;

    init() {
        this.transport = host.createTransport();
        this.transport.tempo().markInterested();
        this.transport.getPosition().markInterested();

        this.application = host.createApplication();

        this.cursorTrack = host.createArrangerCursorTrack(0, 16) as any as API.CursorTrack & API.Track;
        this.cursorTrack.isGroup().markInterested();
        this.cursorTrack.color().markInterested();

        this.utilCursorTrack = host.createCursorTrack('utilCursorTrack', 0, 16) as any as API.CursorTrack & API.Track;
        this.utilCursorTrack.hasNext().markInterested();


        this.trackBank = host.createMainTrackBank(8, 0, 0);
        this.trackBank.channelCount().markInterested();
        this.trackBank.setChannelScrollStepSize(8);
        this.trackBank.followCursorTrack(this.cursorTrack);

        this.popupBrowser = host.createPopupBrowser();

        this.sceneBank = host.createSceneBank(16);
        for (let i = 0; i < 16; i += 1) {
            this.sceneBank.getScene(i).exists().markInterested();
            this.sceneBank.getScene(i).clipCount().markInterested();
        }

        this.createScene = this.application.getAction('Create Scene');

        this.masterTrack = host.createMasterTrack(0);
        this.masterTrack.exists().markInterested();
    }

}

const store = new Store();


export default store;
