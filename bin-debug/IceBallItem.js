/**
 *
 * @author
 *
 */
var IceBallItem = (function (_super) {
    __extends(IceBallItem, _super);
    function IceBallItem(n, _locked, _type, pt1, pt2) {
        _super.call(this, n, _locked, _type, pt1, pt2);
        var img = new egret.Bitmap(RES.getRes("game.t_2_" + n.toString()));
        img.x = -img.texture.textureWidth * 0.5;
        img.y = -img.texture.textureHeight * 0.5;
        this.addChild(img);
        if (this._locked) {
            var img = new egret.Bitmap(RES.getRes("game.t_2_0"));
            img.x = -37;
            img.y = -24;
            this.addChild(img);
        }
    }
    var d = __define,c=IceBallItem,p=c.prototype;
    p.onTouched = function (e) {
        if (this._locked) {
            return;
        }
        this.dispatchEventWith("IceCreamChanged", true, { part: 2, val: this.cupId });
    };
    p.unlock = function () {
        if (!this._locked) {
            return;
        }
        this._locked = false;
        this.removeChildAt(1);
    };
    return IceBallItem;
})(OptionItem);
egret.registerClass(IceBallItem,'IceBallItem');
