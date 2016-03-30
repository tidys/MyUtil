/**
 *
 * @author
 *
 */
var PauseLayer = (function (_super) {
    __extends(PauseLayer, _super);
    function PauseLayer() {
        _super.call(this);
    }
    var d = __define,c=PauseLayer,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bg = new egret.Shape();
        this.bgLayer.addChild(this.bg);
        var content = new AutoResizeItem();
        this.bg.touchEnabled = true;
        var bg = new egret.Bitmap(RES.getRes("pause.panel"));
        bg.x = 196 - 480;
        bg.y = 120 - 320;
        content.addChild(bg);
        var txt = new egret.Bitmap(RES.getRes("pause.txt_pause"));
        txt.x = 350 - 480;
        txt.y = 174 - 320;
        content.addChild(txt);
        var resumeBtn = new egret.Bitmap(RES.getRes("btn_play"));
        resumeBtn.scaleX = resumeBtn.scaleY = 113 / 135;
        resumeBtn.x = 252 - 480;
        resumeBtn.y = 280 - 320;
        content.addChild(resumeBtn);
        var fxBtn = new FxButton();
        fxBtn.x = 366 - 480;
        fxBtn.y = 280 - 320;
        content.addChild(fxBtn);
        var musicBtn = new MusicButton();
        musicBtn.x = 482 - 480;
        musicBtn.y = 280 - 320;
        content.addChild(musicBtn);
        var moreBtn = new egret.Bitmap(RES.getRes("start.btn_more"));
        moreBtn.x = 598 - 480;
        moreBtn.y = 280 - 320;
        content.addChild(moreBtn);
        resumeBtn.touchEnabled = true;
        resumeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResume, this);
        content.changeProps({ x: 480, y: 320 });
        this.gameLayer.addChild(content);
        moreBtn.touchEnabled = true;
        moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoreHandler, this);
    };
    p.onMoreHandler = function (e) {
        this.dispatchEventWith("GamePanelEvent", true, { type: "More", from: "pause" });
    };
    p.onResume = function (e) {
        this.dispatchEventWith("GameResumed", true);
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0x0000, 0.3);
        this.bg.graphics.drawRect(0, 0, ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
        this.bg.graphics.endFill();
    };
    return PauseLayer;
})(BaseLayer);
egret.registerClass(PauseLayer,'PauseLayer');
