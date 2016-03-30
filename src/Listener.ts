/**
 *
 * @author 
 *
 */
class Listener {
    private _listeners: Object;
	public constructor() {
        this._listeners = {};
	}
	public addListener(type:string,func:any, thisObj:any):void
	{
	    if(!this._listeners.hasOwnProperty(type))
       {
            this._listeners[type] = [];
         }
        this._listeners[type].push({func:func, thisObj:thisObj});
	}
	public removeListener(type:string, func:any, thisObj:any):void {
        if(!this._listeners.hasOwnProperty(type)) {
            return;
        }
        var arr = this._listeners[type];
        for(var i = arr.length - 1;i >= 0; i --) {
            var o = arr[i];
            if(o.func == func && o.thisObj == thisObj) {
                arr.splice(i,1);
                return;
            }
        }
	}
	public sendNotify(type:string):void {
	    if(!this._listeners.hasOwnProperty(type)) {
            return;
	    }
        var arr = this._listeners[type];
        for(var i = arr.length - 1;i >= 0; i --) {
            var o = arr[i];
            
            o.func.apply(o.thisObj,[type]);
        }
	}
}
