/**
 *
 * @author
 *
 */
var AutoExtendItem = (function (_super) {
    __extends(AutoExtendItem, _super);
    function AutoExtendItem() {
        _super.call(this);
        this.isInited = false;
        this.itemClass = [];
        this.childrenList = [];
    }
    var d = __define,c=AutoExtendItem,p=c.prototype;
    p.addItem = function (item, initProps) {
        this.itemClass.push({ def: item, props: initProps });
    };
    p.start = function () {
        this.isInited = true;
        this.relayout("");
    };
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.start();
    };
    p.move = function (dx) {
        for (var i = this.numChildren - 1; i >= 0; i--) {
            var item = this.getChildAt(i);
            item.x += dx;
        }
        this.update();
    };
    p.parseItemRect = function (item) {
        var r = item.getBounds();
        r.offset(item.x, item.y);
        r.x = (r.x * this.scaleX + this.x);
        r.y = (r.y * this.scaleY + this.y);
        r.width = r.width * this.scaleX;
        r.height = r.height * this.scaleY;
        return r;
    };
    p.update = function () {
        if (!this.isInited) {
            return;
        }
        this.rect = new egret.Rectangle(0, 0, ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
        // remove first
        while (this.numChildren) {
            var first = this.childrenList[0];
            var r = this.parseItemRect(first.view);
            if (r.right < -10) {
                // remove it
                this.removeChild(first.view);
                this.childrenList.shift();
            }
            else {
                break;
            }
        }
        // last item from the childrenList;
        // remove last
        while (this.numChildren) {
            var last = this.childrenList[this.childrenList.length - 1];
            var r = this.parseItemRect(last.view);
            if (r.left > this.rect.right + 10) {
                // remove
                this.removeChild(last.view);
                this.childrenList.pop();
            }
            else {
                break;
            }
        }
        var isChanged = false;
        do {
            var insertBefore = false;
            if (this.childrenList.length == 0) {
                insertBefore = true;
            }
            else {
                var o = this.childrenList[0];
                var r = this.parseItemRect(o.view);
                if (r.x > -10) {
                    insertBefore = true;
                }
            }
            if (insertBefore) {
                var index;
                if (this.childrenList.length == 0) {
                    index = 0;
                }
                else {
                    index = this.childrenList[0].index - 1;
                    if (index < 0) {
                        index = this.itemClass.length - 1;
                    }
                }
                var item = new this.itemClass[index].def();
                for (var m in this.itemClass[index].props) {
                    item[m] = this.itemClass[index].props[m];
                }
                if (this.numChildren == 0) {
                    item.x = 0;
                }
                else {
                    item.x = this.childrenList[0].view.x - item.width;
                }
                this.addChildAt(item, 0);
                this.childrenList.unshift(new AutoExtendVo(item, index));
            }
            var insertAfter = false;
            var o = this.childrenList[this.childrenList.length - 1];
            var r = this.parseItemRect(o.view);
            if (r.right < this.rect.right) {
                insertAfter = true;
            }
            if (insertAfter) {
                var index = this.childrenList[this.childrenList.length - 1].index + 1;
                if (index == this.itemClass.length) {
                    index = 0;
                }
                var item = new this.itemClass[index].def();
                for (var m in this.itemClass[index].props) {
                    item[m] = this.itemClass[index].props[m];
                }
                item.x = this.childrenList[this.childrenList.length - 1].view.x + this.childrenList[this.childrenList.length - 1].view.width;
                this.addChild(item);
                this.childrenList.push(new AutoExtendVo(item, index));
            }
            if (!insertBefore && !insertAfter) {
                break;
            }
        } while (true);
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
        this.scaleX = this.scaleY = ScreenSolution.getInstance().minScale;
        this.update();
    };
    return AutoExtendItem;
})(BaseLayer);
egret.registerClass(AutoExtendItem,'AutoExtendItem');
