/**
 *
 * @author 
 *
 */
class Tile extends egret.DisplayObjectContainer{
    private dir: string;
    private gap: number;
    private texture: egret.Texture;
    private sPos: Object;
    
	public constructor(_dir:string,texture:egret.Texture, sPos:Object) {
        super();
        this.dir = _dir
        this.texture = texture;
        this.sPos = sPos;
        if(!this.sPos.hasOwnProperty("gap")) {
            this.sPos["gap"] = 0;
        }
        
	}
	public render(min:number, max:number):void {
        this.removeChildren();
        var ival: number = min;
        do {
            var item: egret.Bitmap = new egret.Bitmap(this.texture);
            item.scaleX = item.scaleY = ScreenSolution.getInstance().minScale;
            item[this.dir] = ival;
            if(this.dir == "x") {
                item.y = this.sPos["y"];
                ival += this.texture.textureWidth * ScreenSolution.getInstance().minScale + this.sPos["gap"];
            } else {
                item.x = this.sPos["x"];
                ival += this.texture.textureHeight * ScreenSolution.getInstance().minScale + this.sPos["gap"];
            }
            this.addChild(item);
            
        } while(ival < max);
	}
}
