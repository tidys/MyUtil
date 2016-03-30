/**
 *
 * @author 
 *
 */
class LoopSound {
    private _sound: egret.Sound;
    private _channel: egret.SoundChannel;
    private _soundLabel: string;
	public constructor(str:string) {
        this._soundLabel = str;
        this._sound = RES.getRes(str);
        this._channel = this._sound.play(0, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this)
	}
	private onSoundComplete(e:egret.Event):void {
        this._channel = this._sound.play(0,1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this)
	}
	public play():void {
        this._channel = this._sound.play(0,1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this)
	}
	public pause():void {
        if(this._channel) {
            this._channel.stop();
        }
	}
	public stop():void {
    	if(!this._channel) {
            return;
    	}
        this._channel.stop();
        this._channel = null;
	}
	public changeVolume(v:number):void {
    	if(this._channel) {
            this._channel.volume = v;
    	}
        
	}
}
