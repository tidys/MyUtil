/**
 *
 * @author
 *
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(_dir, texture, sPos) {
        _super.call(this);
        this.dir = _dir;
        this.texture = texture;
        this.sPos = sPos;
        if (!this.sPos.hasOwnProperty("gap")) {
            this.sPos["gap"] = 0;
        }
    }
    var d = __define,c=Tile,p=c.prototype;
    p.render = function (min, max) {
        this.removeChildren();
        var ival = min;
        do {
            var item = new egret.Bitmap(this.texture);
            item.scaleX = item.scaleY = ScreenSolution.getInstance().minScale;
            item[this.dir] = ival;
            if (this.dir == "x") {
                item.y = this.sPos["y"];
                ival += this.texture.textureWidth * ScreenSolution.getInstance().minScale + this.sPos["gap"];
            }
            else {
                item.x = this.sPos["x"];
                ival += this.texture.textureHeight * ScreenSolution.getInstance().minScale + this.sPos["gap"];
            }
            this.addChild(item);
        } while (ival < max);
    };
    return Tile;
})(egret.DisplayObjectContainer);
egret.registerClass(Tile,'Tile');
