/**
 *
 * @author 
 *
 */
class PassLayer extends BaseLayer{
    private money:number;
    private goal:number;
    private bg:egret.Shape;
	public constructor(money:number, goal:number) {
    	super();
    	this.money = money;
    	this.goal = goal;
	}
	protected initUI():void {
	    super.initUI();
	    this.bg = new egret.Shape();
	    this.bgLayer.addChild(this.bg);
	    var content:AutoResizeItem = new AutoResizeItem();
	    this.bg.touchEnabled = true;
	    var panel:egret.Bitmap = new egret.Bitmap(RES.getRes("pass.panel"));
	    panel.x = 240-480;
	    panel.y = 100 - 320;
	    content.addChild(panel);
	    
	    var txt:egret.Bitmap = new egret.Bitmap(RES.getRes("pass.txt_goodjob"));
	    txt.x = 360 - 480;
	    txt.y = 167 - 320;
	    content.addChild(txt);
	    
	    var moneyImg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.i_money"));
	    moneyImg.scaleX = moneyImg.scaleY = 1.15;
	    moneyImg.x = 367-480;
	    moneyImg.y = 281 - 320;
	    content.addChild(moneyImg);
	    
	    var goalImg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.i_target"));
	    goalImg.scaleX = goalImg.scaleY = 1.2;
	    goalImg.x = 578 - 480;
	    goalImg.y = 274 - 320;
	    content.addChild(goalImg);
	    
	    var moneyBg:egret.Shape = new egret.Shape();
        moneyBg.graphics.lineStyle(2,0xA82B2B);
        moneyBg.graphics.beginFill(0xF58282);
        moneyBg.graphics.drawRoundRect(0,0,60,34,10,10);
        moneyBg.graphics.endFill();
        moneyBg.x = 509 - 480;
        moneyBg.y = 282 - 320;
        content.addChild(moneyBg);
        
        var goalBg: egret.Shape = new egret.Shape();
        goalBg.graphics.lineStyle(2,0xA82B2B);
        goalBg.graphics.beginFill(0xF58282);
        goalBg.graphics.drawRoundRect(0,0,60,34,10,10);
        goalBg.graphics.endFill();
        goalBg.x = 726 - 480;
        goalBg.y = 282 - 320;
        content.addChild(goalBg);
        
        var moneyTxt: egret.TextField = new egret.TextField();
        moneyTxt.textColor = 0xA01717;
        moneyTxt.size = 22;
        moneyTxt.bold = true;
        moneyTxt.width = 60;
        moneyTxt.textAlign = egret.HorizontalAlign.CENTER;
        moneyTxt.text = this.money.toString();
        moneyTxt.fontFamily = "Arial";
        moneyTxt.x = 509 - 480;
        moneyTxt.y = 282 - 320 + 8;
        content.addChild(moneyTxt);

        var goalTxt: egret.TextField = new egret.TextField();
        goalTxt.textColor = 0xA01717;
        goalTxt.size = 22;
        goalTxt.bold = true;
        goalTxt.width = 60;
        goalTxt.textAlign = egret.HorizontalAlign.CENTER;
        goalTxt.text = this.goal.toString();
        goalTxt.fontFamily = "Arial";
        goalTxt.x = 726 - 480 ;
        goalTxt.y = 282 - 320 + 8;
        content.addChild(goalTxt);
        
	    var girl:egret.Bitmap = new egret.Bitmap(RES.getRes("goal.girl"));
	    girl.x = 85-480;
	    girl.y = 29-320;
	    content.addChild(girl);
	    
	    var nextBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("btn_play"));
	    nextBtn.scaleX = nextBtn.scaleY = 119/135;
	    nextBtn.x = 361-480;
	    nextBtn.y = 369-320;
	    content.addChild(nextBtn);
	    
	    var homeBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("game.btn_home"));
	    homeBtn.scaleX = homeBtn.scaleY = 120/125;
	    homeBtn.x = 498-480;
	    homeBtn.y = 369 - 320;
	    content.addChild(homeBtn);
	    
	    var moreBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("start.btn_more"));
	    moreBtn.scaleX = moreBtn.scaleY = 119/113;
	    moreBtn.x = 635-480;
	    moreBtn.y = 369-320;
	    content.addChild(moreBtn);
	    
	    content.changeProps({x:480,y:320});
	    this.gameLayer.addChild(content);
	    
	    
	    nextBtn.touchEnabled = true;
	    nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this);
	    homeBtn.touchEnabled = true;
	    homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHome, this);
	    moreBtn.touchEnabled = true;
	    moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMore, this);
	    content.visible = false;
	}
	protected start():void {
	    var content:AutoResizeItem = <AutoResizeItem>this.gameLayer.getChildAt(0);
	    content.y = -ScreenSolution.getInstance().curH;
	    content.visible = true;
	    egret.Tween.get(content).to({y:content.getSelfY()}, 10*GameData.FPS, egret.Ease.backOut);
	}
	private onNext(e:egret.TouchEvent):void {
	    this.dispatchEventWith("GamePanelEvent", true, {type:"NextLevel", from:"pass"});
	}
	private onHome(e:egret.TouchEvent):void {
        this.dispatchEventWith("GamePanelEvent",true,{ type: "Home",from: "pass" });
	}
	private onMore(e:egret.TouchEvent):void {
        this.dispatchEventWith("GamePanelEvent",true,{ type: "More",from: "pass" });
	}
    public relayout(type: string): void {
        super.relayout(type);

        this.bg.graphics.clear();
        this.bg.graphics.beginFill(0x0000,0.3);
        this.bg.graphics.drawRect(0,0,ScreenSolution.getInstance().curW,ScreenSolution.getInstance().curH);
        this.bg.graphics.endFill();

    }
}
