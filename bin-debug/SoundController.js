/**
 *
 * @author
 *
 */
var SoundController = (function () {
    function SoundController() {
        this.hasMusic = true;
        this.hasFx = true;
        this.hasMusic = true;
        this.bgVolume = 1;
        this.fxVolume = 1;
        this.hasFx = true;
        this.musicList = [];
        this.isAutoHide = false;
        this.fxList = [];
        this._list = {};
        ScreenState.getInstance().addListener(this.onStateChange, this);
    }
    var d = __define,c=SoundController,p=c.prototype;
    SoundController.getInstance = function () {
        if (SoundController._instance == null) {
            SoundController._instance = new SoundController();
        }
        return SoundController._instance;
    };
    p.onStateChange = function (type) {
        if (ScreenState.getInstance().isActive()) {
            this.autoMuteSound(false);
        }
        else {
            this.autoMuteSound(true);
        }
    };
    p.getHiddenProp = function () {
        var d = ["webkit", "moz", "ms", "o"];
        if ("hidden" in document)
            return "hidden";
        for (var a = 0; a < d.length; a++)
            if (d[a] + "Hidden" in document)
                return d[a] + "Hidden";
        return null;
    };
    p.showLoop = function (d) {
        this._list.hasOwnProperty(d) || (this._list[d] = new LoopSound(d));
    };
    p.pause = function (d) {
        this._list[d].pause();
    };
    p.play = function (d) {
        this._list[d].play();
    };
    p.muteFx = function (b) {
        this.fxVolume = b ? 0 : 1;
        SimpleSound.mute(b);
    };
    p.muteSound = function (b) {
        this.bgVolume = b ? 0 : 1;
        for (var a in this._list)
            this._list[a].changeVolume(b ? 0 : 1);
    };
    p.autoMuteSound = function (b) {
        for (var a in this._list)
            this._list[a].changeVolume(b ? 0 : this.bgVolume);
        SimpleSound.mute(b);
    };
    p.isHidden = function () {
        var d = this.getHiddenProp();
        return d ? document[d] : !1;
    };
    p.pauseBGM = function () {
        this.isAutoHide = !0;
        this.autoMuteSound(!0);
    };
    p.resumeBGM = function () {
        this.isAutoHide = !1;
        this.autoMuteSound(!1);
    };
    p.visChange = function () {
        this.autoMuteSound(this.isHidden());
    };
    SoundController._instance = null;
    return SoundController;
})();
egret.registerClass(SoundController,'SoundController');
