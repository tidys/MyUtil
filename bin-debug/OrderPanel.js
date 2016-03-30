/**
 *
 * @author
 *
 */
var OrderPanel = (function (_super) {
    __extends(OrderPanel, _super);
    function OrderPanel(_type, pt1, pt2) {
        if (_type === void 0) { _type = 1; }
        if (pt1 === void 0) { pt1 = null; }
        if (pt2 === void 0) { pt2 = null; }
        _super.call(this, _type, pt1, pt2);
        this.content = new egret.DisplayObjectContainer();
        this.addChild(this.content);
        var bg = new egret.Bitmap(RES.getRes("game.pao_bg"));
        bg.x = -2;
        bg.y = -199;
        this.content.addChild(bg);
        this.bg = bg;
        var icecream = new IceCream();
        icecream.setLocked(true);
        icecream.x = 70;
        icecream.y = -100;
        icecream.scaleX = icecream.scaleY = 0.91;
        icecream.init({});
        this.content.addChild(icecream);
        this.icecream = icecream;
        this.paySign = new egret.Bitmap(RES.getRes("game.money"));
        this.paySign.x = 55;
        this.paySign.y = -141;
        this.content.addChild(this.paySign);
        this.paySign.visible = false;
        this.patienceSign = new PatienceSign();
        this.patienceSign.x = 129;
        this.patienceSign.y = -185;
        this.content.addChild(this.patienceSign);
        this.content.scaleX = this.content.scaleY = 0;
        this.txt = new egret.TextField();
        this.txt.wordWrap = true;
        this.txt.width = bg.texture.textureWidth;
        this.txt.x = bg.x;
        this.txt.y = bg.y;
        this.txt.textColor = 0x000000;
        this.txt.size = 12;
        this.content.addChild(this.txt);
        this.txt.visible = false;
    }
    var d = __define,c=OrderPanel,p=c.prototype;
    p.showPatience = function (n) {
        this.patienceSign.show(n);
    };
    p.fadeOut = function () {
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0 }, 15 * GameData.FPS).call(this.onHide, this);
    };
    p.onHide = function () {
        this.dispatchEventWith("OrderHidden");
    };
    p.reset = function () {
        this.content.scaleX = this.content.scaleY = 0;
    };
    p.showPay = function () {
        this.icecream.visible = false;
        this.paySign.visible = true;
        this.patienceSign.visible = false;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    p.onClick = function (e) {
        SimpleSound.playFx("fx_money");
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.bg.visible = false;
        egret.Tween.get(this.paySign).to({ y: -250, alpha: 0 }, 8 * GameData.FPS).call(this.onPayed, this);
    };
    p.onPayed = function () {
        this.bg.visible = true;
        this.content.scaleX = this.content.scaleY = 0;
        this.paySign.y = -141;
        this.paySign.alpha = 1;
        this.dispatchEventWith("Payed");
    };
    p.show = function (sData) {
        var str = "{";
        for (var m in sData) {
            str += m + ":" + sData[m] + ",";
        }
        str += "}";
        this.txt.text = str;
        this.icecream.visible = true;
        this.paySign.visible = false;
        this.patienceSign.visible = true;
        this.patienceSign.restart();
        this.icecream.init(sData);
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        egret.Tween.get(this.content).to({ scaleX: 1, scaleY: 1 }, 15 * GameData.FPS, egret.Ease.backOut).call(this.onShowed, this);
    };
    p.onShowed = function () {
        this.dispatchEventWith("OrderShowed");
    };
    return OrderPanel;
})(AutoResizeItem);
egret.registerClass(OrderPanel,'OrderPanel');
