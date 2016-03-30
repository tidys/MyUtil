/**
 *
 * @author
 *
 */
var FxButton = (function (_super) {
    __extends(FxButton, _super);
    function FxButton() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }
    var d = __define,c=FxButton,p=c.prototype;
    p.onAdded = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.showView(SoundController.getInstance().fxVolume > 0);
    };
    p.showView = function (b) {
        this.removeChildren();
        var img = new egret.Bitmap(RES.getRes("start.btn_fx" + (b ? "" : "_mute")));
        this.addChild(img);
    };
    p.onClick = function (e) {
        if (SoundController.getInstance().fxVolume > 0) {
            SoundController.getInstance().muteFx(true);
            this.showView(false);
        }
        else {
            SoundController.getInstance().muteFx(false);
            this.showView(true);
        }
    };
    return FxButton;
})(egret.DisplayObjectContainer);
egret.registerClass(FxButton,'FxButton');
