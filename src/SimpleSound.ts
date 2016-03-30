/**
 *
 * @author 
 *
 */
class SimpleSound {
    private _id: string;
    private _channel: egret.SoundChannel;
    private _sound: egret.Sound;
    static pool: Object = {};
    private position: number;
    private isPaused: boolean;
    static playFx(_id:string):void {
        if(SimpleSound.pool.hasOwnProperty(_id)) {
            SimpleSound.pool[_id].play();
        } else {
            SimpleSound.pool[_id] = new SimpleSound(_id);
        }
    }
    static remove(_id:string):void {
        if(SimpleSound.pool.hasOwnProperty(_id)) {
            delete SimpleSound.pool[_id];
        }
    }
    static mute(b:boolean):void {
        for(var m in SimpleSound.pool) {
            if(b) {
                SimpleSound.pool[m].pause();
            } else {
                SimpleSound.pool[m].resume();
            }
            
        }
    }
	public constructor(_id:string) {
        this._id = _id;
        this._sound = RES.getRes(this._id);
        this.play();
        this.isPaused = false;
	}
	public play():void {
    	if(this.isPaused) {
            return;
    	}
	    if(this._channel) {
            this._channel.stop();
	    }
        this._channel = this._sound.play(0,1);
        this._channel.volume = SoundController.getInstance().fxVolume;
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSdComplete,this);
	}
	private onSdComplete(e:egret.Event):void {
        SimpleSound.remove(this._id);
	}
	public pause():void {
	    if(this.isPaused) {
            return;
	    }
        this.isPaused = true;
        this.position = this._channel.position;
        this._channel.stop();
	}
	public resume():void {
	    if(!this.isPaused) {
            return;
	    }
        this.isPaused = false;
        this._channel = this._sound.play(this.position,1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSdComplete,this);
	}
	
}
