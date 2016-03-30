/**
 *
 * @author 
 *
 */
class WinScene extends BaseLayer {
	public constructor() {
    	super();
	}
	protected initUI():void {
	    super.initUI();
	    var title:AutoResizeItem = new AutoResizeItem();
        var titleImg: egret.Bitmap = new egret.Bitmap(RES.getRes("win.txt_congratulations"));
        titleImg.x = -titleImg.texture.textureWidth*0.5;
        titleImg.y = -titleImg.texture.textureHeight*0.5;
        title.addChild(titleImg);
        title.changeProps({x:480,y:114});
        this.gameLayer.addChild(title);
        
        var order:Array<number> = [1,2,4,3,5];
        var pos:Array<Array<number>> = [[81,392],[170,473],[674,423],[615,465],[858,459]];
        for(var i:number = 0; i < 5; i ++) {
            var r:AutoResizeItem = this.createRole("r" + order[i]);
            r.changeProps({x:pos[i][0], y:pos[i][1]});
            this.gameLayer.addChild(r);
        }
        var girl:AutoResizeItem = this.createRole("girl");
        girl.changeProps({x:383,y:421});
        this.gameLayer.addChild(girl);
        
        var replayBtn:AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        var replayImg:egret.Bitmap = new egret.Bitmap(RES.getRes("win.btn_replay"));
        replayBtn.addChild(replayImg);
        replayBtn.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        replayBtn.changeProps({x:266,y:472});
        this.btnsLayer.addChild(replayBtn);
        
        var homeBtn: AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(0,640));
        var homeImg: egret.Bitmap = new egret.Bitmap(RES.getRes("win.btn_home"));
        homeBtn.addChild(homeImg);
        homeBtn.setPolicy(AutoResizeItem.RT_AUTO,AutoResizeItem.RT_RELATIVE_TO);
        homeBtn.changeProps({ x: 411,y: 472 });
        this.btnsLayer.addChild(homeBtn);
        
        var moreBtn: AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(0,640));
        var moreImg: egret.Bitmap = new egret.Bitmap(RES.getRes("start.btn_more"));
        moreImg.scaleX = moreImg.scaleY = 136/113;
        moreBtn.addChild(moreImg);
        moreBtn.setPolicy(AutoResizeItem.RT_AUTO,AutoResizeItem.RT_RELATIVE_TO);
        moreBtn.changeProps({ x: 557,y: 472 });
        this.btnsLayer.addChild(moreBtn);
        
        replayBtn.touchEnabled = true;
        replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReplay, this);
        
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHome, this);
        
        moreBtn.touchEnabled = true;
        moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
	}
	private goStr:string;
	private onReplay(e:egret.TouchEvent):void {
    	this.goStr = "start";
	    SpilAPI.needBreak(this, this.onAdPause, this.onAdResume);
	}
	private onMore(e:egret.TouchEvent):void {
        var o: Object = SpilAPI.getMoreObj();

        if(o && o.hasOwnProperty("action") && o["action"] !== false) {
            o["action"]();
        }
	}
	private onHome(e:egret.TouchEvent):void {
    	this.goStr = "map";
    	SpilAPI.needBreak(this, this.onAdPause, this.onAdResume);
	}
	private onAdPause():void {
	    SoundController.getInstance().autoMuteSound(true);
	}
	private onAdResume():void {
    	SoundController.getInstance().autoMuteSound(false);
	    this.changeScene(this.goStr)
	}
	private createRole(id:string):AutoResizeItem {
	    var rtn:AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0,640));
	    var img:egret.Bitmap = new egret.Bitmap(RES.getRes("win." + id));
	    img.x = -img.texture.textureWidth * 0.5;
	    img.y = -img.texture.textureHeight * 0.5;
	    rtn.addChild(img);
	    
	    rtn.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
	    return rtn;
	}
}
