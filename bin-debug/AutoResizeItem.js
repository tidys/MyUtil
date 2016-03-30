/**
 *
 * @author
 *
 */
var AutoResizeItem = (function (_super) {
    __extends(AutoResizeItem, _super);
    function AutoResizeItem(_type, _lockPt, _portraitPt) {
        if (_type === void 0) { _type = 1; }
        if (_lockPt === void 0) { _lockPt = null; }
        if (_portraitPt === void 0) { _portraitPt = null; }
        _super.call(this);
        this.lockPts = {
            landscape: null,
            portrait: null
        };
        this._debug = false;
        this.resizeType = _type;
        this.xPolicy = AutoResizeItem.RT_AUTO;
        this.yPolicy = AutoResizeItem.RT_AUTO;
        this.locked = false;
        if (_type == AutoResizeItem.RT_RELATIVE_TO) {
            this.setRelativePt(_lockPt, _portraitPt);
        }
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        this.sProps = { scaleX: 1, scaleY: 1, x: 0, y: 0 };
        this.sPortraitProps = { scaleX: 1, scaleY: 1, x: 0, y: 0 };
    }
    var d = __define,c=AutoResizeItem,p=c.prototype;
    p.setLockPt = function (landPt, portraitPt) {
        this.lockPts["landscape"] = landPt;
        this.lockPts["portrait"] = portraitPt;
    };
    p.setLocked = function (b) {
        this.locked = b;
        if (!b) {
            this.relayout("");
        }
    };
    p.setDebug = function (b) {
        this._debug = b;
    };
    p.setRelativePt = function (pt, _port) {
        if (_port === void 0) { _port = null; }
        this.xPolicy = AutoResizeItem.RT_RELATIVE_TO;
        this.yPolicy = AutoResizeItem.RT_RELATIVE_TO;
        this.lockPts["landscape"] = pt.clone();
        this.lockPts["portrait"] = _port ? _port.clone() : null;
        this.relativePt = pt.clone();
    };
    p.setPolicy = function (xPolicy, yPolicy) {
        this.xPolicy = xPolicy;
        this.yPolicy = yPolicy;
    };
    p.onAdded = function (e) {
        ScreenSolution.getInstance().addListener(this.relayout, this);
        this.relayout("");
    };
    p.onRemoved = function (e) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        ScreenSolution.getInstance().removeListener(this.relayout, this);
    };
    /**
     * relayout items; called by the ScreenSolution automatically when size of the window changed
     * you can call this necica
     */
    p.relayout = function (type) {
        if (this.locked) {
            if (this._debug) {
                console.log("locked, cannot relayout");
            }
            return;
        }
        if (this._debug) {
            console.log("relayout", this.sProps["x"]);
        }
        var sProps = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        this.scaleX = sProps["scaleX"] * ScreenSolution.getInstance().minScale;
        this.scaleY = sProps["scaleY"] * ScreenSolution.getInstance().minScale;
        this.x = this.getSelfX();
        this.y = this.getSelfY();
    };
    p.getSelfX = function () {
        var sProps = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        if (this.xPolicy == AutoResizeItem.RT_AUTO) {
            return sProps["x"] * ScreenSolution.getInstance().wScale;
        }
        else {
            var relativePt = this.getRelativePt();
            return relativePt.x * ScreenSolution.getInstance().wScale - (relativePt.x - sProps["x"]) * ScreenSolution.getInstance().minScale;
        }
    };
    p.getSelfY = function () {
        var sProps = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        if (this.yPolicy == AutoResizeItem.RT_AUTO) {
            return sProps["y"] * ScreenSolution.getInstance().hScale;
        }
        else {
            var relativePt = this.getRelativePt();
            return relativePt.y * ScreenSolution.getInstance().hScale - (relativePt.y - sProps["y"]) * ScreenSolution.getInstance().minScale;
        }
    };
    p.getRelativePt = function () {
        var relativePt = this.lockPts['landscape'];
        if (!ScreenSolution.getInstance().isLandscape) {
            if (this.lockPts['portrait'] != null) {
                relativePt = this.lockPts['portrait'];
            }
        }
        else {
        }
        return relativePt;
    };
    p.update = function () {
        this.relayout("");
    };
    p.changeProps = function (propsObj, portObj) {
        if (portObj === void 0) { portObj = null; }
        for (var m in propsObj) {
            this.sProps[m] = propsObj[m];
        }
        if (portObj) {
            for (var m in portObj) {
                this.sPortraitProps[m] = portObj[m];
            }
        }
        this.relayout("");
    };
    /**
     * calculate the x value.
     */
    p.getX = function (sValue) {
        if (this.xPolicy == AutoResizeItem.RT_AUTO) {
            return sValue * ScreenSolution.getInstance().wScale;
        }
        var relativePt = this.getRelativePt();
        return relativePt.x * ScreenSolution.getInstance().wScale - (relativePt.x - sValue) * ScreenSolution.getInstance().minScale;
    };
    /**
     * calculate the targetX with the step of dx
     *
     */
    p.getOffsetX = function (dx) {
        var sProps = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        return this.getX(sProps["x"] + dx);
    };
    p.getOffsetY = function (dy) {
        var sProps = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        return this.getY(sProps["y"] + dy);
    };
    /**
     * move by the offset
     */
    p.moveBy = function (dx, dy) {
        var sProps = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        this.changeProps({ x: sProps["x"] + dx, y: sProps["y"] + dy });
    };
    /**
     * move to the target
     */
    p.moveTo = function (tx, ty) {
        this.changeProps({ x: tx, y: ty });
    };
    /**
     * get target y of the
     */
    p.getY = function (sValue) {
        if (this.yPolicy == AutoResizeItem.RT_AUTO) {
            return sValue * ScreenSolution.getInstance().hScale;
        }
        var relativePt = this.getRelativePt();
        return relativePt.y * ScreenSolution.getInstance().hScale - (relativePt.y - sValue) * ScreenSolution.getInstance().minScale;
    };
    /**
     * tx : x coordinate before resize
     * ty : y coordinate before reisze
     * @return egret.Point. the target point after resize
     */
    p.getPosition = function (tx, ty) {
        return new egret.Point(this.getX(tx), this.getY(ty));
    };
    AutoResizeItem.RT_AUTO = 1;
    AutoResizeItem.RT_RELATIVE_TO = 2;
    return AutoResizeItem;
})(egret.DisplayObjectContainer);
egret.registerClass(AutoResizeItem,'AutoResizeItem');
