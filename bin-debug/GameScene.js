/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.isStart = false;
        this.initLevelData();
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.initLevelData = function () {
        this.isStart = false;
        this.lvConfig = new LevelConfig();
        this.lvConfig.level = GameData.level;
        this.lvConfig.goal = 100 + (GameData.level - 1) * 50;
        this.lvConfig.times = 60 + (GameData.level - 1) * 30;
        this.options = {};
        this.newOptions = [];
        this.isRetry = false;
        for (var i = 0; i < GameData.level - 1; i++) {
            var o = GameData.newItems[i];
            for (var m in o) {
                if (!this.options.hasOwnProperty(m)) {
                    this.options[m] = [];
                }
                var arr = o[m];
                this.options[m] = this.options[m].concat(arr);
            }
        }
        this.money = 0;
        this.newOptions = GameData.newItems[GameData.level - 1];
    };
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.effectLayer = new egret.DisplayObjectContainer();
        this.addChild(this.effectLayer);
        this.topLayer = new egret.DisplayObjectContainer();
        this.addChild(this.topLayer);
        this.csLayer = new egret.DisplayObjectContainer();
        this.gameLayer.addChild(this.csLayer);
        this.topIcon = new Tile("x", RES.getRes("game.top"), { y: 0 });
        this.gameLayer.addChild(this.topIcon);
        var cs1Holder = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        cs1Holder.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        cs1Holder.changeProps({ x: 95, y: 330 });
        this.csLayer.addChild(cs1Holder);
        var cs2Holder = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(240, 640));
        cs2Holder.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        cs2Holder.changeProps({ x: 327, y: 330 });
        this.csLayer.addChild(cs2Holder);
        var desk3 = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        var img = new egret.Bitmap(RES.getRes("game.desk3"));
        desk3.addChild(img);
        desk3.changeProps({ x: -51, y: 365 });
        this.gameLayer.addChild(desk3);
        img = new egret.Bitmap(RES.getRes("game.desk3"));
        img.x = 550;
        desk3.addChild(img);
        var desk2 = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(480, 640));
        img = new egret.Bitmap(RES.getRes("game.desk2"));
        desk2.addChild(img);
        desk2.changeProps({ x: 513, y: 91 });
        this.gameLayer.addChild(desk2);
        img = new egret.Bitmap(RES.getRes("game.desk2"));
        img.x = 565;
        desk2.addChild(img);
        this.midBar = new Tile("y", RES.getRes("game.langan2"), { x: 0, gap: -1 });
        this.midBar.x = 480 * ScreenSolution.getInstance().wScale;
        this.gameLayer.addChild(this.midBar);
        var desk1 = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        img = new egret.Bitmap(RES.getRes("game.desk1"));
        desk1.addChild(img);
        img = new egret.Bitmap(RES.getRes("game.desk1"));
        img.x = 1073;
        desk1.addChild(img);
        desk1.changeProps({ x: -66, y: 404 });
        this.gameLayer.addChild(desk1);
        this.leftBar = new Tile("y", RES.getRes("game.langan"), { x: 0, gap: -1 });
        this.leftBar.x = -36 * ScreenSolution.getInstance().minScale;
        this.gameLayer.addChild(this.leftBar);
        this.rightBar = new Tile("y", RES.getRes("game.langan"), { x: 0, gap: -1 });
        this.rightBar.x = ScreenSolution.getInstance().curW - 14 * ScreenSolution.getInstance().minScale;
        this.gameLayer.addChild(this.rightBar);
        var panelBg = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(240, 640), new egret.Point());
        var img = new egret.Bitmap(RES.getRes("game.panel"));
        img.x = -img.texture.textureWidth * 0.5;
        img.y = -img.texture.textureHeight * 0.5;
        panelBg.addChild(img);
        panelBg.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        panelBg.changeProps({ x: 58 + 110, y: 422 + 60 });
        this.gameLayer.addChild(panelBg);
        var cupPos = [[-51, -86 + 80], [65, -86 + 80], [-51, 15 + 67], [65, 15 + 67]];
        for (var i = 0; i < 4; i++) {
            var cup = new CupItem(i + 1, !this.options.hasOwnProperty("o1") || this.options["o1"].indexOf(i + 1) == -1, AutoResizeItem.RT_RELATIVE_TO, new egret.Point(415, 640), new egret.Point());
            cup.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
            cup.changeProps({ x: cupPos[i][0] + 412, y: cupPos[i][1] + 483 });
            cup.name = "o1_" + (i + 1);
            this.gameLayer.addChild(cup);
        }
        var saucePos = [[-182, 5], [-91, 5], [0, 5], [91, 5]];
        for (var i = 0; i < 4; i++) {
            var sauceItem = new SauceItem(i + 1, !this.options.hasOwnProperty("o3") || this.options["o3"].indexOf(i + 1) == -1, AutoResizeItem.RT_RELATIVE_TO, new egret.Point(720, 640), null);
            sauceItem.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
            sauceItem.changeProps({ x: saucePos[i][0] + 792, y: saucePos[i][1] + 103 });
            sauceItem.name = "o3_" + (i + 1);
            this.gameLayer.addChild(sauceItem);
        }
        var ballPos = [[-58, -45], [39, -45], [136, -45], [-58, 19], [39, 19], [136, 19]];
        for (var i = 0; i < 6; i++) {
            var ballItem = new IceBallItem(i + 1, !this.options.hasOwnProperty("o2") || this.options["o2"].indexOf(i + 1) == -1, AutoResizeItem.RT_RELATIVE_TO, new egret.Point(720, 640), null);
            ballItem.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
            ballItem.changeProps({ x: ballPos[i][0] + 685, y: ballPos[i][1] + 304 });
            ballItem.name = "o2_" + (i + 1);
            this.gameLayer.addChild(ballItem);
        }
        var iconPos = [[-271, 11], [-135, 11], [0, 11]];
        for (var i = 0; i < 3; i++) {
            var iconItem = new IconItem(i + 1, !this.options.hasOwnProperty("o5") || this.options["o5"].indexOf(i + 1) == -1, AutoResizeItem.RT_RELATIVE_TO, new egret.Point(720, 640), null);
            iconItem.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
            iconItem.changeProps({ x: iconPos[i][0] + 877, y: iconPos[i][1] + 447 });
            iconItem.name = "o5_" + (i + 1);
            this.gameLayer.addChild(iconItem);
        }
        var icon2Pos = [[-263, 0], [-130, 0], [3, 0]];
        for (var i = 0; i < 3; i++) {
            var icon2Item = new Icon2Item(i + 1, !this.options.hasOwnProperty("o4") || this.options["o4"].indexOf(i + 1) == -1, AutoResizeItem.RT_RELATIVE_TO, new egret.Point(720, 640), null);
            icon2Item.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
            icon2Item.changeProps({ x: icon2Pos[i][0] + 866, y: icon2Pos[i][1] + 552 });
            icon2Item.name = "o4_" + (i + 1);
            this.gameLayer.addChild(icon2Item);
        }
        var order1 = new OrderPanel(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(240, 640), null);
        order1.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        order1.changeProps({ x: 142, y: 286 });
        this.gameLayer.addChild(order1);
        var order2 = new OrderPanel(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(240, 640), null);
        order2.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        order2.changeProps({ x: 374, y: 286 });
        this.gameLayer.addChild(order2);
        var trashItem = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 640));
        var trashImg = new egret.Bitmap(RES.getRes("game.trash"));
        trashItem.addChild(trashImg);
        trashItem.changeProps({ x: 0, y: 542 });
        this.gameLayer.addChild(trashItem);
        this.trashItem = trashItem;
        this.icecream = new IceCream();
        this.icecream.setLockPt(new egret.Point(0, 640), new egret.Point());
        this.icecream.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        this.icecream.changeProps({ x: 172, y: 442 });
        this.gameLayer.addChild(this.icecream);
        this.icecream.init({});
        this.icecream.setLocked(false);
        this.bar = new GameBar(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(313, 0), null);
        this.bar.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        this.bar.changeProps({ x: 313, y: 31 });
        this.btnsLayer.addChild(this.bar);
        this.clock = new Clock(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 0));
        this.clock.changeProps({ x: -1, y: -8 });
        this.clock.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        this.btnsLayer.addChild(this.clock);
        var pauseBtn = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(0, 0));
        var pauseImg = new egret.Bitmap(RES.getRes("game.btn_pause"));
        pauseImg.x = -50;
        pauseImg.y = -50;
        pauseBtn.addChild(pauseImg);
        pauseBtn.changeProps({ x: 75, y: 117 });
        this.btnsLayer.addChild(pauseBtn);
        pauseBtn.touchEnabled = true;
        pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPauseClick, this);
        this.icecream.touchEnabled = true;
        this.icecream.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onIceTouchBegan, this);
        this.csArr = [];
        var csVo1 = new CsVo();
        csVo1.holder = cs1Holder;
        csVo1.view = null;
        csVo1.order = order1;
        this.csArr[0] = csVo1;
        var csVo2 = new CsVo();
        csVo2.holder = cs2Holder;
        csVo2.view = null;
        csVo2.order = order2;
        this.csArr[1] = csVo2;
        this.bar.setData(this.lvConfig.level, this.money, this.lvConfig.goal);
        this.clock.setTime(this.lvConfig.times);
        var logo = new AutoResizeItem(AutoResizeItem.RT_RELATIVE_TO, new egret.Point(960, 640));
        logo.setPolicy(AutoResizeItem.RT_AUTO, AutoResizeItem.RT_RELATIVE_TO);
        var logoImg = new SpilLogo();
        logo.addChild(logoImg);
        logoImg.setPosition(0, -1, 0, -10);
        logo.changeProps({ x: 200, y: 640 });
        this.btnsLayer.addChild(logo);
    };
    p.onGamePanelEvent = function (e) {
        switch (e.data.type) {
            case "NextLevel":
                egret.Tween.get(this.passLayer).to({ y: -ScreenSolution.getInstance().curH }, 8 * GameData.FPS).call(this.nextLevel, this);
                break;
            case "Retry":
                egret.Tween.get(this.lostLayer).to({ y: -ScreenSolution.getInstance().curH }, 8 * GameData.FPS).call(this.retry, this);
                break;
            case "Home":
                this.cleanEvent();
                this.changeScene("map");
                break;
            case "More":
                var o = SpilAPI.getMoreObj();
                if (o && o.hasOwnProperty("action") && o["action"] !== false) {
                    o["action"]();
                }
                break;
        }
    };
    p.cleanEvent = function () {
        this.removeEventListener("GamePanelEvent", this.onGamePanelEvent, this);
        this.removeEventListener("IceCreamChanged", this.onIceCreamChanged, this);
        this.removeEventListener("GoalShowed", this.onGoalShowed, this);
        this.removeEventListener("GameResumed", this.onGameResumed, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onIceTouchBegan, this);
    };
    p.doLevelClean = function () {
        if (this.passLayer) {
            this.passLayer.parent.removeChild(this.passLayer);
            this.passLayer = null;
        }
        if (this.lostLayer) {
            this.lostLayer.parent.removeChild(this.lostLayer);
            this.lostLayer = null;
        }
        if (this.pauseLayer) {
            this.pauseLayer.parent.removeChild(this.pauseLayer);
            this.pauseLayer = null;
        }
        this.icecream.reset();
        for (var i = 0; i < 2; i++) {
            this.csArr[i].reset();
        }
    };
    p.retry = function () {
        this.doLevelClean();
        this.bar.setMoney(this.money);
        this.money = 0;
        this.isRetry = true;
        this.isStart = false;
        this.showGoal();
    };
    p.nextLevel = function () {
        this.doLevelClean();
        GameData.level = GameData.level + 1;
        this.initLevelData();
        this.money = 0;
        this.bar.setData(this.lvConfig.level, this.money, this.lvConfig.goal);
        this.showGoal();
    };
    p.onPauseClick = function (e) {
        this.showPause(true);
    };
    p.onIceTouchBegan = function (e) {
        //this.icecream.cacheAsBitmap = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStop, this);
    };
    p.onMove = function (e) {
        var pt = this.gameLayer.globalToLocal(e.stageX, e.stageY);
        this.icecream.x = pt.x;
        this.icecream.y = pt.y;
    };
    p.onStop = function (e) {
        //this.icecream.cacheAsBitmap = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStop, this);
        var r = this.trashItem.getBounds();
        r.offset(this.trashItem.x, this.trashItem.y);
        r.width = r.width * ScreenSolution.getInstance().minScale;
        r.height = r.height * ScreenSolution.getInstance().minScale;
        var r1 = this.icecream.getBounds();
        r1.x = r1.x * ScreenSolution.getInstance().minScale + this.icecream.x;
        r1.y = r1.y * ScreenSolution.getInstance().minScale + this.icecream.y;
        //r1.offset(this.icecream.x, this.icecream.y);
        r1.width = r1.width * ScreenSolution.getInstance().minScale;
        r1.height = r1.height * ScreenSolution.getInstance().minScale;
        if (r.intersects(r1)) {
            this.icecream.x = this.icecream.getSelfX();
            this.icecream.y = this.icecream.getSelfY();
            SimpleSound.playFx("fx_trash");
            this.icecream.reset();
        }
        else {
            var eatted = false;
            for (var i = 0; i < 2; i++) {
                var csVo = this.csArr[i];
                var r2_1 = csVo.holder.getBounds();
                var r2_2 = csVo.order.getBounds();
                //r2_1.offset(csVo.holder.x, csVo.holder.y);
                //r2_2.offset(csVo.order.x, csVo.order.y);
                r2_1.x = r2_1.x * ScreenSolution.getInstance().minScale + csVo.holder.x;
                r2_1.y = r2_1.y * ScreenSolution.getInstance().minScale + csVo.holder.y;
                r2_2.x = r2_2.x * ScreenSolution.getInstance().minScale + csVo.holder.x;
                r2_2.y = r2_2.y * ScreenSolution.getInstance().minScale + csVo.holder.y;
                r2_1.width *= ScreenSolution.getInstance().minScale;
                r2_1.height *= ScreenSolution.getInstance().minScale;
                r2_2.width *= ScreenSolution.getInstance().minScale;
                r2_2.height *= ScreenSolution.getInstance().minScale;
                if ((r1.intersects(r2_1) || r1.intersects(r2_2)) && csVo.status == CsVo.ST_WAIT && csVo.doFeed(this.icecream.getData())) {
                    eatted = true;
                    break;
                }
            }
            if (eatted) {
                this.icecream.reset();
                this.icecream.x = this.icecream.getSelfX();
                this.icecream.y = this.icecream.getSelfY();
            }
            else {
                var t = egret.Tween.get(this.icecream);
                t.to({ x: this.icecream.getSelfX(), y: this.icecream.getSelfY() }, 8 * GameData.FPS);
            }
        }
    };
    p.createUnlockAnimation = function () {
        var starFactory = new egret.MovieClipDataFactory(RES.getRes("star_json"), RES.getRes("star_png"));
        var star = new egret.MovieClip(starFactory.generateMovieClipData("star"));
        return star;
    };
    p.start = function () {
        _super.prototype.start.call(this);
        this.addEventListener("GamePanelEvent", this.onGamePanelEvent, this);
        this.addEventListener("IceCreamChanged", this.onIceCreamChanged, this);
        this.addEventListener("GoalShowed", this.onGoalShowed, this);
        this.addEventListener("GameResumed", this.onGameResumed, this);
        this.showGoal();
    };
    p.showGoal = function () {
        this.goalLayer = new GoalLayer(this.lvConfig.level, this.lvConfig.goal);
        this.topLayer.addChild(this.goalLayer);
    };
    p.onGoalShowed = function (e) {
        this.goalLayer.parent.removeChild(this.goalLayer);
        if (this.isRetry) {
            this.startGame();
        }
        else {
            this.showUnlockAnimation();
        }
    };
    p.showUnlockAnimation = function () {
        for (var m in this.newOptions) {
            var arr = this.newOptions[m];
            for (var i = arr.length - 1; i >= 0; i--) {
                var item = this.gameLayer.getChildByName(m + "_" + arr[i]);
                item.unlock();
                var a = this.createUnlockAnimation();
                a.scaleX = a.scaleY = ScreenSolution.getInstance().minScale;
                a.x = item.x - 100 * ScreenSolution.getInstance().minScale;
                a.y = item.y - 150 * ScreenSolution.getInstance().minScale;
                this.topLayer.addChild(a);
                //a.addEventListener(egret.Event.LOOP_COMPLETE, this.onALoopComplete, this);
                a.addEventListener(egret.Event.COMPLETE, this.onAComplete, this);
                a.play(2);
                if (!this.options.hasOwnProperty(m)) {
                    this.options[m] = [];
                }
                this.options[m].push(arr[i]);
            }
        }
    };
    p.onAComplete = function (e) {
        e.target.parent.removeChild(e.target);
        if (this.isStart == false && this.topLayer.numChildren == 0) {
            this.startGame();
        }
    };
    // create customer
    p.startGame = function () {
        this.isStart = true;
        this.passTime = 0;
        this.money = 0;
        this.isPaused = false;
        this.isOver = false;
        this.pauseLayer = null;
        this.createCsTime = GameData.CREATE_CS_TIME - 1000;
        ScreenState.getInstance().addListener(this.onStateChange, this);
        egret.Ticker.getInstance().register(this.onTick, this);
    };
    p.onStateChange = function (type) {
        if (this.isPaused || this.isOver) {
            return;
        }
        if (ScreenState.getInstance().isActive() == false) {
            this.showPause(true);
        }
    };
    p.onGameResumed = function (e) {
        this.showPause(false);
    };
    p.showPause = function (b) {
        if (this.isPaused == b) {
            return;
        }
        this.isPaused = b;
        if (b) {
            this.pauseLayer = new PauseLayer();
            this.topLayer.addChild(this.pauseLayer);
        }
        else {
            this.pauseLayer.parent.removeChild(this.pauseLayer);
            this.pauseLayer = null;
        }
    };
    p.onTick = function (dt) {
        if (this.isPaused || this.isOver) {
            return;
        }
        this.csArr[0].tick(dt);
        this.csArr[1].tick(dt);
        if (this.csArr[0].status == CsVo.ST_PAYED) {
            var payed = this.csArr[0].getMoney();
            this.money += payed;
            this.bar.setMoney(this.money);
            this.showEarnAnimation(payed, 1);
        }
        if (this.csArr[1].status == CsVo.ST_PAYED) {
            var payed = this.csArr[1].getMoney();
            this.money += payed;
            this.bar.setMoney(this.money);
            this.showEarnAnimation(payed, 2);
        }
        this.createCsTime += dt;
        if (this.createCsTime >= GameData.CREATE_CS_TIME) {
            this.createCustomer();
        }
        this.passTime += dt;
        this.clock.setTime(this.lvConfig.times - this.passTime / 1000);
        if (this.passTime > this.lvConfig.times * 1000) {
            this.gameOver();
        }
    };
    p.showEarnAnimation = function (money, pos) {
        var item = new egret.DisplayObjectContainer();
        var txt = new egret.TextField();
        txt.text = "+" + money.toString();
        txt.textColor = 0xFFFF00;
        txt.fontFamily = "Arial";
        txt.size = 60;
        txt.bold = true;
        item.addChild(txt);
        item.scaleX = item.scaleY = ScreenSolution.getInstance().minScale;
        item.x = this.csArr[pos - 1].order.getSelfX();
        item.y = this.csArr[pos - 1].order.getSelfY();
        this.effectLayer.addChild(item);
        egret.Tween.get(item).to({ y: item.y - 100 * ScreenSolution.getInstance().minScale }, 24 * GameData.FPS).call(this.removeEffect, this, [item]);
    };
    p.removeEffect = function (item) {
        if (!item.parent) {
            return;
        }
        item.parent.removeChild(item);
    };
    p.createCustomer = function () {
        this.createCsTime = 0;
        var pos = -1;
        var arr = [];
        if (this.csArr[0].status == CsVo.ST_IDLE) {
            arr.push(0);
        }
        else if (this.csArr[1].status == CsVo.ST_IDLE) {
            arr.push(1);
        }
        if (arr.length == 0) {
            return;
        }
        if (arr.length == 1) {
            pos = arr[0];
        }
        else {
            pos = arr[Math.floor(Math.random() * arr.length)];
        }
        var csVo = this.csArr[pos];
        SimpleSound.playFx("fx_in");
        var customer = new Customer(Math.floor(Math.random() * 5) + 1);
        csVo.holder.addChild(customer);
        csVo.view = customer;
        csVo.start(this.createOrderData());
        this.csArr[pos] = csVo;
    };
    p.createOrderData = function () {
        var o = {};
        for (var m in this.options) {
            if (m == "o1" || m == "o2") {
                o[m] = this.options[m][Math.floor(Math.random() * this.options[m].length)];
            }
            else {
                if (Math.random() > 0.5) {
                    o[m] = this.options[m][Math.floor(Math.random() * this.options[m].length)];
                }
            }
        }
        return o;
    };
    p.gameOver = function () {
        if (this.isOver) {
            return;
        }
        this.isOver = true;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStop, this);
        this.icecream.x = this.icecream.getSelfX();
        this.icecream.y = this.icecream.getSelfY();
        this.icecream.reset();
        egret.Ticker.getInstance().unregister(this.onTick, this);
        SpilAPI.needBreak(this, this.onAdPause, this.onAdResume);
    };
    p.onAdPause = function () {
        SoundController.getInstance().autoMuteSound(true);
    };
    p.onAdResume = function () {
        SoundController.getInstance().autoMuteSound(false);
        if (this.money >= this.lvConfig.goal) {
            if (this.lvConfig.level == 12) {
                this.win();
            }
            else {
                this.pass();
            }
        }
        else {
            this.lost();
        }
    };
    p.win = function () {
        this.changeScene("win");
    };
    p.pass = function () {
        this.passLayer = new PassLayer(this.money, this.lvConfig.goal);
        GameData.avaLevels = Math.min(12, Math.max(GameData.avaLevels, GameData.level + 1));
        //GameData.money += this.money;
        this.money = 0;
        this.topLayer.addChild(this.passLayer);
    };
    p.lost = function () {
        this.lostLayer = new LostLayer(this.money, this.lvConfig.goal);
        this.topLayer.addChild(this.lostLayer);
    };
    p.onIceCreamChanged = function (e) {
        var item = e.target;
        var a = this.createUnlockAnimation();
        a.scaleX = a.scaleY = ScreenSolution.getInstance().minScale;
        a.x = item.x - 100 * ScreenSolution.getInstance().minScale;
        a.y = item.y - 150 * ScreenSolution.getInstance().minScale;
        this.topLayer.addChild(a);
        //a.addEventListener(egret.Event.LOOP_COMPLETE, this.onALoopComplete, this);
        a.addEventListener(egret.Event.COMPLETE, this.onAComplete, this);
        a.play(1);
        var _oldData = this.icecream.getData();
        var part = "o" + e.data.part;
        if (_oldData.hasOwnProperty(part) && _oldData[part] > 0) {
            this.icecream.changePart(part, e.data.val);
            return;
        }
        var checkArr = [];
        if (e.data.part > 1) {
            checkArr.push(1);
        }
        if (e.data.part > 2) {
            checkArr.push(2);
        }
        for (var i = checkArr.length - 1; i >= 0; i--) {
            var _id = checkArr[i];
            if (!_oldData.hasOwnProperty("o" + _id) || _oldData["o" + _id] == 0) {
                return;
            }
        }
        if (part == "o1") {
            var a = this.createUnlockAnimation();
            a.scaleX = a.scaleY = ScreenSolution.getInstance().minScale;
            a.x = this.icecream.x - 100 * ScreenSolution.getInstance().minScale;
            a.y = this.icecream.y - 50 * ScreenSolution.getInstance().minScale;
            this.topLayer.addChild(a);
            //a.addEventListener(egret.Event.LOOP_COMPLETE, this.onALoopComplete, this);
            a.addEventListener(egret.Event.COMPLETE, this.onAComplete, this);
            a.play(1);
        }
        this.icecream.changePart(part, e.data.val);
    };
    p.relayout = function (type) {
        _super.prototype.relayout.call(this, type);
        this.topIcon.render(0, ScreenSolution.getInstance().curW);
        this.midBar.x = 480 * ScreenSolution.getInstance().wScale;
        this.midBar.render(0, ScreenSolution.getInstance().curH);
        this.leftBar.x = -36 * ScreenSolution.getInstance().minScale;
        this.leftBar.render(0, ScreenSolution.getInstance().curH);
        this.rightBar.x = ScreenSolution.getInstance().curW - 14 * ScreenSolution.getInstance().minScale;
        this.rightBar.render(0, ScreenSolution.getInstance().curH);
    };
    return GameScene;
})(BaseLayer);
egret.registerClass(GameScene,'GameScene');
