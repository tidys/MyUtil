/**
 *
 * @author 
 *
 */
class CsVo {
    public holder:AutoResizeItem;
    public view:Customer;
    public order:OrderPanel;
    public status:number;
    
    static ST_IDLE:number = 1;
    static ST_SHOW:number = 2;
    static ST_WAIT:number = 3;
    static ST_LEFT_TIMEOVER:number = 4;
    static ST_PAY:number = 5;
    static ST_PAYED:number = 6;
    public passTimes:number;
    public orderData:Object;
    
	public constructor() {
    	this.status = CsVo.ST_IDLE;
	}
	public tick(dt:number):void {
	    if(this.status == CsVo.ST_WAIT) {
	        this.passTimes += dt/1000;
	        var heart:number = Math.ceil((GameData.CS_TIME - this.passTimes) / 10);
	        this.order.showPatience(heart);
	        if(heart <= 2) {
	            this.view.changeEm(3);
	        }
	        if(GameData.CS_TIME < this.passTimes) {
	            // left
    	        this.status = CsVo.ST_LEFT_TIMEOVER;
    	        this.view.changeEm(4);
                this.order.addEventListener("OrderHidden", this.onOrderHidden, this);
                SimpleSound.playFx("fx_leave")
    	        this.order.fadeOut();
	        }
	    } else if(this.status == CsVo.ST_LEFT_TIMEOVER) {
	        
	    }
	}
	private onOrderHidden():void {
	    this.order.removeEventListener("OrderHidden", this.onOrderHidden, this);
	    this.view.parent.removeChild(this.view);
	    this.view = null;
	    this.status = CsVo.ST_IDLE;
	}
	public doFeed(foodData:Object):boolean {
	    
	    for(var m in this.orderData) {
	        if((foodData.hasOwnProperty(m) && foodData[m] === this.orderData[m]) ||(!foodData.hasOwnProperty(m) && this.orderData[m] === 0)) {
	            
	        } else {
    	        
	            return false;
	        }
	    }
	    for(var m in foodData) {
	        if((this.orderData.hasOwnProperty(m) && foodData[m] === this.orderData[m]) ||(!this.orderData.hasOwnProperty(m) && foodData[m] === 0)) {
	            
	        } else {
                
	            return false;
	        }
	    }
	    this.status = CsVo.ST_PAY;
	    this.view.changeEm(2);
	    this.order.showPay();
	    this.order.addEventListener("Payed", this.onPayed, this);
	    return true;
	}
	private onPayed():void {
    	this.order.removeEventListener("Payed", this.onPayed, this);
    	this.status = CsVo.ST_PAYED;
        this.view.parent.removeChild(this.view);
        this.view = null;
	    
	}
	public reset():void {
	    if(this.view) {
	        this.view.parent.removeChild(this.view);
	        this.view = null;
	    }
	    this.status = CsVo.ST_IDLE;
	    this.order.reset();
	}
	public getMoney():number
	{
    	var money:number = 0;
    	
    	for(var m in this.orderData) {
    	    money += GameData.PRICE[m];
    	}
    	this.status = CsVo.ST_IDLE;
	    return money;
	}
	public start(orderData:Object):void {
    	
    	this.passTimes = 0;
	    this.status = CsVo.ST_SHOW;
        this.order.addEventListener("OrderShowed", this.onOrderShowed, this);
	    this.order.show(orderData);
        this.orderData = orderData;
	}
	private onOrderShowed(e:egret.Event):void {
	    this.order.removeEventListener("OrderShowed", this.onOrderShowed, this);
	    this.status = CsVo.ST_WAIT;
	    
	}
}
