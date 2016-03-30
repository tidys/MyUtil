/**
 *
 * @author
 *
 */
var CupItem = (function (_super) {
    __extends(CupItem, _super);
    function CupItem(n, _locked, _type, pt1, pt2) {
        _super.call(this, n, _locked, _type, pt1, pt2);
        var img = new egret.Bitmap(RES.getRes(this._locked ? "game.t_1_0" : "game.t_1_" + n.toString()));
        img.x = -img.texture.textureWidth * 0.5;
        img.y = -img.texture.textureHeight;
        this.addChild(img);
    }
    var d = __define,c=CupItem,p=c.prototype;
    p.onTouched = function (e) {
        if (this._locked) {
            return;
        }
        this.dispatchEventWith("IceCreamChanged", true, { part: 1, val: this.cupId });
    };
    p.unlock = function () {
        if (!this._locked) {
            return;
        }
        this.removeChildren();
        this._locked = false;
        var img = new egret.Bitmap(RES.getRes("game.t_1_" + this.cupId.toString()));
        img.x = -img.texture.textureWidth * 0.5;
        img.y = -img.texture.textureHeight;
        this.addChild(img);
    };
    return CupItem;
})(OptionItem);
egret.registerClass(CupItem,'CupItem');
