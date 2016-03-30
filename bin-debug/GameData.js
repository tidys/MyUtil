/**
 *
 * @author
 *
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.init = function () {
    };
    GameData.FPS = 30;
    GameData.money = 0;
    GameData.avaLevels = 1;
    GameData.CREATE_CS_TIME = 5000;
    GameData.transitionListener = new Listener();
    GameData.isFirst = true;
    GameData.CS_TIME = 50;
    GameData.PRICE = { o1: 10, o2: 15, o3: 5, o4: 5, o5: 5 };
    GameData.newItems = [
        { o1: [1, 2], o2: [1, 2] },
        { o1: [3], o2: [3, 4], o3: [1] },
        { o1: [4], o3: [2] },
        { o2: [5, 6] },
        { o3: [3] },
        { o3: [4] },
        { o4: [1] },
        { o4: [2] },
        { o4: [3] },
        { o5: [1] },
        { o5: [2] },
        { o5: [3] }
    ];
    return GameData;
})();
egret.registerClass(GameData,'GameData');
