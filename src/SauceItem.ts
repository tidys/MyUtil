/**
 *
 * @author 
 *
 */
class SauceItem extends OptionItem {
    
    public constructor(n: number,_locked: boolean,_type: number,pt1: egret.Point,pt2: egret.Point) {
        super(n,_locked, _type,pt1,pt2);
        
        var floor:egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_3_0"));
        floor.x = -42;
        floor.y = -5;
        this.addChild(floor);
        
        
        
        var img: egret.Bitmap = new egret.Bitmap(RES.getRes(this._locked ? "game.t_3_00" : "game.t_3_" + n.toString()));
        if(this._locked) {
            img.x = -37;
            img.y = -3;
        }
        else {
            img.x = -32;
            img.y = -50;
        }
        
        this.addChild(img);
        
    }
    protected onTouched(e: egret.TouchEvent): void {
        if(this._locked) {
            return;
        }
        this.dispatchEventWith("IceCreamChanged",true,{ part: 3,val: this.cupId });
    }
    public unlock(): void {
        if(!this._locked) {
            return;
        }
        this.removeChildAt(1);
        this._locked = false;
        var img: egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_3_" + this.cupId.toString()));
        img.x = -32;
        img.y = -50;
        this.addChild(img);
    }
}
