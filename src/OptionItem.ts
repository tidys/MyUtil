/**
 *
 * @author 
 *
 */
class OptionItem extends AutoResizeItem{
    protected cupId: number;
    protected _locked: boolean;
    public constructor(n: number,_locked: boolean,_type: number,pt1: egret.Point,pt2: egret.Point) {
        super(_type,pt1,pt2);
        this.cupId = n;
        this._locked = _locked;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouched,this);
	}
    protected onTouched(e: egret.TouchEvent): void {
        
    }
    public unlock(): void {
        
    }
}
