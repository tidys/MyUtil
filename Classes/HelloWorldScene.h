#ifndef __HELLOWORLD_SCENE_H__
#define __HELLOWORLD_SCENE_H__

#include "cocos2d.h"
USING_NS_CC;
#include "network/webSocket.h"
#define URL "ws://farm.haoxiaow.com:8808"
using namespace cocos2d::network;
class HelloWorld : public cocos2d::Layer, public  cocos2d::network::WebSocket::Delegate
{
public:
    // there's no 'id' in cpp, so we recommend returning the class instance pointer
    static cocos2d::Scene* createScene();

	HelloWorld():_ws(nullptr)
	{
		_ws = new cocos2d::network::WebSocket();
		_ws->init(*this, URL);
	}

    // Here's a difference. Method 'init' in cocos2d-x returns bool, instead of returning 'id' in cocos2d-iphone
    virtual bool init();  
    
	CREATE_FUNC(HelloWorld);

    // a selector callback
    void menuCloseCallback(cocos2d::Ref* pSender);
	void menuCloseCallback1(Ref* pSender);
    // implement the "static create()" method manually
    
	void onOpen(cocos2d::network::WebSocket* ws);
	void onMessage(WebSocket* ws, const cocos2d::network::WebSocket::Data& data);
	void onClose(cocos2d::network::WebSocket* ws);
	void onError(cocos2d::network::WebSocket* ws, const cocos2d::network::WebSocket::ErrorCode& error);
private:
	cocos2d::network::WebSocket* _ws;
};

#endif // __HELLOWORLD_SCENE_H__
