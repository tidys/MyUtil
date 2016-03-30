/**
 *
 * @author
 *
 */
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        _super.call(this);
    }
    var d = __define,c=StartScene,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        var shop = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(480, 320), new egret.Point(320, 480));
        var shopImg = new egret.Bitmap(RES.getRes("bg.shop"));
        shop.addChild(shopImg);
        shop.changeProps({ x: -71, y: -91 });
        this.bgLayer.addChild(shop);
        var gress1 = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640), new egret.Point(0, 960));
        var gress1Img = new egret.Bitmap(RES.getRes("bg.gress1"));
        gress1.addChild(gress1Img);
        gress1.changeProps({ x: -205, y: 525 });
        this.bgLayer.addChild(gress1);
        var gress2 = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(960, 640), new egret.Point(640, 960));
        var gress2Img = new egret.Bitmap(RES.getRes("bg.gress2"));
        gress2.addChild(gress2Img);
        gress2.changeProps({ x: 428, y: 462 });
        this.bgLayer.addChild(gress2);
        var offsetX = 490;
        var offsetY = 409;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.otherGirl = new AutoResizeItem();
        var other = new egret.Bitmap(RES.getRes("start.other"));
        other.x = -412;
        other.y = -214;
        this.otherGirl.addChild(other);
        this.otherGirl.changeProps({ x: 165 + offsetX, y: 63 + offsetY });
        this.gameLayer.addChild(this.otherGirl);
        this.girl = new AutoResizeItem();
        var girlImg = new egret.Bitmap(RES.getRes("start.girl"));
        girlImg.x = -195;
        girlImg.y = -340;
        this.girl.addChild(girlImg);
        this.girl.changeProps({ x: -332 + offsetX, y: -20 + offsetY });
        this.gameLayer.addChild(this.girl);
        this.title = new AutoResizeItem();
        var titleImg = new egret.Bitmap(RES.getRes("start.title"));
        titleImg.x = -225;
        titleImg.y = -121;
        this.title.addChild(titleImg);
        this.title.changeProps({ x: 13 + offsetX, y: -282 + offsetY });
        this.gameLayer.addChild(this.title);
        this.btnPlay = new AutoResizeItem();
        var playImg = new egret.Bitmap(RES.getRes("btn_play"));
        playImg.x = -74;
        playImg.y = -74;
        this.btnPlay.addChild(playImg);
        this.btnPlay.changeProps({ x: -6 + offsetX, y: -64 + offsetY });
        this.btnsLayer.addChild(this.btnPlay);
        this.btnMore = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640), new egret.Point(0, 960));
        var moreImg = new egret.Bitmap(RES.getRes("start.btn_more"));
        moreImg.x = -62;
        moreImg.y = -62;
        this.btnMore.addChild(moreImg);
        this.btnMore.changeProps({ x: 67, y: 566 });
        this.btnsLayer.addChild(this.btnMore);
        this.btnHelp = new AutoResizeItem();
        var helpImg = new egret.Bitmap(RES.getRes("start.btn_help"));
        helpImg.x = -74;
        helpImg.y = -74;
        this.btnHelp.addChild(helpImg);
        this.btnHelp.changeProps({ x: 147 + offsetX, y: -64 + offsetY });
        this.btnsLayer.addChild(this.btnHelp);
        this.girl.visible = false;
        this.otherGirl.visible = false;
        this.btnPlay.scaleX = this.btnPlay.scaleY = 0;
        this.btnHelp.scaleX = this.btnHelp.scaleY = 0;
        var logo = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(960, 640));
        var logoImg = new SpilLogo();
        logo.addChild(logoImg);
        logoImg.setPosition(-1, -1, -10, -10);
        logo.changeProps({ x: 960, y: 640 });
        this.btnsLayer.addChild(logo);
    };
    p.start = function () {
        _super.prototype.start.call(this);
        var ix1 = this.girl.x;
        var iy1 = this.otherGirl.y;
        var iy2 = this.title.y;
        this.girl.x = -400 * ScreenSolution.getInstance().wScale;
        this.girl.visible = true;
        this.otherGirl.y = ScreenSolution.getInstance().curH + 600 * ScreenSolution.getInstance().hScale;
        this.otherGirl.visible = true;
        this.title.y = -250 * ScreenSolution.getInstance().hScale;
        this.title.visible = true;
        var t1 = egret.Tween.get(this.girl);
        var t2 = egret.Tween.get(this.otherGirl);
        var t3 = egret.Tween.get(this.title);
        var t4 = egret.Tween.get(this.btnPlay);
        var t5 = egret.Tween.get(this.btnHelp);
        t1.to({ x: this.girl.getX(-332 + this.offsetX) }, 5 * GameData.FPS)
            .to({ x: this.girl.getX(-292 + this.offsetX) }, 2 * GameData.FPS)
            .to({ x: this.girl.getX(-354 + this.offsetX) }, 2 * GameData.FPS)
            .to({ x: this.girl.getX(-324 + this.offsetX) }, 2 * GameData.FPS)
            .to({ x: ix1 }, 2 * GameData.FPS);
        t2.wait(5 * GameData.FPS)
            .to({ y: this.otherGirl.getY(32 + this.offsetY) }, 4 * GameData.FPS)
            .to({ y: this.otherGirl.getY(111 + this.offsetY) }, 2 * GameData.FPS)
            .to({ y: this.otherGirl.getY(34 + this.offsetY) }, 2 * GameData.FPS)
            .to({ y: this.otherGirl.getY(78 + this.offsetY) }, 2 * GameData.FPS)
            .to({ y: iy1 }, 2 * GameData.FPS);
        t3.wait(13 * GameData.FPS)
            .to({ y: this.title.getY(-251 + this.offsetY) }, 4 * GameData.FPS)
            .to({ y: this.title.getY(-308 + this.offsetY) }, 2 * GameData.FPS)
            .to({ y: this.title.getY(-264 + this.offsetY) }, 2 * GameData.FPS)
            .to({ y: this.title.getY(-297 + this.offsetY) }, 2 * GameData.FPS)
            .to({ y: iy2 }, 2 * GameData.FPS);
        t4.wait(25 * GameData.FPS)
            .to({ scaleX: 1.08 * ScreenSolution.getInstance().minScale, scaleY: 1.08 * ScreenSolution.getInstance().minScale }, 4 * GameData.FPS)
            .to({ scaleX: 0.8 * ScreenSolution.getInstance().minScale, scaleY: 0.8 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS)
            .to({ scaleX: 1.03 * ScreenSolution.getInstance().minScale, scaleY: 1.03 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS)
            .to({ scaleX: 0.9 * ScreenSolution.getInstance().minScale, scaleY: 0.9 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS)
            .to({ scaleX: 1 * ScreenSolution.getInstance().minScale, scaleY: 1 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS);
        t5.wait(25 * GameData.FPS)
            .to({ scaleX: 1.08 * ScreenSolution.getInstance().minScale, scaleY: 1.08 * ScreenSolution.getInstance().minScale }, 4 * GameData.FPS)
            .to({ scaleX: 0.8 * ScreenSolution.getInstance().minScale, scaleY: 0.8 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS)
            .to({ scaleX: 1.03 * ScreenSolution.getInstance().minScale, scaleY: 1.03 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS)
            .to({ scaleX: 0.9 * ScreenSolution.getInstance().minScale, scaleY: 0.9 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS)
            .to({ scaleX: 1 * ScreenSolution.getInstance().minScale, scaleY: 1 * ScreenSolution.getInstance().minScale }, 2 * GameData.FPS).call(this.initEvent, this);
    };
    p.initEvent = function () {
        this.btnPlay.touchEnabled = true;
        this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this);
        this.btnHelp.touchEnabled = true;
        this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
        this.btnMore.touchEnabled = true;
        this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
        if (SpilAPI.getMoreObj().linkName == "more_games") {
        }
        else {
            this.btnMore.visible = false;
        }
    };
    p.onPlay = function (e) {
        this.removeEvent();
        this.fadeOut();
    };
    p.removeEvent = function () {
        this.btnPlay.touchEnabled = false;
        this.btnPlay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this);
        this.btnHelp.touchEnabled = false;
        this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
        this.btnMore.touchEnabled = false;
        this.btnMore.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
    };
    p.fadeOut = function () {
        var t1 = egret.Tween.get(this.girl);
        var t2 = egret.Tween.get(this.otherGirl);
        var t3 = egret.Tween.get(this.title);
        var t4 = egret.Tween.get(this.btnPlay);
        var t5 = egret.Tween.get(this.btnHelp);
        t4.to({ scaleX: 0, scaleY: 0 }, 5 * GameData.FPS);
        t5.to({ scaleX: 0, scaleY: 0 }, 5 * GameData.FPS);
        t3.wait(5 * GameData.FPS).to({ y: -250 * ScreenSolution.getInstance().hScale }, 5 * GameData.FPS);
        t2.wait(10 * GameData.FPS).to({ y: ScreenSolution.getInstance().curH + 600 * ScreenSolution.getInstance().hScale }, 5 * GameData.FPS);
        t1.wait(15 * GameData.FPS).to({ x: -400 * ScreenSolution.getInstance().wScale }, 5 * GameData.FPS).call(this.goNext, this);
    };
    p.goNext = function () {
        this.changeScene("map");
    };
    p.onHelp = function (e) {
        var helpLayer = new HelpLayer();
        this.btnsLayer.addChild(helpLayer);
    };
    p.onMore = function (e) {
        var o = SpilAPI.getMoreObj();
        if (o && o.hasOwnProperty("action") && o["action"] !== false) {
            o["action"]();
        }
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
    };
    return StartScene;
})(BaseLayer);
egret.registerClass(StartScene,'StartScene');
