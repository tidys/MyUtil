/**
 *
 * @author 
 *
 */
class GoalLayer extends BaseLayer {
    private bg:egret.Shape;
    private lv:number;
    private goal:number;
	public constructor(lv:number, goal:number) {
    	super();
    	this.lv = lv;
    	this.goal = goal;
	}
	protected initUI():void {
	    super.initUI();
	    this.bg = new egret.Shape();
	    this.bgLayer.addChild(this.bg);
	    this.bg.touchEnabled = true;
	    var content:AutoResizeItem = new AutoResizeItem();
	    
	    var panel:egret.Bitmap = new egret.Bitmap(RES.getRes("goal.bg"));
	    panel.x = 284-480;
	    panel.y = 132-320;
	    content.addChild(panel);
	    
	    var title:egret.Bitmap = new egret.Bitmap(RES.getRes("goal.title"));
	    title.x= 349-480;
	    title.y = 68 - 320;
	    content.addChild(title);
	    
	    var lvImg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.i_level"));
	    lvImg.scaleX = lvImg.scaleY = 1.5;
	    lvImg.x = 335-480;
	    lvImg.y = 310-320;
	    content.addChild(lvImg);
	    
	    var targetImg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.i_target"));
	    targetImg.scaleX = targetImg.scaleY = 1.5;
	    targetImg.x = 534-480;
	    targetImg.y = 311-320;
	    content.addChild(targetImg);
	    
	    var lvBg:egret.Shape = new egret.Shape();
	    lvBg.graphics.lineStyle(2, 0xA82B2B);
	    lvBg.graphics.beginFill(0xF58282);
	    lvBg.graphics.drawRoundRect(0,0,50,42, 10,10);
	    lvBg.graphics.endFill();
	    lvBg.x = 474-480;
	    lvBg.y =324-320;
	    content.addChild(lvBg);
	    
	    var goalBg:egret.Shape = new egret.Shape();
	    goalBg.graphics.lineStyle(2, 0xA82B2B);
	    goalBg.graphics.beginFill(0xF58282);
	    goalBg.graphics.drawRoundRect(0,0,74,42,10,10);
	    goalBg.graphics.endFill();
	    goalBg.x = 719-480;
	    goalBg.y = 324-320;
	    content.addChild(goalBg);
	    
	    var lvTxt:egret.TextField = new egret.TextField();
	    lvTxt.textColor = 0xA01717;
	    lvTxt.size = 32;
	    lvTxt.bold = true;
	    lvTxt.width = 50;
	    lvTxt.textAlign = egret.HorizontalAlign.CENTER;
	    lvTxt.text = this.lv.toString();
	    lvTxt.fontFamily = "Arial";
	    lvTxt.x = 485-480-13;
	    lvTxt.y = 330-320;
	    content.addChild(lvTxt);
	    
	    var goalTxt:egret.TextField = new egret.TextField();
	    goalTxt.textColor = 0xA01717;
	    goalTxt.size = 32;
	    goalTxt.bold = true;
	    goalTxt.width = 74;
	    goalTxt.textAlign = egret.HorizontalAlign.CENTER;
	    goalTxt.text = this.goal.toString();
	    goalTxt.fontFamily = "Arial";
	    goalTxt.x = 796-480-78;
	    goalTxt.y = 330-320;
	    content.addChild(goalTxt);
	    var girl:egret.Bitmap = new egret.Bitmap(RES.getRes("goal.girl"));
	    girl.x = 85-480;
	    girl.y = 47-320;
	    content.addChild(girl);
	    
	    var playBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("btn_play"));
	    playBtn.scaleX = playBtn.scaleY = 124/149;
	    playBtn.x = 489-480;
	    playBtn.y = 393-320;
	    content.addChild(playBtn);
	    
	    playBtn.touchEnabled = true;
	    playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayClick, this);
	    content.changeProps({x:480,y:320});
	    this.gameLayer.addChild(content);
	    content.visible = false;
	}
	protected start():void {
	    super.start();
	    var content:egret.DisplayObject = this.gameLayer.getChildAt(0);
        content.y =  -ScreenSolution.getInstance().curH;
        content.visible = true;
	    egret.Tween.get(content).to({y:ScreenSolution.getInstance().curH * 0.5}, 20*GameData.FPS, egret.Ease.backOut);
	}
	private onPlayClick(e:egret.TouchEvent):void {
	    var playBtn:egret.Bitmap = e.currentTarget;
	    playBtn.touchEnabled = false;
	    playBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayClick, this);
	    var content:egret.DisplayObject = this.gameLayer.getChildAt(0);
	    egret.Tween.get(content).to({y:-ScreenSolution.getInstance().curH}, 10*GameData.FPS).call(this.onFadeOut, this);
	}
	private onFadeOut():void {
	    this.dispatchEventWith("GoalShowed", true);
	}
	public relayout(type:string):void {
	    super.relayout(type);
	    
	    this.bg.graphics.clear();
	    this.bg.graphics.beginFill(0x0000, 0.3);
	    this.bg.graphics.drawRect(0,0,ScreenSolution.getInstance().curW, ScreenSolution.getInstance().curH);
	    this.bg.graphics.endFill();
	    
	}
}
