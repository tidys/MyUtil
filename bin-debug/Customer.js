/**
 *
 * @author
 *
 */
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer(roleId) {
        _super.call(this);
        this.offset = [[0, -15], [-10, 10], [16, -10], [27, -35], [16, -19]];
        this.pos = [[[-30, -139], [-30, -139], [-24, -135], [-29, -202]], [[-4, -178], [-4, -178], [-3, -173], [-9, -237]], [[-54, -109], [-54, -109], [-51, -100], [-65, -157]], [[-54, -130], [-53, -130], [-56, -137], [-63, -183]], [[-43, -169], [-45, -181], [-43, -170], [-51, -233]]];
        this.emId = 1;
        this.roleId = roleId;
        var body = new egret.Bitmap(RES.getRes("cs." + roleId.toString() + "body"));
        this.addChild(body);
        this.emicon = new egret.DisplayObjectContainer();
        this.addChild(this.emicon);
        var em1 = new egret.Bitmap(RES.getRes("cs." + roleId.toString() + "e1"));
        this.emicon.addChild(em1);
        var hair = new egret.Bitmap(RES.getRes("cs." + roleId.toString() + "hair"));
        this.addChild(hair);
        switch (this.roleId) {
            case 1:
                body.x = -107;
                body.y = -204 - 15;
                hair.x = -80;
                hair.y = -230 - 15;
                em1.x = -30;
                em1.y = -139 - 15;
                break;
            case 2:
                body.x = -180 - 10;
                body.y = -242 + 10;
                hair.x = -73 - 10;
                hair.y = -265 + 10;
                em1.x = -4 - 10;
                em1.y = -178 + 10;
                break;
            case 3:
                body.x = -96 + 16;
                body.y = -158 - 10;
                hair.x = -88 + 16;
                hair.y = -201 - 10;
                em1.x = -54 + 16;
                em1.y = -109 - 10;
                break;
            case 4:
                body.x = -153 + 27;
                body.y = -185 - 35;
                hair.x = -92 + 27;
                hair.y = -223 - 35;
                em1.x = -54 + 27;
                em1.y = -130 - 35;
                break;
            case 5:
                body.x = -145 + 16;
                body.y = -234 - 19;
                hair.x = -64 + 16;
                hair.y = -243 - 19;
                em1.x = -43 + 16;
                em1.y = -169 - 19;
                break;
        }
    }
    var d = __define,c=Customer,p=c.prototype;
    p.changeEm = function (n) {
        if (this.emId == n) {
            return;
        }
        var emPos = [[[-30, -139 - 15], [-30, -139 - 15], [-24, -135 - 15], [-29, -202 - 15]],
            [[-4 - 10, -178 + 10], [-4 - 10, -178 + 10], [-3 - 10, -173 + 10], [-9 - 10, -237 + 10]],
            [[-54 + 16, -109 - 10], [-54 + 16, -109 - 10], [-51 + 16, -100 - 10], [-65 + 16, -157 - 10]],
            [[-54 + 27, -130 - 35], [-53 + 27, -131 - 35], [-56 + 27, -137 - 35], [-63 + 27, -183 - 35]],
            [[-43 + 16, -169 - 19], [-45 + 16, -181 - 19], [-43 + 16, -170 - 19], [-51 + 16, -233 - 19]]];
        this.emId = n;
        this.emicon.removeChildren();
        var icon = new egret.Bitmap(RES.getRes("cs." + this.roleId.toString() + "e" + n.toString()));
        icon.x = emPos[this.roleId - 1][n - 1][0];
        icon.y = emPos[this.roleId - 1][n - 1][1];
        this.emicon.addChild(icon);
    };
    return Customer;
})(egret.DisplayObjectContainer);
egret.registerClass(Customer,'Customer');
