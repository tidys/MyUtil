/**
 *
 * @author
 *
 */
var MusicButton = (function (_super) {
    __extends(MusicButton, _super);
    function MusicButton() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }
    var d = __define,c=MusicButton,p=c.prototype;
    p.onAdded = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.showView(SoundController.getInstance().bgVolume > 0);
    };
    p.showView = function (b) {
        this.removeChildren();
        var img = new egret.Bitmap(RES.getRes("start.btn_" + (b ? "music" : "mute")));
        this.addChild(img);
    };
    p.onClick = function (e) {
        if (SoundController.getInstance().bgVolume > 0) {
            SoundController.getInstance().muteSound(true);
            this.showView(false);
        }
        else {
            SoundController.getInstance().muteSound(false);
            this.showView(true);
        }
    };
    return MusicButton;
})(egret.DisplayObjectContainer);
egret.registerClass(MusicButton,'MusicButton');
