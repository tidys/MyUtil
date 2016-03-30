/**
 *
 * @author
 *
 */
var LevelButton = (function (_super) {
    __extends(LevelButton, _super);
    function LevelButton(n, _isNew) {
        _super.call(this);
        this.bg = new egret.Bitmap(RES.getRes("map.levelBtnBg" + (_isNew ? "" : "2")));
        this.bg.x = -67;
        this.bg.y = -67;
        this.addChild(this.bg);
        this.txt = new egret.TextField();
        this.txt.width = 100;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.textColor = 0x990000;
        this.txt.fontFamily = "Arial";
        this.txt.bold = true;
        this.txt.x = -65;
        this.txt.y = -28;
        this.txt.size = 40;
        this.txt.text = n.toString();
        this.val = n;
        this.addChild(this.txt);
    }
    var d = __define,c=LevelButton,p=c.prototype;
    return LevelButton;
})(egret.DisplayObjectContainer);
egret.registerClass(LevelButton,'LevelButton');
