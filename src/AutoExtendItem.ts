/**
 *
 * @author 
 *
 */
class AutoExtendItem extends BaseLayer {
    private dir: string;
    private rect: egret.Rectangle;
    private cellW: number;
    private itemClass: Array<any>;
    private isInited: boolean;
    private childrenList: Array<AutoExtendVo>;
	public constructor() {
        super();
        this.isInited = false;
        this.itemClass = [];
        this.childrenList = [];
	}
	public addItem(item:any, initProps:Object):void {
        this.itemClass.push({ def: item,props:initProps });
	}
	public start():void {
        this.isInited = true;
        this.relayout("");
	}
	protected initUI():void {
        super.initUI();
        
        this.start();
        
	}
	public move(dx:number):void {
        for(var i: number = this.numChildren - 1;i >= 0; i --) {
            var item: egret.DisplayObject = this.getChildAt(i);
            item.x += dx;
        }
        this.update();
	}
	private parseItemRect(item:egret.DisplayObject):egret.Rectangle {
        var r: egret.Rectangle = item.getBounds();
        
        r.offset(item.x,item.y);
        r.x = (r.x * this.scaleX + this.x);
        r.y = (r.y * this.scaleY + this.y);
        r.width = r.width * this.scaleX;
        r.height = r.height * this.scaleY;
        return r;
	}
	private update():void {
    	if(!this.isInited) {
            return;
    	}
        
    	this.rect = new egret.Rectangle(0,0,ScreenSolution.getInstance().curW,ScreenSolution.getInstance().curH);
    	// remove first
    	
    	while(this.numChildren) {
            var first: AutoExtendVo = this.childrenList[0];
            var r: egret.Rectangle = this.parseItemRect(first.view);
            if(r.right < -10) {
                // remove it
                this.removeChild(first.view);
                this.childrenList.shift();
            } else {
                break;
            }
    	}
    	// last item from the childrenList;
    	// remove last
    	while(this.numChildren) {
            var last: AutoExtendVo = this.childrenList[this.childrenList.length - 1];
            var r: egret.Rectangle = this.parseItemRect(last.view);
            if(r.left > this.rect.right + 10) {
                // remove
                this.removeChild(last.view);
                this.childrenList.pop();
            } else {
                break;
            }
    	}
        var isChanged: boolean = false;
	    do {
            var insertBefore: boolean = false;
            if(this.childrenList.length == 0) {
                insertBefore = true;
            } else {
                var o: AutoExtendVo = this.childrenList[0];
                var r: egret.Rectangle = this.parseItemRect(o.view);
                
                if(r.x > -10) {
                    insertBefore = true;
                }
            }
            if(insertBefore) {
                var index: number;
                if(this.childrenList.length == 0) {
                    index = 0;
                }
                else {
                    index = this.childrenList[0].index - 1;
                    if(index < 0) {
                        index = this.itemClass.length - 1;
                    }
                }
                var item: egret.DisplayObject = new this.itemClass[index].def();
                
                for(var m in this.itemClass[index].props) {
                    item[m] = this.itemClass[index].props[m];
                }
                if(this.numChildren == 0) {
                    item.x = 0;
                } else {
                    item.x = this.childrenList[0].view.x - item.width;
                }
                
                this.addChildAt(item,0);
                this.childrenList.unshift(new AutoExtendVo(item,index));
            }
            
            var insertAfter: boolean = false;
            var o: AutoExtendVo = this.childrenList[this.childrenList.length - 1];
            var r: egret.Rectangle = this.parseItemRect(o.view);
       
            if(r.right < this.rect.right) {
                insertAfter = true;
                
            }
            if(insertAfter) {
                var index: number = this.childrenList[this.childrenList.length - 1].index + 1;
                if(index == this.itemClass.length) {
                    index = 0;
                }
                var item: egret.DisplayObject = new this.itemClass[index].def();
                for(var m in this.itemClass[index].props) {
                    item[m] = this.itemClass[index].props[m];
                }
                item.x = this.childrenList[this.childrenList.length - 1].view.x + this.childrenList[this.childrenList.length - 1].view.width;
                this.addChild(item);
                this.childrenList.push(new AutoExtendVo(item,index));
            }
            if(!insertBefore && !insertAfter) {
                break;
            }
            
           
        } while(true);
	}
	public relayout(type:string):void {
        super.relayout(type);
        this.scaleX = this.scaleY = ScreenSolution.getInstance().minScale;
        this.update();
	}
	
}
