/**
 *
 * @author
 *
 */
var PatienceSign = (function (_super) {
    __extends(PatienceSign, _super);
    function PatienceSign() {
        _super.call(this);
        this.restart();
    }
    var d = __define,c=PatienceSign,p=c.prototype;
    p.restart = function () {
        this.removeChildren();
        for (var i = 0; i < 5; i++) {
            var img = new egret.Bitmap(RES.getRes("game.heart"));
            img.x = -17;
            img.y = i * 36;
            this.addChild(img);
        }
    };
    p.show = function (n) {
        while (this.numChildren > n) {
            this.removeChildAt(this.numChildren - 1);
        }
    };
    return PatienceSign;
})(egret.DisplayObjectContainer);
egret.registerClass(PatienceSign,'PatienceSign');
