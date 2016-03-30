/**
 *
 * @author
 *
 */
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        _super.call(this);
    }
    var d = __define,c=MapScene,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bg = new egret.Shape();
        this.bgLayer.addChild(this.bg);
        this.content = new AutoResizeItem();
        var img = new egret.Bitmap(RES.getRes("mapbg"));
        img.x = -480 - 110;
        img.y = -320 - 129;
        this.content.addChild(img);
        var pos = [[83, 333], [209, 362], [351, 300], [459, 203], [572, 136], [697, 162], [797, 257], [605, 365], [490, 440], [605, 537], [762, 543], [877, 433]];
        for (var i = 0; i < 12; i++) {
            var lvBtn = new LevelButton(i + 1, i >= GameData.avaLevels);
            lvBtn.x = pos[i][0] - 480;
            lvBtn.y = pos[i][1] - 320;
            lvBtn.name = "lv_" + (i + 1).toString();
            this.content.addChild(lvBtn);
            if (i < GameData.avaLevels) {
                lvBtn.touchEnabled = true;
                lvBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLvTouched, this);
            }
        }
        var car = new egret.Bitmap(RES.getRes("map.car"));
        this.content.addChild(car);
        car.x = pos[GameData.avaLevels - 1][0] - 480 - 44;
        car.y = pos[GameData.avaLevels - 1][1] - 320 - 80 - 47;
        this.content.changeProps({ x: 480, y: 320 });
        this.gameLayer.addChild(this.content);
        var btnMore = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640), new egret.Point(0, 960));
        var moreImg = new egret.Bitmap(RES.getRes("start.btn_more"));
        btnMore.addChild(moreImg);
        moreImg.scaleX = moreImg.scaleY = 1.44;
        btnMore.changeProps({ x: -28, y: 514 });
        this.btnsLayer.addChild(btnMore);
        btnMore.touchEnabled = true;
        btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
        var logo = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(960, 640));
        var logoImg = new SpilLogo();
        logo.addChild(logoImg);
        logoImg.setPosition(-1, -1, -10, -10);
        logo.changeProps({ x: 960, y: 640 });
        this.btnsLayer.addChild(logo);
    };
    p.onMore = function (e) {
        var o = SpilAPI.getMoreObj();
        if (o && o.hasOwnProperty("action") && o["action"] !== false) {
            o["action"]();
        }
    };
    p.onLvTouched = function (e) {
        GameData.level = Number(e.currentTarget.name.substr(3));
        this.changeScene("game");
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0x5FD450);
        this.bg.graphics.drawRect(0, 0, ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
        this.bg.graphics.endFill();
    };
    return MapScene;
})(BaseLayer);
egret.registerClass(MapScene,'MapScene');
