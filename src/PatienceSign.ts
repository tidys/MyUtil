/**
 *
 * @author 
 *
 */
class PatienceSign extends egret.DisplayObjectContainer{
    
	public constructor() {
    	super();
    	
    	this.restart();
	}
	public restart():void {
	    this.removeChildren();
	    for(var i:number = 0; i < 5; i ++) {
    	    var img:egret.Bitmap = new egret.Bitmap(RES.getRes("game.heart"));
    	    img.x = -17;
    	    img.y = i * 36;
    	    this.addChild(img);
    	}
	}
	public show(n:number):void {
	    while(this.numChildren > n) {
	        this.removeChildAt(this.numChildren - 1);
	    }
	}
}
