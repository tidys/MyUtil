/**
 *
 * @author
 *
 */
var MusicUI = (function (_super) {
    __extends(MusicUI, _super);
    function MusicUI() {
        _super.call(this);
        var view = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(960, 0), new egret.Point(640, 0));
        view.changeProps({ x: 835, y: 12 }, { x: 550, y: 7 });
        this.addChild(view);
        view.addChild(new MusicButton());
        var fxView = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 0), new egret.Point(0, 0));
        fxView.changeProps({ x: 10, y: 12 });
        this.addChild(fxView);
        fxView.addChild(new FxButton);
    }
    var d = __define,c=MusicUI,p=c.prototype;
    return MusicUI;
})(egret.DisplayObjectContainer);
egret.registerClass(MusicUI,'MusicUI');
