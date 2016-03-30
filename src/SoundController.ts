/**
 *
 * @author 
 *
 */
class SoundController {
    public hasMusic: boolean = true;
    public hasFx: boolean = true;
    private musicList: Array<any>;
    private fxList: Array<any>;
    private _list: Object;
    private isAutoHide: boolean;
    public bgVolume: number;
    public fxVolume: number;
    static _instance: SoundController = null;
    static getInstance():SoundController {
        if(SoundController._instance == null) {
            SoundController._instance = new SoundController();
        }
        return SoundController._instance;
    }
	public constructor() {
        this.hasMusic = true;
        this.bgVolume = 1;
        this.fxVolume = 1;
        this.hasFx = true;
        this.musicList = [];
        this.isAutoHide = false;
        this.fxList = [];
        this._list = {};
        
        ScreenState.getInstance().addListener(this.onStateChange, this);
	}
	private onStateChange(type:string):void {
	    if(ScreenState.getInstance().isActive()) {
	        this.autoMuteSound(false)
	    } else {
	        this.autoMuteSound(true);
	    }
	}
    private getHiddenProp ():string {
        var d = ["webkit","moz","ms","o"];
        if("hidden" in document) return "hidden";
        for(var a = 0;a < d.length;a++) if(d[a] + "Hidden" in document) return d[a] + "Hidden";
        return null
    }
    public showLoop(d):void {
        this._list.hasOwnProperty(d) || (this._list[d] = new LoopSound(d))
    }
    public pause (d) {
        this._list[d].pause()
    }
    public play(d) {
        this._list[d].play()
    }
    public muteFx(b:boolean):void {
        this.fxVolume = b ? 0 : 1;
        SimpleSound.mute(b);
    }
    public muteSound(b:boolean) {
        this.bgVolume = b ? 0 : 1;
        for(var a in this._list) this._list[a].changeVolume(b ? 0 : 1)
    }
    public autoMuteSound(b:boolean) {
        for(var a in this._list) this._list[a].changeVolume(b ? 0 : this.bgVolume);
        
        SimpleSound.mute(b);
    }
    
    private isHidden () {
        var d = this.getHiddenProp();
        return d ? document[d] : !1
    }
    public pauseBGM () {
        this.isAutoHide = !0;
        this.autoMuteSound(!0)
    }
    public resumeBGM () {
        this.isAutoHide = !1;
        this.autoMuteSound(!1)
    }
    public visChange () {
        this.autoMuteSound(this.isHidden())
    }
}
