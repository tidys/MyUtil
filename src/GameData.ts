/**
 *
 * @author 
 *
 */
class GameData {
    static FPS: number = 30;
    static level:number;
    static money:number = 0;
    static avaLevels:number = 1;
    static CREATE_CS_TIME: number = 5000;
    static transitionListener: Listener = new Listener();
    static isFirst: boolean = true;
    static CS_TIME:number = 50;
    static PRICE:Object = {o1:10,o2:15,o3:5,o4:5,o5:5};
    static newItems:Array<Object> = [
                                        {o1:[1,2],o2:[1,2]}, 
                                        {o1:[3],o2:[3,4],o3:[1]},
                                        {o1:[4],o3:[2]},
                                        {o2:[5,6]},
                                        {o3:[3]},
                                        {o3:[4]},
                                        {o4:[1]},
                                        {o4:[2]},
                                        {o4:[3]},
                                        {o5:[1]},
                                        {o5:[2]},
                                        {o5:[3]}
                                    ];
                                    
	public constructor() {
	}
	static init():void {
        
	}
    
}
