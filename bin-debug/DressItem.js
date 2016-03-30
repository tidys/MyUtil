/**
 *
 * @author
 *
 */
var DressItem = (function (_super) {
    __extends(DressItem, _super);
    function DressItem(idHolder) {
        _super.call(this);
        this.isSingle = false;
        this.idHolder = idHolder;
    }
    var d = __define,c=DressItem,p=c.prototype;
    p.show = function (n) {
        if (this.isSingle) {
            if (n == this.frame) {
                var view = new egret.Bitmap(RES.getRes(this.idHolder));
                this.addChild(view);
            }
            else {
                this.removeChildren();
            }
            return;
        }
        var s = n.toString();
        var key = this.idHolder.substr(0, this.idHolder.length - s.length) + s;
        this.removeChildren();
        if (n == 0) {
            return;
        }
        var view = new egret.Bitmap(RES.getRes(key));
        this.addChild(view);
    };
    p.setAsSingleFrame = function (n) {
        this.isSingle = true;
        this.frame = n;
    };
    return DressItem;
})(egret.DisplayObjectContainer);
egret.registerClass(DressItem,'DressItem');
