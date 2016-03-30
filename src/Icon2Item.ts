/**
 *
 * @author 
 *
 */
class Icon2Item extends OptionItem {
    
    private pos: Array<Array<number>> = [[-52,-23],[-53,-24],[-50,-23]];
    public constructor(n: number,_locked: boolean,_type: number,pt1: egret.Point,pt2: egret.Point) {
        super(n, _locked, _type,pt1,pt2);
        

        var floor: egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_4_0"));
        floor.x = -63;
        floor.y = -42;
        this.addChild(floor);


        var img: egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_4_" + (this._locked ? "00" : n.toString())));
        if(this._locked) {
            img.x = -54;
            img.y = -39;

        } else {
            img.x = this.pos[n - 1][0];
            img.y = this.pos[n - 1][1];
        }
        this.addChild(img);


        
    }
    protected onTouched(e: egret.TouchEvent): void {
        if(this._locked) {
            return;
        }
        this.dispatchEventWith("IceCreamChanged",true,{ part: 4,val: this.cupId });
    }
    public unlock(): void {
        if(!this._locked) {
            return;
        }
        this._locked = false;
        this.removeChildAt(1);

        var img: egret.Bitmap = new egret.Bitmap(RES.getRes("game.t_4_" + this.cupId.toString()));

        img.x = this.pos[this.cupId - 1][0];
        img.y = this.pos[this.cupId - 1][1];

        this.addChild(img);

    }
}
