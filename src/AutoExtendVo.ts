/**
 *
 * @author 
 *
 */
class AutoExtendVo {
    public index: number;
    public view: egret.DisplayObject;
    
	public constructor(v:egret.DisplayObject, n:number) {
        this.view = v;
        this.index = n;
	}
}
