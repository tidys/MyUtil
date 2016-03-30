/**
 *
 * @author 
 *
 */
class Clock extends AutoResizeItem{
    private txt:egret.TextField;
	public constructor(_type:number = 1, pt1:egret.Point = null, pt2:egret.Point = null) {
    	super(_type, pt1, pt2);
    	
    	var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.clockBg"));
    	this.addChild(bg);
    	this.txt = new egret.TextField();
    	this.txt.fontFamily = "Arial";
    	this.txt.bold = true;
    	this.txt.size = 34;
    	this.txt.textColor = 0x990000;
    	this.txt.width = 87;
    	this.txt.textAlign = egret.HorizontalAlign.CENTER;
    	this.txt.text = "00:00";
    	this.txt.y = 50;
    	this.txt.x = 5;
    	this.addChild(this.txt);
    	
	}
	public setTime(n:number):void {
    	n = Math.round(n);
	    var m:number = Math.floor(n / 60);
	    var s:number = n % 60;
	    this.txt.text = (m < 10?'0':'') + m.toString() + ':' + (s < 10?'0':'') + s.toString();
	    
	}
}
