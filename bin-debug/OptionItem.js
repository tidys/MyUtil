/**
 *
 * @author
 *
 */
var OptionItem = (function (_super) {
    __extends(OptionItem, _super);
    function OptionItem(n, _locked, _type, pt1, pt2) {
        _super.call(this, _type, pt1, pt2);
        this.cupId = n;
        this._locked = _locked;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);
    }
    var d = __define,c=OptionItem,p=c.prototype;
    p.onTouched = function (e) {
    };
    p.unlock = function () {
    };
    return OptionItem;
})(AutoResizeItem);
egret.registerClass(OptionItem,'OptionItem');
