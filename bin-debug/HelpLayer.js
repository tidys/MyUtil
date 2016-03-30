/**
 *
 * @author
 *
 */
var HelpLayer = (function (_super) {
    __extends(HelpLayer, _super);
    function HelpLayer() {
        _super.call(this);
    }
    var d = __define,c=HelpLayer,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bg = new egret.Shape();
        this.bg.touchEnabled = true;
        this.bgLayer.addChild(this.bg);
        this.container = new AutoResizeItem();
        var panel = new egret.Bitmap(RES.getRes("help.panel"));
        panel.x = -385;
        panel.y = -268;
        this.container.addChild(panel);
        this.content = new egret.DisplayObjectContainer();
        this.container.addChild(this.content);
        var btnMore = new egret.Bitmap(RES.getRes("start.btn_more"));
        btnMore.x = 267;
        btnMore.y = 160;
        this.container.addChild(btnMore);
        btnMore.touchEnabled = true;
        btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
        var btnExit = new egret.Bitmap(RES.getRes("help.btn_exit"));
        btnExit.x = 267;
        btnExit.y = -280;
        this.container.addChild(btnExit);
        this.createPage(1);
        this.container.changeProps({ x: 480, y: 320 }, { x: 320, y: 480 });
        this.gameLayer.addChild(this.container);
        btnExit.touchEnabled = true;
        btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
    };
    p.onMore = function (e) {
        var o = SpilAPI.getMoreObj();
        if (o && o.hasOwnProperty("action") && o["action"] !== false) {
            o["action"]();
        }
    };
    p.onExit = function (e) {
        this.parent.removeChild(this);
    };
    p.createPage = function (n) {
        this.content.removeChildren();
        this.page = n;
        switch (n) {
            case 1:
                this.createP1();
                break;
            case 2:
                this.createP2();
                break;
            case 3:
                this.createP3();
                break;
        }
    };
    p.createP1 = function () {
        var txt = new egret.Bitmap(RES.getRes("help.txt_1"));
        txt.x = -289;
        txt.y = -139;
        this.content.addChild(txt);
        var btnNext = new egret.Bitmap(RES.getRes("help.btn_next"));
        btnNext.x = -50;
        btnNext.y = 160;
        this.content.addChild(btnNext);
        btnNext.touchEnabled = true;
        btnNext.name = "btn_next";
        btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFlip, this);
    };
    p.onFlip = function (e) {
        var offset = e.currentTarget.name == "btn_next" ? 1 : -1;
        var p = this.page + offset;
        this.createPage(p);
    };
    p.createP2 = function () {
        var txt = new egret.Bitmap(RES.getRes("help.txt_2"));
        txt.x = -301;
        txt.y = -163;
        this.content.addChild(txt);
        var btnNext = new egret.Bitmap(RES.getRes("help.btn_next"));
        btnNext.x = 36;
        btnNext.y = 160;
        this.content.addChild(btnNext);
        btnNext.touchEnabled = true;
        btnNext.name = "btn_next";
        btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFlip, this);
        var btnPrev = new egret.Bitmap(RES.getRes("help.btn_next"));
        btnPrev.scaleX = -1;
        btnPrev.x = -136 + 128;
        btnPrev.y = 160;
        btnPrev.name = "btn_prev";
        btnPrev.touchEnabled = true;
        btnPrev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFlip, this);
        this.content.addChild(btnPrev);
    };
    p.createP3 = function () {
        var txt = new egret.Bitmap(RES.getRes("help.txt_3"));
        txt.x = -263;
        txt.y = -163;
        this.content.addChild(txt);
        var btnPrev = new egret.Bitmap(RES.getRes("help.btn_next"));
        btnPrev.scaleX = -1;
        btnPrev.x = -50 + 128;
        btnPrev.y = 160;
        btnPrev.name = "btn_prev";
        btnPrev.touchEnabled = true;
        btnPrev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFlip, this);
        this.content.addChild(btnPrev);
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0, 0.3);
        this.bg.graphics.drawRect(0, 0, ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
        this.bg.graphics.endFill();
    };
    return HelpLayer;
})(BaseLayer);
egret.registerClass(HelpLayer,'HelpLayer');
