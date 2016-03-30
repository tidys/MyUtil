/**
 *
 * @author
 *
 */
var SplashScreen = (function (_super) {
    __extends(SplashScreen, _super);
    function SplashScreen() {
        _super.call(this);
    }
    var d = __define,c=SplashScreen,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        var bg = new egret.Shape();
        this.bgLayer.addChild(bg);
        this.bg = bg;
        var logoWrap = new AutoResizeItem();
        var logo = new SpilLogo();
        logoWrap.addChild(logo);
        logoWrap.changeProps({ x: 480, y: 320 });
        this.gameLayer.addChild(logoWrap);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    p.onClick = function (e) {
        var o = SpilAPI.getSplash();
        o["action"]();
    };
    p.start = function () {
        _super.prototype.start.call(this);
    };
    p.onShowed = function () {
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0xffffff);
        this.bg.graphics.drawRect(0, 0, ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
        this.bg.graphics.endFill();
    };
    return SplashScreen;
})(BaseLayer);
egret.registerClass(SplashScreen,'SplashScreen');
