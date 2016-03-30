//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private exLoadingView: ExLoadingUI;
    private bgLayer: egret.DisplayObjectContainer;
    private bgImg: egret.Bitmap = null;
    private sceneLayer: egret.DisplayObjectContainer;
    private transitionLayer: egret.DisplayObjectContainer;
    private txt: egret.TextField;
    private musicUI: MusicUI;
    private playBtn: AutoResizeItem;
    private spilLogo:AutoResizeItem;
    private isResLoaded:boolean = false;
    private isSpilReady:boolean = false;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        this.stage.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.EXACT_FIT : egret.StageScaleMode.NO_SCALE;
        ScreenState.getInstance();
        ScreenSolution.getInstance();
        egret.Bitmap.defaultSmoothing = true;
        window.addEventListener("scroll", function(){
            if(document.activeElement === document.body && window["scrollY"] > 0) {
                document.body.scrollTop = 0;
            }
            });
        this.stage.addEventListener(egret.Event.RESIZE,this.onResized,this);
        this.stage.addEventListener(egret.StageOrientationEvent.ORIENTATION_CHANGE,this.onResized,this);
        if(egret.Capabilities.isMobile) {
            if(ScreenSolution.getInstance().isLandscape) {
                this.scaleX = 1 / ScreenSolution.getInstance().wScale;
                this.scaleY = 1 / ScreenSolution.getInstance().hScale;
            }
            else {
                this.scaleX = ScreenSolution.getInstance().srcW / ScreenSolution.getInstance().curW;
                this.scaleY = ScreenSolution.getInstance().srcH / ScreenSolution.getInstance().curH;
            }
        }


        this.bgLayer = new egret.DisplayObjectContainer();
        this.addChild(this.bgLayer);
        this.sceneLayer = new egret.DisplayObjectContainer();
        this.addChild(this.sceneLayer);
        this.transitionLayer = new egret.DisplayObjectContainer();
        this.addChild(this.transitionLayer);
        
        //Config to load process interface
        
    
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
        this.addEventListener("SceneChanged",this.onSceneChanged,this);
        this.addEventListener("GoNext",this.onGoNext,this);
        this.addEventListener("Loaded",this.onResLoaded,this);
        //
        SpilAPI.getInfo(this.onSpilLoaded,this);
    }
    private onSpilLoaded():void {
        this.isSpilReady = true;
        var logoObj:Object = SpilAPI.getLogo();
        if(logoObj["image"] === false) {
            return;
        }
        SpilLogo.hasLogo = SpilAPI.getLogoImage() !== false;
        if(SpilLogo.hasLogo) {
            SpilLogo.loadLogo(SpilAPI.getLogoImage());
        }
        if(this.isResLoaded) {
            this.checkSplash();
        }
        
        
    }
    private checkSplash():void {
        var o:Object = SpilAPI.getSplash();
       
        if(o["show"] !== false) {
            this.showSplash();
        } else {
            this.onSplashShowed();
        }
    }
    private showSplash():void {
        var splash:SplashScreen = new SplashScreen();
        this.addChild(splash);
        egret.setTimeout(this.removeSplash, this, 5 * 1000, splash);
    }
    private removeSplash(layer:egret.DisplayObject):void {
        this.removeChild(layer);
        this.onSplashShowed();
    }
    private onSplashShowed():void {
        this.showScene("start");
    }
    private onGoNext(e: egret.Event): void {
        var o: egret.DisplayObject = this.transitionLayer.getChildAt(0);
        var t: egret.Tween = egret.Tween.get(o);
        t.to({ y: -1000 * ScreenSolution.getInstance().hScale },8 * GameData.FPS).call(this.onTransitionComplete,this);
    }
    private onTransitionComplete(): void {
        this.transitionLayer.removeChildren();
        GameData.transitionListener.sendNotify("onTweenComplete");
    }
    
    private onSceneChanged(e: egret.Event): void {
      


        this.showScene(e.data.scene);
    }
    private onResized(e: egret.Event): void {
        //console.log("resize")
        ScreenSolution.getInstance().update();
        if(this.bgImg!=null) {
            this.bgImg.scaleX = this.bgImg.scaleY = ScreenSolution.getInstance().bgScale;
            this.bgImg.x = ScreenSolution.getInstance().curW - ScreenSolution.getInstance().srcW * ScreenSolution.getInstance().bgScale;
        }
        if(egret.Capabilities.isMobile) {
            if(ScreenSolution.getInstance().isLandscape) {
                this.scaleX = 1 / ScreenSolution.getInstance().wScale;
                this.scaleY = 1 / ScreenSolution.getInstance().hScale;
            }
            else {
                this.scaleX = ScreenSolution.getInstance().srcW / ScreenSolution.getInstance().curW;
                this.scaleY = ScreenSolution.getInstance().srcH / ScreenSolution.getInstance().curH;
            }
        }
        //
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if(event.groupName == "preload") {
            //SpilAPI.getInfo(this.onSpilLoaded,this);
            //
            //this.startLoad();
            this.playBtn = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO,new egret.Point(400,300),new egret.Point(300,400));
            var img: egret.Bitmap = new egret.Bitmap(RES.getRes("btn_play"));
            img.x = -0.5 * img.getBounds().width * 0.5;
            img.y = -0.5 * img.getBounds().height * 0.5;
            this.playBtn.addChild(img);
            this.playBtn.changeProps({ x: 480,y: 320 },{ x: 320,y: 480 });
            this.addChild(this.playBtn);
            this.playBtn.touchEnabled = true;
            this.playBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlay,this);
            //console.log("add playBtn"+this.playBtn.x+","+this.playBtn.y+","+ScreenSolution.getInstance().curW + ","+ScreenSolution.getInstance().curH+","+ScreenSolution.getInstance().curW+","+ScreenSolution.getInstance().curH)
            
        }
        else if(event.groupName == "loading") {
            this.loadingView.parent.removeChild(this.loadingView);
            this.loadingView = null;
            this.exLoadingView = new ExLoadingUI();
            this.addChild(this.exLoadingView);
            this.bgImg = new egret.Bitmap(RES.getRes("bgImg"));
            this.bgLayer.addChild(this.bgImg);
            this.bgImg.scaleX = this.bgImg.scaleY = ScreenSolution.getInstance().bgScale;
            this.bgImg.x = ScreenSolution.getInstance().curW - ScreenSolution.getInstance().srcW * ScreenSolution.getInstance().bgScale;
            RES.loadGroup("game");
            
        }
        else {
            
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            //this.createGameScene();
            this.exLoadingView.onLoaded();
        }
    }
    private onResLoaded(e:egret.Event):void {
        this.exLoadingView.parent.removeChild(this.exLoadingView);
        this.exLoadingView = null;
        this.isResLoaded = true;
        if(this.isSpilReady) {
            this.checkSplash();
        }
    }
    private onPlay(e: egret.TouchEvent): void {
        this.playBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlay,this);
        this.removeChild(this.playBtn);
        this.playBtn = null;
        this.loadingView = new LoadingUI();

        this.addChild(this.loadingView);
        //SoundController.getInstance().showLoop("sound_bg");
        //SoundController.getInstance().pause("sound_bg");
        this.startLoad();
    }
    private startLoad(): void {
        this.loadingView.setProgress(0,1);
        this.loadingView.visible = true;
        RES.loadGroup("loading");
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if(event.groupName == "loading") {
        
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        } else if(event.groupName != "preload") {
            this.exLoadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        this.showScene("start")

    }
    private showScene(str: string): void {
        this.sceneLayer.removeChildren();


        switch(str) {
            case "start":
                if(!this.musicUI) {
                    this.musicUI = new MusicUI();
                    this.addChild(this.musicUI)
                    SoundController.getInstance().showLoop("sound_bg");
                }
                this.musicUI.visible = true;
                var startScene: StartScene = new StartScene();
                this.sceneLayer.addChild(startScene);
                break;
            case "map":
            this.musicUI.visible =true;
                var mapScene: MapScene = new MapScene();
                this.sceneLayer.addChild(mapScene);
                break;
            case "game":
                this.musicUI.visible = false;
                var gameScene: GameScene = new GameScene();
                this.sceneLayer.addChild(gameScene);
                break;
            case "win":
                var winScene:WinScene = new WinScene();
                this.sceneLayer.addChild(winScene);
                break;
                
            
        }

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        var self: any = this;

        var parser: egret.HtmlTextParser = new egret.HtmlTextParser();
        var textflowArr: Array<Array<egret.ITextElement>> = [];
        for(var i: number = 0;i < result.length;i++) {
            textflowArr.push(parser.parser(result[i]));
        }


    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield: egret.TextField,textFlow: Array<egret.ITextElement>): void {
        textfield.textFlow = textFlow;
    }
}


