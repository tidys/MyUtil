/**
 *
 * @author 
 *
 */
interface iSpilAPI {
    getInfo(func:any,body:any);
    getLogo():Object;
    getLogoImage():any;
    getLogoAction():any;
    getMoreObj():any;
    displaySplash(func:any, body:any):void;
    getSplash():Object;
    needBreak(thisObj:any, pause:any, resume:any):void;
}
declare var SpilAPI:iSpilAPI;