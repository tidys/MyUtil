/**
 *
 * @author 
 *
 */
class SplashScreen extends BaseLayer{
    private bg:egret.Shape;
	public constructor() {
    	super();
	}
	protected initUI():void {
	    super.initUI();
	    var bg:egret.Shape = new egret.Shape();
	    this.bgLayer.addChild(bg);
	    this.bg = bg;
	    
	    var logoWrap:AutoResizeItem = new AutoResizeItem();
	    var logo:SpilLogo = new SpilLogo();
	    logoWrap.addChild(logo);
	    logoWrap.changeProps({x:480,y:320});
	    this.gameLayer.addChild(logoWrap);
	    this.touchEnabled = true;
	    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	private onClick(e:egret.TouchEvent):void {
	    var o:Object = SpilAPI.getSplash();
	    o["action"]();
	}
	protected start():void {
	    super.start();
	    
	}
	private onShowed():void {
	    
	}
	public relayout(type:string):void {
	    super.relayout(type);
	    this.bg.graphics.clear();
	    this.bg.graphics.beginFill(0xffffff);
	    this.bg.graphics.drawRect(0,0,ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
	    this.bg.graphics.endFill();
	}
	
}
