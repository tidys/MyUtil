/**
 *
 * @author 
 *
 */
class ScreenSolution {
    static _instance: ScreenSolution = null;
    static getInstance() {
        if(ScreenSolution._instance == null) {
            ScreenSolution._instance = new ScreenSolution()
        }
        return ScreenSolution._instance;
    }
    
    public wScale: number;
    public hScale: number;
    public curScale: number;
    
    public stageScale: number;
    public minScale: number;
    public maxScale: number;
    public sW: number;
    public sH: number;
    public curW: number;
    public curH: number;
    public realScale: number;
    public bgScale: number;
    private _listener: Listener;
    
    public isLandscape: boolean;
    public srcW: number;
    public srcH: number;
	public constructor() {
            this._listener = new Listener();
            this.sW = 960;
            this.sH = 640;
            this.srcW = 960;
            this.srcH = 640;
            this.update();
	}
	public  addListener(func:any, thisObj:any) {
            this._listener.addListener("resize",func,thisObj);
	}
	public removeListener(func:any, thisObj:any):void {
            this._listener.removeListener("resize",func,thisObj);
	}
	public update():void {
	    
        if(window.innerWidth < window.innerHeight) {
            egret.MainContext.instance.stage.getChildAt(0).visible = false;
            return;
        }
        egret.MainContext.instance.stage.getChildAt(0).visible = true;
            
            
            this.curW = window.innerWidth;
            this.curH = window.innerHeight;
       
            this.isLandscape = this.curW > this.curH;
            this.bgScale = Math.max(this.curW / 960,this.curH / 640);
            if(this.isLandscape) {
                this.sW = 960;
                this.sH = 640;
            } else {
                this.sW = 640;
                this.sH = 960;
            }
            this.wScale = this.curW / this.sW;
            this.hScale = this.curH / this.sH;
            
            this.minScale = Math.min(this.wScale,this.hScale);
            this.maxScale = Math.max(this.wScale,this.hScale);
            this.stageScale = this.maxScale;
            this._listener.sendNotify("resize");
            
	}
}
