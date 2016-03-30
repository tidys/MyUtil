/**
 *
 * @author 
 *
 */
class Dress {
    private list: Object;
    private vData: Object;
    private srcData: Object;
	public constructor() {
        this.list = {};
        this.vData = {}; 
	}
	public addPart(id:string, item:DressItem):void {
	    if(!this.list.hasOwnProperty(id)) {
            this.list[id] = [];
	    }
        this.list[id].push(item);
	}
	public init(sData:Object):void {
        this.srcData = {};
        for(var m in this.list) {
            var arr = this.list[m];
            for(var n in arr) {
                arr[n].show(0);
            }
            if(!sData.hasOwnProperty(m)) {
                this.srcData[m] = 0;
            }
        }
	    for(var m in sData) {
            this.srcData[m] = sData[m];
            var arr = this.list[m];
            for(var n in arr) {
                arr[n].show(sData[m]);
            }
            this.vData[m] = sData[m];
	    }
	}
	public changePart(id:string, v:number):void {
        var arr = this.list[id];
        for(var m in arr) {
            arr[m].show(v);
        }
        this.vData[id] = v;
	}
	public reset():void {
	    for(var m in this.list) {
	        if(this.srcData.hasOwnProperty(m)) {
	            this.changePart(m, this.srcData[m])
	        }
	        else {
                this.changePart(m,0);
	        }
	    }
	}
	public autoNext(id:string, limits:number):void {
        var s: number = 0;
        if(this.vData.hasOwnProperty(id)) {
            s = this.vData[id];
        }
        s++;
        if(s > limits) {
            s = 1;
        }
        this.changePart(id,s);
	}
	public getData():Object {
        var rtn: Object = {};
        for(var m in this.list) {
            if(this.vData.hasOwnProperty(m)) {
                rtn[m] = this.vData[m];
            } else {
                rtn[m] = 0;
            }
        }
        return rtn;
	}
}
