/**
 *
 * @author
 *
 */
var ScreenSolution = (function () {
    function ScreenSolution() {
        this._listener = new Listener();
        this.sW = 960;
        this.sH = 640;
        this.srcW = 960;
        this.srcH = 640;
        this.update();
    }
    var d = __define,c=ScreenSolution,p=c.prototype;
    ScreenSolution.getInstance = function () {
        if (ScreenSolution._instance == null) {
            ScreenSolution._instance = new ScreenSolution();
        }
        return ScreenSolution._instance;
    };
    p.addListener = function (func, thisObj) {
        this._listener.addListener("resize", func, thisObj);
    };
    p.removeListener = function (func, thisObj) {
        this._listener.removeListener("resize", func, thisObj);
    };
    p.update = function () {
        if (window.innerWidth < window.innerHeight) {
            egret.MainContext.instance.stage.getChildAt(0).visible = false;
            return;
        }
        egret.MainContext.instance.stage.getChildAt(0).visible = true;
        this.curW = window.innerWidth;
        this.curH = window.innerHeight;
        this.isLandscape = this.curW > this.curH;
        this.bgScale = Math.max(this.curW / 960, this.curH / 640);
        if (this.isLandscape) {
            this.sW = 960;
            this.sH = 640;
        }
        else {
            this.sW = 640;
            this.sH = 960;
        }
        this.wScale = this.curW / this.sW;
        this.hScale = this.curH / this.sH;
        this.minScale = Math.min(this.wScale, this.hScale);
        this.maxScale = Math.max(this.wScale, this.hScale);
        this.stageScale = this.maxScale;
        this._listener.sendNotify("resize");
    };
    ScreenSolution._instance = null;
    return ScreenSolution;
})();
egret.registerClass(ScreenSolution,'ScreenSolution');
