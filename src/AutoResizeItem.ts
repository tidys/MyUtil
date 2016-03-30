/**
 *
 * @author 
 *
 */
class AutoResizeItem extends egret.DisplayObjectContainer {
    private view: egret.DisplayObject;
    private resizeType: number;
    static RT_AUTO: number = 1;
    static RT_RELATIVE_TO: number = 2;
    private sProps: Object;
    private sPortraitProps: Object;
    private xPolicy:number;
    private yPolicy:number;
    
    private lockPts: Object = {
        landscape:null,
        portrait:null
    };
    private locked:boolean ;
    public setLockPt(landPt:egret.Point, portraitPt:egret.Point):void {
        this.lockPts["landscape"] = landPt;
        this.lockPts["portrait"] = portraitPt;
    }
    public setLocked(b:boolean):void {
       this.locked = b;
       if(!b) {
           this.relayout("");
       }
    }
    private _debug:boolean = false;
    public  setDebug(b:boolean):void {
        this._debug = b;
    }
	public constructor( _type:number = 1, _lockPt:egret.Point = null, _portraitPt:egret.Point = null) {
        super();
        this.resizeType = _type;
        this.xPolicy = AutoResizeItem.RT_AUTO;
        this.yPolicy = AutoResizeItem.RT_AUTO;
        this.locked = false;
        if(_type == AutoResizeItem.RT_RELATIVE_TO) {
            this.setRelativePt(_lockPt, _portraitPt);
            
        }
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
        this.sProps = { scaleX: 1,scaleY: 1,x: 0,y: 0 };
        this.sPortraitProps = { scaleX: 1,scaleY: 1,x: 0,y: 0 };
	}
    private relativePt: egret.Point;
    public setRelativePt(pt:egret.Point,_port:egret.Point = null):void {
        this.xPolicy = AutoResizeItem.RT_RELATIVE_TO;
        this.yPolicy = AutoResizeItem.RT_RELATIVE_TO;
        
        this.lockPts["landscape"] = pt.clone();
        this.lockPts["portrait"] = _port?_port.clone():null;
        this.relativePt = pt.clone();
    }
    public setPolicy(xPolicy:number, yPolicy:number):void {
        this.xPolicy = xPolicy;
        this.yPolicy = yPolicy;
    }
	private  onAdded(e:egret.Event):void {
        ScreenSolution.getInstance().addListener(this.relayout,this);
        this.relayout("");
	}
	private onRemoved(e:egret.Event):void {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
        ScreenSolution.getInstance().removeListener(this.relayout,this);
	}
	/**
	 * relayout items; called by the ScreenSolution automatically when size of the window changed
	 * you can call this necica
	 */ 
	protected relayout(type:string):void {
    	if(this.locked) {
        	if(this._debug) {
        	    console.log("locked, cannot relayout")
        	}
    	    return;
    	}
    	if(this._debug) {
    	    console.log("relayout", this.sProps["x"])
    	}
    	var sProps: Object = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        this.scaleX  = sProps["scaleX"] * ScreenSolution.getInstance().minScale;
        this.scaleY = sProps["scaleY"] * ScreenSolution.getInstance().minScale;
        
        this.x = this.getSelfX();
        this.y = this.getSelfY();
        
	}
	public getSelfX():number
	{
        var sProps: Object = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        if(this.xPolicy == AutoResizeItem.RT_AUTO) {
            return  sProps["x"] * ScreenSolution.getInstance().wScale;
        }
        else {
            var relativePt: egret.Point = this.getRelativePt();

            return  relativePt.x * ScreenSolution.getInstance().wScale - (relativePt.x - sProps["x"]) * ScreenSolution.getInstance().minScale;
        }
	}
	public getSelfY():number
	{
        var sProps: Object = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        if(this.yPolicy == AutoResizeItem.RT_AUTO) {
            return sProps["y"] * ScreenSolution.getInstance().hScale;
        }
        else {
            var relativePt: egret.Point = this.getRelativePt();


            return relativePt.y * ScreenSolution.getInstance().hScale - (relativePt.y - sProps["y"]) * ScreenSolution.getInstance().minScale;
        }
	}
	private getRelativePt():egret.Point {
        var relativePt: egret.Point = this.lockPts['landscape'];
        if(!ScreenSolution.getInstance().isLandscape) {
            if(this.lockPts['portrait'] != null) {
                relativePt = this.lockPts['portrait'];
            }
        } else {

        }
        return relativePt;
	}
	
	public update():void {
	    this.relayout("")
	}
	public changeProps(propsObj:Object, portObj:Object = null):void {
	   for(var m in propsObj) {
           this.sProps[m] = propsObj[m];      
	   }
	   if(portObj) {
	       for(var m in portObj) {
               this.sPortraitProps[m] = portObj[m];
	       }
	   }
     this.relayout("");
	}
	/**
	 * calculate the x value.
	 */ 
	public getX( sValue:number):number {
        if(this.xPolicy == AutoResizeItem.RT_AUTO) {
            return sValue * ScreenSolution.getInstance().wScale;
          
        }
        var relativePt: egret.Point = this.getRelativePt();
        return  relativePt.x * ScreenSolution.getInstance().wScale - (relativePt.x - sValue) * ScreenSolution.getInstance().minScale;
	}
	/**
	 * calculate the targetX with the step of dx
	 * 
	 */ 
    public getOffsetX(dx: number):number {
        var sProps: Object = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        return this.getX(sProps["x"] + dx);
	}
	public getOffsetY(dy:number):number {
        var sProps: Object = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        return this.getY(sProps["y"] + dy);
	}
	/**
	 * move by the offset
	 */ 
	public moveBy(dx:number, dy:number):void {
        var sProps: Object = ScreenSolution.getInstance().isLandscape ? this.sProps : this.sPortraitProps;
        this.changeProps({ x: sProps["x"] + dx,y: sProps["y"] + dy });
	}
	/**
	 * move to the target
	 */ 
	public moveTo(tx:number, ty:number):void {
        this.changeProps({ x: tx,y: ty });
	}
	
	/**
	 * get target y of the 
	 */ 
    public getY(sValue: number): number {
        if(this.yPolicy == AutoResizeItem.RT_AUTO) {
            return sValue * ScreenSolution.getInstance().hScale;
        }
        var relativePt: egret.Point = this.getRelativePt();
        return relativePt.y * ScreenSolution.getInstance().hScale - (relativePt.y - sValue) * ScreenSolution.getInstance().minScale;
    }
    /**
     * tx : x coordinate before resize
     * ty : y coordinate before reisze
     * @return egret.Point. the target point after resize
     */ 
    public getPosition(tx:number, ty:number):egret.Point {
        return new egret.Point(this.getX(tx),this.getY(ty));
    }
    
    
    
}
