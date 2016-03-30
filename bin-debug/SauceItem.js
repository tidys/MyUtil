/**
 *
 * @author
 *
 */
var SauceItem = (function (_super) {
    __extends(SauceItem, _super);
    function SauceItem(n, _locked, _type, pt1, pt2) {
        _super.call(this, n, _locked, _type, pt1, pt2);
        var floor = new egret.Bitmap(RES.getRes("game.t_3_0"));
        floor.x = -42;
        floor.y = -5;
        this.addChild(floor);
        var img = new egret.Bitmap(RES.getRes(this._locked ? "game.t_3_00" : "game.t_3_" + n.toString()));
        if (this._locked) {
            img.x = -37;
            img.y = -3;
        }
        else {
            img.x = -32;
            img.y = -50;
        }
        this.addChild(img);
    }
    var d = __define,c=SauceItem,p=c.prototype;
    p.onTouched = function (e) {
        if (this._locked) {
            return;
        }
        this.dispatchEventWith("IceCreamChanged", true, { part: 3, val: this.cupId });
    };
    p.unlock = function () {
        if (!this._locked) {
            return;
        }
        this.removeChildAt(1);
        this._locked = false;
        var img = new egret.Bitmap(RES.getRes("game.t_3_" + this.cupId.toString()));
        img.x = -32;
        img.y = -50;
        this.addChild(img);
    };
    return SauceItem;
})(OptionItem);
egret.registerClass(SauceItem,'SauceItem');
