/**
 *
 * @author
 *
 */
var LoopSound = (function () {
    function LoopSound(str) {
        this._soundLabel = str;
        this._sound = RES.getRes(str);
        this._channel = this._sound.play(0, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }
    var d = __define,c=LoopSound,p=c.prototype;
    p.onSoundComplete = function (e) {
        this._channel = this._sound.play(0, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    p.play = function () {
        this._channel = this._sound.play(0, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    p.pause = function () {
        if (this._channel) {
            this._channel.stop();
        }
    };
    p.stop = function () {
        if (!this._channel) {
            return;
        }
        this._channel.stop();
        this._channel = null;
    };
    p.changeVolume = function (v) {
        if (this._channel) {
            this._channel.volume = v;
        }
    };
    return LoopSound;
})();
egret.registerClass(LoopSound,'LoopSound');
