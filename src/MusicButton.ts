/**
 *
 * @author 
 *
 */
class MusicButton extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
    }
    private onAdded(e: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        this.showView(SoundController.getInstance().bgVolume > 0);
    }
    private showView(b: boolean): void {
        this.removeChildren();
        var img: egret.Bitmap = new egret.Bitmap(RES.getRes("start.btn_" + (b ? "music" : "mute")));
        this.addChild(img);
    }
    private onClick(e: egret.TouchEvent): void {
        if(SoundController.getInstance().bgVolume > 0) {
            SoundController.getInstance().muteSound(true);
            this.showView(false);
        } else {
            SoundController.getInstance().muteSound(false);
            this.showView(true);
        }
    }
}
