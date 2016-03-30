/**
 *
 * @author
 *
 */
var IconItem = (function (_super) {
    __extends(IconItem, _super);
    function IconItem(n, _locked, _type, pt1, pt2) {
        _super.call(this, n, _locked, _type, pt1, pt2);
        this.pos = [[-42, -44], [-57, -50], [-59, -50]];
        var floor = new egret.Bitmap(RES.getRes("game.t_5_0"));
        floor.x = -63;
        floor.y = -42;
        this.addChild(floor);
        var img = new egret.Bitmap(RES.getRes("game.t_5_" + (this._locked ? "00" : n.toString())));
        if (this._locked) {
            img.x = -54;
            img.y = -39;
        }
        else {
            img.x = this.pos[n - 1][0];
            img.y = this.pos[n - 1][1];
        }
        this.addChild(img);
    }
    var d = __define,c=IconItem,p=c.prototype;
    p.onTouched = function (e) {
        if (this._locked) {
            return;
        }
        this.dispatchEventWith("IceCreamChanged", true, { part: 5, val: this.cupId });
    };
    p.unlock = function () {
        if (!this._locked) {
            return;
        }
        this._locked = false;
        this.removeChildAt(1);
        var img = new egret.Bitmap(RES.getRes("game.t_5_" + this.cupId.toString()));
        img.x = this.pos[this.cupId - 1][0];
        img.y = this.pos[this.cupId - 1][1];
        this.addChild(img);
    };
    return IconItem;
})(OptionItem);
egret.registerClass(IconItem,'IconItem');
