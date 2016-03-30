var SpilData = {
    id: '576742227280298200' 
};



    
var SpilAPI = {
    _listener:null,
    _body:null,
    _isReady:false,
    _api:null,
    addListener:function(func,body) {
        this._listener = func;
        this._body = body;
    },
    init:function(api){
        this._api = api;
        if(this._listener != null) {
            this._listener.apply(this._body,[]);
        }
        this._isReady = true;
    },
    getLogo:function(){
        return this._api.Branding.getLogo();
    },
    getLogoImage:function(){
        return this._api.Branding.getLogo().image;
    },
    getLogoAction:function(){
        return this._api.Branding.getLogo().action;
    },
    getMoreObj:function(){
        return this._api.Branding.getLink("more_games");
    },
    getSplash:function() {
        return this._api.Branding.getSplashScreen();
    },
    displaySplash:function(onComplete, body){
        this._api.Branding.displaySplashScreen(function(){onComplete.apply(body,[])});
    },
    getInfo:function(_callback,body){
        
        if(this._isReady) {
            _callback.apply(body, []);
        } else {
            this.addListener(_callback, body);
        }
    },
    isReady:function(){
        return this._isReady;
    },
    _pauseHandler:null,
    _resumeHandler:null,
    _body:null,
    needBreak:function(body, pauseHandler, resumeHandler) {
        this._body = body;
        this._pauseHandler = pauseHandler;
        this._resumeHandler = resumeHandler;
        this._api.GameBreak.request(pauseGame, resumeGame);
    }
};
function pauseGame() {
    SpilAPI._pauseHandler.apply(SpilAPI._body, []);
}
function resumeGame() {
    SpilAPI._resumeHandler.apply(SpilAPI._body,[]);
}
GameAPI.loadAPI(function(apiInstance) {
    // The API is ready for use.
    if(window.console && window.console.log) {
        console.log('GameAPI version ' + apiInstance.version + ' loaded!');
        SpilAPI.init(apiInstance);
    }
},SpilData);




// +++++++++++++++++++++++++++++++++++
