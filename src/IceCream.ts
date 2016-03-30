/**
 *
 * @author 
 *
 */
class IceCream extends Girl {
	public constructor() {
    	super(AutoResizeItem.RT_AUTO, null,null);
    	this.setLocked(true);
	}
	protected initUI():void {
	    super.initUI();
	    
	    var o1:DressItem = new DressItem("game.ic_1_0000");
	    o1.x = -36;
	    o1.y = -20;
	    this.addChild(o1);
	    this.dress.addPart("o1", o1);
	    
	    var o2:DressItem = new DressItem("game.ic_2_0000");
	    o2.x = -30;
	    o2.y = -55;
	    this.addChild(o2);
	    this.dress.addPart("o2", o2);
	    
	    var o3:DressItem = new DressItem("game.ic_3_0000");
	    o3.x = -32;
	    o3.y = -63;
	    this.addChild(o3);
	    this.dress.addPart("o3", o3);
	    
        var o4: DressItem = new DressItem("game.ic_4_0000");
        o4.x = -35;
        o4.y = -52;
        this.addChild(o4);
        this.dress.addPart("o4",o4);
        
        var o5: DressItem = new DressItem("game.ic_5_0000");
        o5.x = -38;
        o5.y = -90;
        this.addChild(o5);
        this.dress.addPart("o5",o5);
	}
	
	
}
