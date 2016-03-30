/**
 *
 * @author
 *
 */
var CsVo = (function () {
    function CsVo() {
        this.status = CsVo.ST_IDLE;
    }
    var d = __define,c=CsVo,p=c.prototype;
    p.tick = function (dt) {
        if (this.status == CsVo.ST_WAIT) {
            this.passTimes += dt / 1000;
            var heart = Math.ceil((GameData.CS_TIME - this.passTimes) / 10);
            this.order.showPatience(heart);
            if (heart <= 2) {
                this.view.changeEm(3);
            }
            if (GameData.CS_TIME < this.passTimes) {
                // left
                this.status = CsVo.ST_LEFT_TIMEOVER;
                this.view.changeEm(4);
                this.order.addEventListener("OrderHidden", this.onOrderHidden, this);
                SimpleSound.playFx("fx_leave");
                this.order.fadeOut();
            }
        }
        else if (this.status == CsVo.ST_LEFT_TIMEOVER) {
        }
    };
    p.onOrderHidden = function () {
        this.order.removeEventListener("OrderHidden", this.onOrderHidden, this);
        this.view.parent.removeChild(this.view);
        this.view = null;
        this.status = CsVo.ST_IDLE;
    };
    p.doFeed = function (foodData) {
        for (var m in this.orderData) {
            if ((foodData.hasOwnProperty(m) && foodData[m] === this.orderData[m]) || (!foodData.hasOwnProperty(m) && this.orderData[m] === 0)) {
            }
            else {
                return false;
            }
        }
        for (var m in foodData) {
            if ((this.orderData.hasOwnProperty(m) && foodData[m] === this.orderData[m]) || (!this.orderData.hasOwnProperty(m) && foodData[m] === 0)) {
            }
            else {
                return false;
            }
        }
        this.status = CsVo.ST_PAY;
        this.view.changeEm(2);
        this.order.showPay();
        this.order.addEventListener("Payed", this.onPayed, this);
        return true;
    };
    p.onPayed = function () {
        this.order.removeEventListener("Payed", this.onPayed, this);
        this.status = CsVo.ST_PAYED;
        this.view.parent.removeChild(this.view);
        this.view = null;
    };
    p.reset = function () {
        if (this.view) {
            this.view.parent.removeChild(this.view);
            this.view = null;
        }
        this.status = CsVo.ST_IDLE;
        this.order.reset();
    };
    p.getMoney = function () {
        var money = 0;
        for (var m in this.orderData) {
            money += GameData.PRICE[m];
        }
        this.status = CsVo.ST_IDLE;
        return money;
    };
    p.start = function (orderData) {
        this.passTimes = 0;
        this.status = CsVo.ST_SHOW;
        this.order.addEventListener("OrderShowed", this.onOrderShowed, this);
        this.order.show(orderData);
        this.orderData = orderData;
    };
    p.onOrderShowed = function (e) {
        this.order.removeEventListener("OrderShowed", this.onOrderShowed, this);
        this.status = CsVo.ST_WAIT;
    };
    CsVo.ST_IDLE = 1;
    CsVo.ST_SHOW = 2;
    CsVo.ST_WAIT = 3;
    CsVo.ST_LEFT_TIMEOVER = 4;
    CsVo.ST_PAY = 5;
    CsVo.ST_PAYED = 6;
    return CsVo;
})();
egret.registerClass(CsVo,'CsVo');
