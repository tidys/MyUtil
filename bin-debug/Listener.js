/**
 *
 * @author
 *
 */
var Listener = (function () {
    function Listener() {
        this._listeners = {};
    }
    var d = __define,c=Listener,p=c.prototype;
    p.addListener = function (type, func, thisObj) {
        if (!this._listeners.hasOwnProperty(type)) {
            this._listeners[type] = [];
        }
        this._listeners[type].push({ func: func, thisObj: thisObj });
    };
    p.removeListener = function (type, func, thisObj) {
        if (!this._listeners.hasOwnProperty(type)) {
            return;
        }
        var arr = this._listeners[type];
        for (var i = arr.length - 1; i >= 0; i--) {
            var o = arr[i];
            if (o.func == func && o.thisObj == thisObj) {
                arr.splice(i, 1);
                return;
            }
        }
    };
    p.sendNotify = function (type) {
        if (!this._listeners.hasOwnProperty(type)) {
            return;
        }
        var arr = this._listeners[type];
        for (var i = arr.length - 1; i >= 0; i--) {
            var o = arr[i];
            o.func.apply(o.thisObj, [type]);
        }
    };
    return Listener;
})();
egret.registerClass(Listener,'Listener');
