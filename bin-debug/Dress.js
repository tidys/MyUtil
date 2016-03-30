/**
 *
 * @author
 *
 */
var Dress = (function () {
    function Dress() {
        this.list = {};
        this.vData = {};
    }
    var d = __define,c=Dress,p=c.prototype;
    p.addPart = function (id, item) {
        if (!this.list.hasOwnProperty(id)) {
            this.list[id] = [];
        }
        this.list[id].push(item);
    };
    p.init = function (sData) {
        this.srcData = {};
        for (var m in this.list) {
            var arr = this.list[m];
            for (var n in arr) {
                arr[n].show(0);
            }
            if (!sData.hasOwnProperty(m)) {
                this.srcData[m] = 0;
            }
        }
        for (var m in sData) {
            this.srcData[m] = sData[m];
            var arr = this.list[m];
            for (var n in arr) {
                arr[n].show(sData[m]);
            }
            this.vData[m] = sData[m];
        }
    };
    p.changePart = function (id, v) {
        var arr = this.list[id];
        for (var m in arr) {
            arr[m].show(v);
        }
        this.vData[id] = v;
    };
    p.reset = function () {
        for (var m in this.list) {
            if (this.srcData.hasOwnProperty(m)) {
                this.changePart(m, this.srcData[m]);
            }
            else {
                this.changePart(m, 0);
            }
        }
    };
    p.autoNext = function (id, limits) {
        var s = 0;
        if (this.vData.hasOwnProperty(id)) {
            s = this.vData[id];
        }
        s++;
        if (s > limits) {
            s = 1;
        }
        this.changePart(id, s);
    };
    p.getData = function () {
        var rtn = {};
        for (var m in this.list) {
            if (this.vData.hasOwnProperty(m)) {
                rtn[m] = this.vData[m];
            }
            else {
                rtn[m] = 0;
            }
        }
        return rtn;
    };
    return Dress;
})();
egret.registerClass(Dress,'Dress');
