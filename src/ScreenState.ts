/**
 *
 * @author 
 *
 */
class ScreenState {
    static _instance:ScreenState = null;
    
    static getInstance():ScreenState {
        if(ScreenState._instance == null) {
            ScreenState._instance = new ScreenState();
        }
        return ScreenState._instance;
    }
    private _listener:Listener;
    public status:number;
    static STATUS_ACTIVE:number = 1;
    static STATUS_DEACTIVE:number = 2;
    static STATE_CHANGE:string = "state_change";
	public constructor() {
    	this._listener = new Listener();
        
        egret.MainContext.instance.stage.addEventListener(egret.Event.ACTIVATE, this.onActiveChange, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.DEACTIVATE, this.onActiveChange, this);
	}
	public isActive():boolean {
	    return this.status == ScreenState.STATUS_ACTIVE;
	}
	public addListener(func:any, body:any):void {
	    this._listener.addListener(ScreenState.STATE_CHANGE, func, body);
	}
	public removeListener(func:any, body:any):void {
	    this._listener.removeListener(ScreenState.STATE_CHANGE, func, body);
	}
	private onActiveChange(e:egret.Event):void {
    	
	    if(e.type == egret.Event.ACTIVATE) {
	        this.status = ScreenState.STATUS_ACTIVE
	    } else {
	        this.status = ScreenState.STATUS_DEACTIVE;
	    }
	    this._listener.sendNotify(ScreenState.STATE_CHANGE);
	}
    private getHiddenProp(): string {
        var d = ["webkit","moz","ms","o"];
        if("hidden" in document) return "hidden";
        for(var a = 0;a < d.length;a++) if(d[a] + "Hidden" in document) return d[a] + "Hidden";
        return null
    }
}
