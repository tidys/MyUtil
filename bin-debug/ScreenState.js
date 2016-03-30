/**
 *
 * @author
 *
 */
var ScreenState = (function () {
    function ScreenState() {
        this._listener = new Listener();
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, this.onActiveChange, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, this.onActiveChange, this);
    }
    var d = __define,c=ScreenState,p=c.prototype;
    ScreenState.getInstance = function () {
        if (ScreenState._instance == null) {
            ScreenState._instance = new ScreenState();
        }
        return ScreenState._instance;
    };
    p.isActive = function () {
        return this.status == ScreenState.STATUS_ACTIVE;
    };
    p.addListener = function (func, body) {
        this._listener.addListener(ScreenState.STATE_CHANGE, func, body);
    };
    p.removeListener = function (func, body) {
        this._listener.removeListener(ScreenState.STATE_CHANGE, func, body);
    };
    p.onActiveChange = function (e) {
        if (e.type == egret.Event.ACTIVATE) {
            this.status = ScreenState.STATUS_ACTIVE;
        }
        else {
            this.status = ScreenState.STATUS_DEACTIVE;
        }
        this._listener.sendNotify(ScreenState.STATE_CHANGE);
    };
    p.getHiddenProp = function () {
        var d = ["webkit", "moz", "ms", "o"];
        if ("hidden" in document)
            return "hidden";
        for (var a = 0; a < d.length; a++)
            if (d[a] + "Hidden" in document)
                return d[a] + "Hidden";
        return null;
    };
    ScreenState._instance = null;
    ScreenState.STATUS_ACTIVE = 1;
    ScreenState.STATUS_DEACTIVE = 2;
    ScreenState.STATE_CHANGE = "state_change";
    return ScreenState;
})();
egret.registerClass(ScreenState,'ScreenState');
