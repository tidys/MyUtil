/**
 *
 * @author 
 *
 */
class GameBar extends AutoResizeItem {
    private lvTxt:egret.TextField;
    private moneyTxt:egret.TextField;
    private targetTxt:egret.TextField;
	public constructor(_type:number, pt1:egret.Point, pt2:egret.Point) {
    	super(_type, pt1, pt2);
    	var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.panelBg"));
    	bg.x = -264;
    	bg.y = -31;
    	this.addChild(bg);
    	
    	var lvImg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.i_level"));
    	lvImg.x = -235;
    	lvImg.y = -17;
    	this.addChild(lvImg);
    	
    	var lvBg:egret.Shape = new egret.Shape();
    	lvBg.graphics.lineStyle(2, 0xA82B2B);
    	lvBg.graphics.beginFill(0xF58282);
    	lvBg.graphics.drawRoundRect(0,0,33,28,12,12);
    	lvBg.graphics.endFill();
    	lvBg.x = -143;
    	lvBg.y = -10;
    	this.addChild(lvBg);
    	
    	
    	var moneyImg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.i_money"));
    	moneyImg.x = -95;
    	moneyImg.y = -15;
    	this.addChild(moneyImg);
    	
    	var moneyBg:egret.Shape = new egret.Shape();
        moneyBg.graphics.lineStyle(2,0xA82B2B);
        moneyBg.graphics.beginFill(0xF58282);
        moneyBg.graphics.drawRoundRect(0,0,49,28,12,12);
        moneyBg.graphics.endFill();
        moneyBg.x = 15;
        moneyBg.y = -10;
        this.addChild(moneyBg);
        
    	var targetImg:egret.Bitmap = new egret.Bitmap(RES.getRes("game.i_target"));
    	targetImg.x = 70;
    	targetImg.y = -20;
    	this.addChild(targetImg);
    	
    	var targetBg:egret.Shape = new egret.Shape();
        targetBg.graphics.lineStyle(2,0xA82B2B);
        targetBg.graphics.beginFill(0xF58282);
        targetBg.graphics.drawRoundRect(0,0,49,28,12,12);
        targetBg.graphics.endFill();
        targetBg.x = 190;
        targetBg.y = -10;
        this.addChild(targetBg);
        
        this.lvTxt = new egret.TextField();
        this.lvTxt.textColor = 0xA01717;
        this.lvTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.lvTxt.fontFamily = "Arial";
        this.lvTxt.bold = true;
        this.lvTxt.text = "";
        this.lvTxt.width = 36;
        this.lvTxt.size= 20;
        this.lvTxt.x = -145 ;
        this.lvTxt.y = -8;
        this.addChild(this.lvTxt);
        
        this.moneyTxt = new egret.TextField();
        this.moneyTxt.textColor = 0xA01717;
        this.moneyTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.moneyTxt.fontFamily = "Arial";
        this.moneyTxt.bold = true;
        this.moneyTxt.text = "";
        this.moneyTxt.width = 70;
        this.moneyTxt.size = 20;
        this.moneyTxt.x = 4;
        this.moneyTxt.y = -8;
        this.addChild(this.moneyTxt);
        
        this.targetTxt = new egret.TextField();
        this.targetTxt.textColor = 0xA01717;
        this.targetTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.targetTxt.fontFamily = "Arial";
        this.targetTxt.bold = true;
        this.targetTxt.text = "";
        this.targetTxt.width = 70;
        this.targetTxt.size = 20;
        this.targetTxt.x = 178;
        this.targetTxt.y = -8;
        this.addChild(this.targetTxt);
    	
	}
	public setData(lv:number, money:number, goal:number):void {
	    this.lvTxt.text = lv.toString();
	    this.setMoney(money);
	    this.targetTxt.text = goal.toString();
	}
	public setMoney(money:number):void {
	    this.moneyTxt.text = money.toString();
	}
}
