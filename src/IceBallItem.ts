/**
 *
 * @author 
 *
 */
class IceBallItem extends OptionItem {
    
    public constructor(n: number,_locked: boolean,_type: number,pt1: egret.Point,pt2: egret.Point) {
        super(n,_locked, _type,pt1,pt2);
       
        
        var img: egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_2_" + n.toString()));
        
        img.x = -img.texture.textureWidth * 0.5;
        img.y = -img.texture.textureHeight * 0.5;
        
        

        this.addChild(img);
        
        if(this._locked) {
            var img:egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_2_0"));
            img.x = -37;
            img.y = -24;
            this.addChild(img);
        }
       
    }
    protected onTouched(e: egret.TouchEvent): void {
        if(this._locked) {
            return;
        }
        this.dispatchEventWith("IceCreamChanged",true,{ part: 2,val: this.cupId });
    }
    public unlock(): void {
        if(!this._locked) {
            return;
        }
        this._locked = false;
        this.removeChildAt(1);
        
    }
}
