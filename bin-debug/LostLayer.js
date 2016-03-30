/**
 *
 * @author
 *
 */
var LostLayer = (function (_super) {
    __extends(LostLayer, _super);
    function LostLayer(money, goal) {
        _super.call(this);
        this.money = money;
        this.goal = goal;
    }
    var d = __define,c=LostLayer,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bg = new egret.Shape();
        this.bgLayer.addChild(this.bg);
        var content = new AutoResizeItem();
        this.bg.touchEnabled = true;
        var panel = new egret.Bitmap(RES.getRes("fail.panel"));
        panel.x = 240 - 480;
        panel.y = 100 - 320;
        content.addChild(panel);
        var txt = new egret.Bitmap(RES.getRes("fail.txt_gameover"));
        txt.x = 319 - 480;
        txt.y = 178 - 320;
        content.addChild(txt);
        var moneyImg = new egret.Bitmap(RES.getRes("game.i_money"));
        moneyImg.scaleX = moneyImg.scaleY = 1.15;
        moneyImg.x = 367 - 480;
        moneyImg.y = 281 - 320;
        content.addChild(moneyImg);
        var goalImg = new egret.Bitmap(RES.getRes("game.i_target"));
        goalImg.scaleX = goalImg.scaleY = 1.2;
        goalImg.x = 578 - 480;
        goalImg.y = 274 - 320;
        content.addChild(goalImg);
        var moneyBg = new egret.Shape();
        moneyBg.graphics.lineStyle(2, 0xA82B2B);
        moneyBg.graphics.beginFill(0xF58282);
        moneyBg.graphics.drawRoundRect(0, 0, 60, 34, 10, 10);
        moneyBg.graphics.endFill();
        moneyBg.x = 509 - 480;
        moneyBg.y = 282 - 320;
        content.addChild(moneyBg);
        var goalBg = new egret.Shape();
        goalBg.graphics.lineStyle(2, 0xA82B2B);
        goalBg.graphics.beginFill(0xF58282);
        goalBg.graphics.drawRoundRect(0, 0, 60, 34, 10, 10);
        goalBg.graphics.endFill();
        goalBg.x = 726 - 480;
        goalBg.y = 282 - 320;
        content.addChild(goalBg);
        var moneyTxt = new egret.TextField();
        moneyTxt.textColor = 0xA01717;
        moneyTxt.size = 22;
        moneyTxt.bold = true;
        moneyTxt.width = 60;
        moneyTxt.textAlign = egret.HorizontalAlign.CENTER;
        moneyTxt.text = this.money.toString();
        moneyTxt.fontFamily = "Arial";
        moneyTxt.x = 509 - 480;
        moneyTxt.y = 282 - 320 + 8;
        content.addChild(moneyTxt);
        var goalTxt = new egret.TextField();
        goalTxt.textColor = 0xA01717;
        goalTxt.size = 22;
        goalTxt.bold = true;
        goalTxt.width = 60;
        goalTxt.textAlign = egret.HorizontalAlign.CENTER;
        goalTxt.text = this.goal.toString();
        goalTxt.fontFamily = "Arial";
        goalTxt.x = 726 - 480;
        goalTxt.y = 282 - 320 + 8;
        content.addChild(goalTxt);
        var girl = new egret.Bitmap(RES.getRes("fail.girl"));
        girl.x = 105 - 480;
        girl.y = 57 - 320;
        content.addChild(girl);
        var nextBtn = new egret.Bitmap(RES.getRes("game.btn_retry"));
        nextBtn.x = 365 - 480;
        nextBtn.y = 381 - 320;
        content.addChild(nextBtn);
        var homeBtn = new egret.Bitmap(RES.getRes("game.btn_home"));
        homeBtn.x = 516 - 480;
        homeBtn.y = 381 - 320;
        content.addChild(homeBtn);
        var moreBtn = new egret.Bitmap(RES.getRes("start.btn_more"));
        moreBtn.scaleX = moreBtn.scaleY = 125 / 113;
        moreBtn.x = 666 - 480;
        moreBtn.y = 381 - 320;
        content.addChild(moreBtn);
        content.changeProps({ x: 480, y: 320 });
        this.gameLayer.addChild(content);
        nextBtn.touchEnabled = true;
        nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRetry, this);
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHome, this);
        moreBtn.touchEnabled = true;
        moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
        content.visible = false;
    };
    p.start = function () {
        _super.prototype.start.call(this);
        var content = this.gameLayer.getChildAt(0);
        content.y = -ScreenSolution.getInstance().curH;
        content.visible = true;
        egret.Tween.get(content).to({ y: content.getSelfY() }, 10 * GameData.FPS, egret.Ease.backOut);
    };
    p.onRetry = function (e) {
        this.dispatchEventWith("GamePanelEvent", true, { type: "Retry", from: "lost" });
    };
    p.onHome = function (e) {
        this.dispatchEventWith("GamePanelEvent", true, { type: "Home", from: "lost" });
    };
    p.onMore = function (e) {
        this.dispatchEventWith("GamePanelEvent", true, { type: "More", from: "lost" });
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0x0000, 0.3);
        this.bg.graphics.drawRect(0, 0, ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
        this.bg.graphics.endFill();
    };
    return LostLayer;
})(BaseLayer);
egret.registerClass(LostLayer,'LostLayer');
