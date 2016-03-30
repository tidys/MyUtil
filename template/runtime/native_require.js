
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/spil/SpilAPI.js",
	"bin-debug/CsVo.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/AutoResizeItem.js",
	"bin-debug/OrderPanel.js",
	"bin-debug/BaseLayer.js",
	"bin-debug/AutoExtendItem.js",
	"bin-debug/AutoExtendVo.js",
	"bin-debug/GameScene.js",
	"bin-debug/Dress.js",
	"bin-debug/DressItem.js",
	"bin-debug/Listener.js",
	"bin-debug/GameData.js",
	"bin-debug/Girl.js",
	"bin-debug/LoopSound.js",
	"bin-debug/Customer.js",
	"bin-debug/PatienceSign.js",
	"bin-debug/GameBar.js",
	"bin-debug/PassLayer.js",
	"bin-debug/PauseLayer.js",
	"bin-debug/LostLayer.js",
	"bin-debug/Main.js",
	"bin-debug/SoundController.js",
	"bin-debug/MapScene.js",
	"bin-debug/ScreenSolution.js",
	"bin-debug/WinScene.js",
	"bin-debug/SpilLogo.js",
	"bin-debug/StartScene.js",
	"bin-debug/SplashScreen.js",
	"bin-debug/HelpLayer.js",
	"bin-debug/ScreenState.js",
	"bin-debug/ExLoadingUI.js",
	"bin-debug/SimpleSound.js",
	"bin-debug/LevelButton.js",
	"bin-debug/Tile.js",
	"bin-debug/IceCream.js",
	"bin-debug/LevelConfig.js",
	"bin-debug/OptionItem.js",
	"bin-debug/CupItem.js",
	"bin-debug/SauceItem.js",
	"bin-debug/IceBallItem.js",
	"bin-debug/IconItem.js",
	"bin-debug/Icon2Item.js",
	"bin-debug/Clock.js",
	"bin-debug/FxButton.js",
	"bin-debug/MusicButton.js",
	"bin-debug/MusicUI.js",
	"bin-debug/GoalLayer.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "noScale",
		contentWidth: 960,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};