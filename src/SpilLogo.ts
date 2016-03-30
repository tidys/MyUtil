/**
 *
 * @author 
 *
 */
class SpilLogo extends egret.DisplayObjectContainer{
    static logoTexture:egret.Texture = null;
    static _listeners:Array<SpilLogo> = [];
    static hasLogo:boolean = false;
    static loadLogo(logoUrl:string):void {
        RES.getResByUrl(logoUrl, SpilLogo.onLogoLoaded, SpilAPI);
    }
    static onLogoLoaded(t:egret.Texture):void {
        SpilLogo.logoTexture = t;
       
        for(var i:number = SpilLogo._listeners.length - 1; i >= 0; i --) {
            SpilLogo._listeners[i].showLogo();
        }
        SpilLogo._listeners = [];
    }
	public constructor() {
    	super();
    	if(SpilLogo.hasLogo) {
        	if(SpilLogo.logoTexture != null) {
        	    this.showLogo();
        	}
        	else {
        	    SpilLogo._listeners.push(this);
        	}
    	}
    	
	}
	private xPos:number = 0;
	private yPos:number = 0;
	private xOffset:number = 0;
	private yOffset = 0;
	public setPosition(xPos:number=0, yPos:number=0, xOffset:number=0, yOffset:number=0):void {
	    this.xPos = xPos;
	    this.yPos = yPos;
	    this.xOffset = xOffset;
	    this.yOffset = yOffset;
	    if(this.numChildren > 0) {
	        this.updatePos();
	    }
	}
	private updatePos():void {
    	var view:egret.DisplayObject = this.getChildAt(0);
	    view.x = this.xPos * SpilLogo.logoTexture.textureWidth + this.xOffset;
	    view.y = this.yPos * SpilLogo.logoTexture.textureHeight + this.yOffset;
	}
	public showLogo():void {
	    var view:egret.Bitmap = new egret.Bitmap(SpilLogo.logoTexture);
	    this.addChild(view);
	    this.touchEnabled = true;
	    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	    this.updatePos();
	}
	private onClick(e:egret.TouchEvent):void {
	    SpilAPI.getLogoAction().apply(null,[]);
	}
}
