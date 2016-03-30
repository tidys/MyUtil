/**
 *
 * @author
 *
 */
var WinScene = (function (_super) {
    __extends(WinScene, _super);
    function WinScene() {
        _super.call(this);
    }
    var d = __define,c=WinScene,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        var title = new AutoResizeItem();
        var titleImg = new egret.Bitmap(RES.getRes("win.txt_congratulations"));
        titleImg.x = -titleImg.texture.textureWidth * 0.5;
        titleImg.y = -titleImg.texture.textureHeight * 0.5;
        title.addChild(titleImg);
        title.changeProps({ x: 480, y: 114 });
        this.gameLayer.addChild(title);
        var order = [1, 2, 4, 3, 5];
        var pos = [[81, 392], [170, 473], [674, 423], [615, 465], [858, 459]];
        for (var i = 0; i < 5; i++) {
            var r = this.createRole("r" + order[i]);
            r.changeProps({ x: pos[i][0], y: pos[i][1] });
            this.gameLayer.addChild(r);
        }
        var girl = this.createRole("girl");
        girl.changeProps({ x: 383, y: 421 });
        this.gameLayer.addChild(girl);
        var replayBtn = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        var replayImg = new egret.Bitmap(RES.getRes("win.btn_replay"));
        replayBtn.addChild(replayImg);
        replayBtn.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        replayBtn.changeProps({ x: 266, y: 472 });
        this.btnsLayer.addChild(replayBtn);
        var homeBtn = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        var homeImg = new egret.Bitmap(RES.getRes("win.btn_home"));
        homeBtn.addChild(homeImg);
        homeBtn.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        homeBtn.changeProps({ x: 411, y: 472 });
        this.btnsLayer.addChild(homeBtn);
        var moreBtn = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        var moreImg = new egret.Bitmap(RES.getRes("start.btn_more"));
        moreImg.scaleX = moreImg.scaleY = 136 / 113;
        moreBtn.addChild(moreImg);
        moreBtn.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        moreBtn.changeProps({ x: 557, y: 472 });
        this.btnsLayer.addChild(moreBtn);
        replayBtn.touchEnabled = true;
        replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplay, this);
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHome, this);
        moreBtn.touchEnabled = true;
        moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
    };
    p.onReplay = function (e) {
        this.goStr = "start";
        SpilAPI.needBreak(this, this.onAdPause, this.onAdResume);
    };
    p.onMore = function (e) {
        var o = SpilAPI.getMoreObj();
        if (o && o.hasOwnProperty("action") && o["action"] !== false) {
            o["action"]();
        }
    };
    p.onHome = function (e) {
        this.goStr = "map";
        SpilAPI.needBreak(this, this.onAdPause, this.onAdResume);
    };
    p.onAdPause = function () {
        SoundController.getInstance().autoMuteSound(true);
    };
    p.onAdResume = function () {
        SoundController.getInstance().autoMuteSound(false);
        this.changeScene(this.goStr);
    };
    p.createRole = function (id) {
        var rtn = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        var img = new egret.Bitmap(RES.getRes("win." + id));
        img.x = -img.texture.textureWidth * 0.5;
        img.y = -img.texture.textureHeight * 0.5;
        rtn.addChild(img);
        rtn.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        return rtn;
    };
    return WinScene;
})(BaseLayer);
egret.registerClass(WinScene,'WinScene');
