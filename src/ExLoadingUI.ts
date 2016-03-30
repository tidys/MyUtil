/**
 *
 * @author 
 *
 */
class ExLoadingUI extends BaseLayer {
    private bg: egret.Bitmap;
    private txtLoading: AutoResizeItem;
    private txtPercentWrap: AutoResizeItem;
    private txtPercent: egret.TextField;
    private btnPlay: AutoResizeItem;
    private dotsArr: Array<egret.Bitmap>;
    private dotIndex: number;
    private count: number;
	public constructor() {
        super();
	}
	protected initUI():void {
        super.initUI();
        
        
        var shop: AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(480,320),new egret.Point(320,480));
        var shopImg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg.shop"));
        shop.addChild(shopImg);
        
        shop.changeProps({ x: -71,y: -91 });
        this.bgLayer.addChild(shop);
        
        var gress1: AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(0,640),new egret.Point(0,960));
        var gress1Img: egret.Bitmap = new egret.Bitmap(RES.getRes("bg.gress1"));
        gress1.addChild(gress1Img);
        gress1.changeProps({ x: -205,y: 525 });
        this.bgLayer.addChild(gress1);
        var gress2: AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(960,640),new egret.Point(640,960));
        var gress2Img: egret.Bitmap = new egret.Bitmap(RES.getRes("bg.gress2"));
        gress2.addChild(gress2Img);
        gress2.changeProps({ x: 428,y: 462 });
        this.bgLayer.addChild(gress2);
        
        var title: AutoResizeItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(480,160),new egret.Point(320,240));
        var titleImg: egret.Bitmap = new egret.Bitmap(RES.getRes("loading.title"));
        titleImg.x = -535 / 2;
        titleImg.y = -286 / 2;
        title.addChild(titleImg);
        title.changeProps({ x: 483,y: 225 });
        this.gameLayer.addChild(title);
        
        this.txtLoading = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(480,320),new egret.Point(320,480));
        var txt1: egret.Bitmap = new egret.Bitmap(RES.getRes("loading.txt_loading"));
        txt1.x = 304 - 480;
        txt1.y = 420 - 442;
        this.txtLoading.addChild(txt1);
        this.dotsArr = [];
        for(var i: number = 1;i <= 6; i ++) {
            var dot: egret.Bitmap = new egret.Bitmap(RES.getRes("loading.dot"));
            dot.x = (554 - 480) + (i-1)*20;
            dot.y = 446 - 442;
            this.dotsArr.push(dot);
            this.txtLoading.addChild(dot);
            dot.visible = false;
        }
        this.txtLoading.changeProps({ x: 480,y: 442 });
        this.gameLayer.addChild(this.txtLoading);
        
        this.txtPercentWrap = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(480,320),new egret.Point(320,480));
        this.txtPercent = new egret.TextField();
        this.txtPercent.fontFamily = "Arial";
        this.txtPercent.textColor = 0x990000;
        this.txtPercent.size = 40;
        this.txtPercent.bold = true;
        this.txtPercent.text = "0%";
        
        this.txtPercent.textAlign = egret.HorizontalAlign.CENTER;
        
        this.txtPercentWrap.addChild(this.txtPercent);
        this.txtPercentWrap.changeProps({ x: 434,y: 511 });
        this.gameLayer.addChild(this.txtPercentWrap);
        
        this.btnPlay = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(480,480),new egret.Point(320,640));
        var btnImg: egret.Bitmap = new egret.Bitmap(RES.getRes("btn_play"));
        btnImg.x = -57;
        btnImg.y = -57;
        this.btnPlay.addChild(btnImg);
        this.btnPlay.changeProps({ x: 480,y: 490 });
        this.btnsLayer.addChild(this.btnPlay);
        this.btnPlay.visible = false;
        this.btnPlay.touchEnabled = true;
        this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayClick,this);
        
	}
	private onPlayClick(e:egret.TouchEvent):void {
        this.dispatchEventWith("Loaded",true);
	}
	protected start():void {
        super.start();
        this.dotIndex = 0;
        this.count = 0;
        this.addEventListener(egret.Event.ENTER_FRAME,this.tick,this);
	}
	public setProgress(count:number, total:number):void {
        var p: number = count / total;
        this.txtPercent.text = Math.round(p * 100).toString() + '%';
	}
	public onLoaded():void {
       
        this.txtPercentWrap.visible = false;
        this.txtLoading.visible = false;
        this.btnPlay.visible = true;
        this.removeEventListener(egret.Event.ENTER_FRAME,this.tick, this);
	}
	private tick(e:egret.Event):void {
        this.count++;
        if(this.count == 5) {
            this.count = 0;
            if(this.dotIndex == this.dotsArr.length) {
                for(var i: number = 0;i < this.dotIndex; i ++) {
                    
                    this.dotsArr[i].visible = false;
                    
                }this.dotIndex = 0;
            } else {
                this.dotsArr[this.dotIndex].visible = true;
                this.dotIndex++
            }
            
        }
	}
	public relayout(type:string):void {
        super.relayout(type);
       
	}
}
