/**
 *
 * @author
 *
 */
var SpilLogo = (function (_super) {
    __extends(SpilLogo, _super);
    function SpilLogo() {
        _super.call(this);
        this.xPos = 0;
        this.yPos = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        if (SpilLogo.hasLogo) {
            if (SpilLogo.logoTexture != null) {
                this.showLogo();
            }
            else {
                SpilLogo._listeners.push(this);
            }
        }
    }
    var d = __define,c=SpilLogo,p=c.prototype;
    SpilLogo.loadLogo = function (logoUrl) {
        RES.getResByUrl(logoUrl, SpilLogo.onLogoLoaded, SpilAPI);
    };
    SpilLogo.onLogoLoaded = function (t) {
        SpilLogo.logoTexture = t;
        for (var i = SpilLogo._listeners.length - 1; i >= 0; i--) {
            SpilLogo._listeners[i].showLogo();
        }
        SpilLogo._listeners = [];
    };
    p.setPosition = function (xPos, yPos, xOffset, yOffset) {
        if (xPos === void 0) { xPos = 0; }
        if (yPos === void 0) { yPos = 0; }
        if (xOffset === void 0) { xOffset = 0; }
        if (yOffset === void 0) { yOffset = 0; }
        this.xPos = xPos;
        this.yPos = yPos;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        if (this.numChildren > 0) {
            this.updatePos();
        }
    };
    p.updatePos = function () {
        var view = this.getChildAt(0);
        view.x = this.xPos * SpilLogo.logoTexture.textureWidth + this.xOffset;
        view.y = this.yPos * SpilLogo.logoTexture.textureHeight + this.yOffset;
    };
    p.showLogo = function () {
        var view = new egret.Bitmap(SpilLogo.logoTexture);
        this.addChild(view);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.updatePos();
    };
    p.onClick = function (e) {
        SpilAPI.getLogoAction().apply(null, []);
    };
    SpilLogo.logoTexture = null;
    SpilLogo._listeners = [];
    SpilLogo.hasLogo = false;
    return SpilLogo;
})(egret.DisplayObjectContainer);
egret.registerClass(SpilLogo,'SpilLogo');
