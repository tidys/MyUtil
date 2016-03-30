/**
 *
 * @author 
 *
 */
class CupItem extends OptionItem {
	
    public constructor(n:number,_locked:boolean, _type:number, pt1:egret.Point, pt2:egret.Point) {
    	super(n,_locked, _type, pt1, pt2);
    	
    	
    	var img:egret.Bitmap = new egret.Bitmap(RES.getRes(this._locked?"game.t_1_0":"game.t_1_" + n.toString()));
    	img.x = -img.texture.textureWidth * 0.5;
    	img.y = -img.texture.textureHeight;
    	this.addChild(img);
    	
	}
	protected onTouched(e:egret.TouchEvent):void {
	    if(this._locked) {
	        return;
	    }
	    this.dispatchEventWith("IceCreamChanged", true, {part:1, val:this.cupId});
	}
	public unlock():void {
	    if(!this._locked) {
	        return;
	    }
	    this.removeChildren();
	    this._locked = false;
        var img: egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_1_" + this.cupId.toString()));
        img.x = -img.texture.textureWidth * 0.5;
        img.y = -img.texture.textureHeight;
        this.addChild(img);
	}
}
