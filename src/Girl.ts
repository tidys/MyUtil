/**
 *
 * @author 
 *
 */
class Girl extends AutoResizeItem {
    protected dress: Dress;
	public constructor(_type:number, pt1:egret.Point, pt2:egret.Point) {
        super(_type,pt1,pt2);
        this.dress = new Dress();
        this.initUI();
	}
	protected initUI():void { 
	    
	}
    public init(sData: Object): void {
        this.dress.init(sData);
    }
    public changePart(id: string,v: number): void {
        this.dress.changePart(id,v);
    }
    public autoNext(id: string,limit: number): void {
        this.dress.autoNext(id,limit);
    }
    public reset(): void {
        this.dress.reset();
    }
    public getData(): Object {
        return this.dress.getData();
    }
}
