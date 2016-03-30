/**
 *
 * @author 
 *
 */
class OrderPanel extends AutoResizeItem {
    private content:egret.DisplayObjectContainer;
    private patienceSign:PatienceSign;
    private icecream:IceCream;
    private paySign:egret.Bitmap;
    private txt:egret.TextField;
    private bg:egret.Bitmap;
	public constructor( _type:number = 1, pt1:egret.Point = null,pt2:egret.Point = null) {
    	super(_type, pt1, pt2);
    	this.content = new egret.DisplayObjectContainer();
    	this.addChild(this.content);
    	var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.pao_bg"));
    	bg.x = -2;
    	bg.y = -199;
    	this.content.addChild(bg);
    	this.bg =bg;
    	var icecream:IceCream = new IceCream();
    	icecream.setLocked(true);
    	icecream.x = 70;
    	icecream.y = -100;
    	icecream.scaleX = icecream.scaleY = 0.91;
    	icecream.init({});
    	this.content.addChild(icecream);
    	this.icecream = icecream;
    	
    	this.paySign = new egret.Bitmap(RES.getRes("game.money"));
    	this.paySign.x = 55;
    	this.paySign.y = -141;
    	this.content.addChild(this.paySign);
    	this.paySign.visible = false;
    	this.patienceSign = new PatienceSign();
    	this.patienceSign.x = 129;
    	this.patienceSign.y = -185;
    	this.content.addChild(this.patienceSign);
    	
    	this.content.scaleX = this.content.scaleY = 0;
    	this.txt = new egret.TextField();
    	this.txt.wordWrap = true;
    	this.txt.width = bg.texture.textureWidth;
    	this.txt.x = bg.x;
    	this.txt.y = bg.y;
    	this.txt.textColor = 0x000000;
    	this.txt.size = 12;
    	this.content.addChild(this.txt);
    	this.txt.visible = false;
	}
	public showPatience(n:number):void {
	    this.patienceSign.show(n);
	}
	public fadeOut():void {
	    egret.Tween.get(this.content).to({scaleX:0, scaleY:0}, 15*GameData.FPS).call(this.onHide, this);
	}
	private onHide():void {
	    this.dispatchEventWith("OrderHidden");
	}
	public reset():void {
	    this.content.scaleX = this.content.scaleY = 0;
	}
	public showPay():void {
	    this.icecream.visible = false;
	    this.paySign.visible = true;
	    this.patienceSign.visible = false;
	    this.touchEnabled = true;
	    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	private onClick(e:egret.TouchEvent):void {
    	SimpleSound.playFx("fx_money")
	    this.touchEnabled = false;
	    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	    
	    this.bg.visible = false;
	    egret.Tween.get(this.paySign).to({y:-250,alpha:0}, 8*GameData.FPS).call(this.onPayed, this);
	    
	}
	private onPayed():void {
    	this.bg.visible = true;
        this.content.scaleX = this.content.scaleY = 0;
        this.paySign.y = -141;
        this.paySign.alpha = 1;
        this.dispatchEventWith("Payed");
	}
	public show(sData:Object):void {
    	var str:string = "{";
    	for(var m in sData) {
    	    str += m + ":" + sData[m]+",";
    	}
    	str += "}";
    	this.txt.text = str;
	  this.icecream.visible = true;
	  this.paySign.visible = false;
	  this.patienceSign.visible = true;
	  this.patienceSign.restart();
	  
    	this.icecream.init(sData);
    	this.touchEnabled = false;
    	this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    	egret.Tween.get(this.content).to({scaleX:1,scaleY:1}, 15*GameData.FPS, egret.Ease.backOut).call(this.onShowed, this);
	    
	}
	private onShowed():void {
	    this.dispatchEventWith("OrderShowed");
	}
}
