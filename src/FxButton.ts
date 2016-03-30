/**
 *
 * @author 
 *
 */
class FxButton extends egret.DisplayObjectContainer {
	public constructor() {
    	super();
    	
    	this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
	}
	private onAdded(e:egret.Event):void {
	    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.showView(SoundController.getInstance().fxVolume > 0);
	}
	private showView(b:boolean):void {
	    this.removeChildren();
	    var img:egret.Bitmap = new egret.Bitmap(RES.getRes("start.btn_fx" + (b?"":"_mute")));
	    this.addChild(img);
	}
	private onClick(e:egret.TouchEvent):void {
	    if(SoundController.getInstance().fxVolume > 0) {
	        SoundController.getInstance().muteFx(true);
	        this.showView(false);
	    } else {
	        SoundController.getInstance().muteFx(false);
	        this.showView(true);
	    }
	}
}
