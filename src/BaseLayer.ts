/**
 *
 * @author 
 *
 */
class BaseLayer extends egret.DisplayObjectContainer {
    protected bgLayer: egret.DisplayObjectContainer;
    protected gameLayer: egret.DisplayObjectContainer;
    protected btnsLayer: egret.DisplayObjectContainer;
	public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
	}
	private onRemoved(e:egret.Event):void {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
            
            ScreenSolution.getInstance().removeListener(this.relayout,this);
	}
	private onAdded(e:egret.Event):void {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
            this.initUI();
            ScreenSolution.getInstance().addListener(this.relayout,this);
            this.relayout("")
            this.start();
	}
	protected start():void {
	    
	}
	protected initUI():void {
        this.bgLayer = new egret.DisplayObjectContainer();
        this.addChild(this.bgLayer);
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        this.btnsLayer = new egret.DisplayObjectContainer();
        this.addChild(this.btnsLayer);
	}
	public relayout(type:string):void {
	    
	}
	public jump(str:string):void {
	    
	}
	public changeScene(str:string):void {
        this.dispatchEventWith("SceneChanged",true,{ scene: str });
	}
	
}
