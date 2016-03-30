/**
 *
 * @author 
 *
 */
class DressItem extends egret.DisplayObjectContainer {
    private idHolder: string;
    private isSingle: boolean;
    private frame: number;
	public constructor(idHolder:string) {
        super();
        this.isSingle = false;
        this.idHolder = idHolder;
	}
	public show(n:number):void {
    	if(this.isSingle) {
    	    if(n == this.frame) {
                var view: egret.Bitmap = new egret.Bitmap(RES.getRes(this.idHolder));
                this.addChild(view);
    	    } else {
                this.removeChildren();
    	    }
            return;
    	}
        var s: string = n.toString();
        
        var key: string = this.idHolder.substr(0,this.idHolder.length - s.length) + s;
        
        this.removeChildren();
        if(n == 0) {
            return;
        }
        var view: egret.Bitmap = new egret.Bitmap(RES.getRes(key));
        this.addChild(view);
	}
	public setAsSingleFrame(n:number):void {
        this.isSingle = true;
        this.frame = n;
	}
}
