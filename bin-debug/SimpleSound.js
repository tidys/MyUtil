/**
 *
 * @author
 *
 */
var SimpleSound = (function () {
    function SimpleSound(_id) {
        this._id = _id;
        this._sound = RES.getRes(this._id);
        this.play();
        this.isPaused = false;
    }
    var d = __define,c=SimpleSound,p=c.prototype;
    SimpleSound.playFx = function (_id) {
        if (SimpleSound.pool.hasOwnProperty(_id)) {
            SimpleSound.pool[_id].play();
        }
        else {
            SimpleSound.pool[_id] = new SimpleSound(_id);
        }
    };
    SimpleSound.remove = function (_id) {
        if (SimpleSound.pool.hasOwnProperty(_id)) {
            delete SimpleSound.pool[_id];
        }
    };
    SimpleSound.mute = function (b) {
        for (var m in SimpleSound.pool) {
            if (b) {
                SimpleSound.pool[m].pause();
            }
            else {
                SimpleSound.pool[m].resume();
            }
        }
    };
    p.play = function () {
        if (this.isPaused) {
            return;
        }
        if (this._channel) {
            this._channel.stop();
        }
        this._channel = this._sound.play(0, 1);
        this._channel.volume = SoundController.getInstance().fxVolume;
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSdComplete, this);
    };
    p.onSdComplete = function (e) {
        SimpleSound.remove(this._id);
    };
    p.pause = function () {
        if (this.isPaused) {
            return;
        }
        this.isPaused = true;
        this.position = this._channel.position;
        this._channel.stop();
    };
    p.resume = function () {
        if (!this.isPaused) {
            return;
        }
        this.isPaused = false;
        this._channel = this._sound.play(this.position, 1);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSdComplete, this);
    };
    SimpleSound.pool = {};
    return SimpleSound;
})();
egret.registerClass(SimpleSound,'SimpleSound');
