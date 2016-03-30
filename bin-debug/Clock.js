/**
 *
 * @author
 *
 */
var Clock = (function (_super) {
    __extends(Clock, _super);
    function Clock(_type, pt1, pt2) {
        if (_type === void 0) { _type = 1; }
        if (pt1 === void 0) { pt1 = null; }
        if (pt2 === void 0) { pt2 = null; }
        _super.call(this, _type, pt1, pt2);
        var bg = new egret.Bitmap(RES.getRes("game.clockBg"));
        this.addChild(bg);
        this.txt = new egret.TextField();
        this.txt.fontFamily = "Arial";
        this.txt.bold = true;
        this.txt.size = 34;
        this.txt.textColor = 0x990000;
        this.txt.width = 87;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.text = "00:00";
        this.txt.y = 50;
        this.txt.x = 5;
        this.addChild(this.txt);
    }
    var d = __define,c=Clock,p=c.prototype;
    p.setTime = function (n) {
        n = Math.round(n);
        var m = Math.floor(n / 60);
        var s = n % 60;
        this.txt.text = (m < 10 ? '0' : '') + m.toString() + ':' + (s < 10 ? '0' : '') + s.toString();
    };
    return Clock;
})(AutoResizeItem);
egret.registerClass(Clock,'Clock');
