/**
 *
 * @author
 *
 */
var Girl = (function (_super) {
    __extends(Girl, _super);
    function Girl(_type, pt1, pt2) {
        _super.call(this, _type, pt1, pt2);
        this.dress = new Dress();
        this.initUI();
    }
    var d = __define,c=Girl,p=c.prototype;
    p.initUI = function () {
    };
    p.init = function (sData) {
        this.dress.init(sData);
    };
    p.changePart = function (id, v) {
        this.dress.changePart(id, v);
    };
    p.autoNext = function (id, limit) {
        this.dress.autoNext(id, limit);
    };
    p.reset = function () {
        this.dress.reset();
    };
    p.getData = function () {
        return this.dress.getData();
    };
    return Girl;
})(AutoResizeItem);
egret.registerClass(Girl,'Girl');
