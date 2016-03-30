/**
 *
 * @author
 *
 */
var BaseLayer = (function (_super) {
    __extends(BaseLayer, _super);
    function BaseLayer() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }
    var d = __define,c=BaseLayer,p=c.prototype;
    p.onRemoved = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        ScreenSolution.getInstance().removeListener(this.relayout, this);
    };
    p.onAdded = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.initUI();
        ScreenSolution.getInstance().addListener(this.relayout, this);
        this.relayout("");
        this.start();
    };
    p.start = function () {
    };
    p.initUI = function () {
        this.bgLayer = new egret.DisplayObjectContainer();
        this.addChild(this.bgLayer);
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        this.btnsLayer = new egret.DisplayObjectContainer();
        this.addChild(this.btnsLayer);
    };
    p.relayout = function (type) {
    };
    p.jump = function (str) {
    };
    p.changeScene = function (str) {
        this.dispatchEventWith("SceneChanged", true, { scene: str });
    };
    return BaseLayer;
})(egret.DisplayObjectContainer);
egret.registerClass(BaseLayer,'BaseLayer');
