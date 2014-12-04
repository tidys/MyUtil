#include "HelloWorldScene.h"
#include "SQLite3Helper.h"
#include "CharConvert.h"

USING_NS_CC;



Scene* HelloWorld::createScene()
{
	// 'scene' is an autorelease object
	auto scene = Scene::create();

	// 'layer' is an autorelease object
	auto layer = HelloWorld::create();

	// add layer as a child to scene
	scene->addChild(layer);

	// return the scene
	return scene;
}

// on "init" you need to initialize your instance
bool HelloWorld::init()
{
	//////////////////////////////
	// 1. super init first
	if (!Layer::init())
	{
		return false;
	}

	SQLite3Helper* sql = new SQLite3Helper();
	sql->openDB("name/test.sa");

	if (sql->isExistTable("menu")==false)
	{
		sql->execSQLCmd("create table menu (²ËÆ× text, ¼Û¸ñ INTEGER, ÀàÐÍ text);");
		sql->execSQLCmd("insert into menu values ('Î÷µãÀà', '20', 'Ôç²Í');");
		sql->execSQLCmd("insert into menu values ('Ð¡¼¦ìÀÄ¢¹½', '15', 'Îç²Í');");
		sql->execSQLCmd("insert into menu values ('´¨±´ÕôÀæ', '18', 'Íí²Í');");
		sql->execSQLCmd("insert into menu values ('±¦±¦Ê³Æ×', '22', 'Ôç²Í');");
		sql->execSQLCmd("insert into menu values ('ó¿ËÚ×Ñ', '69', 'Îç²Í');");
		sql->execSQLCmd("insert into menu values ('ÏãËÖ±ý', '36', 'Ôç²Í');");
		sql->execSQLCmd("insert into menu values ('ðÆðÈÌÀ', '56', 'Íí²Í');");
		sql->execSQLCmd("insert into menu values ('ìÀ¼¦³á', '45', 'Ôç²Í');");
		sql->execSQLCmd("insert into menu values ('ÇåÈÈ½â¶¾ÌÀ', '66', 'Îç²Í');");
		sql->execSQLCmd("insert into menu values ('ðÆðÈÌÀ', '66', 'Ôç²Í');");
		sql->execSQLCmd("insert into menu values ('Îå²Ê¼¦Ë¿', '13', 'Îç²Í');");
		sql->execSQLCmd("insert into menu values ('ìÀÅÅ¹Ç', '75', 'Íí²Í');");
		sql->execSQLCmd("insert into menu values ('¶«±±ÃæÊ³', '21', 'Îç²Í');");
		sql->execSQLCmd("insert into menu values ('´¿ÊÖ¹¤×ÔÖÆÓãÍè', '78', 'Ôç²Í');");
	}
	
	sql->execSQLCmd("select * from menu where ÀàÐÍ='Ôç²Í';");
	//sql->execSQLCmd("select * from menu where ¼Û¸ñ='66';");
	for (int i = 0; i < sql->getResultSize();i++)
	{
		for (int j = 0; j < sql->getFieldSize();j++)
		{

			LabelTTF* test = LabelTTF::create(sql->getResult(i, j), "Arial", 30);
			test->setPosition(Vec2(100 + j*150, 100 + i * 50));
			this->addChild(test);
		}
	}
	delete sql;

	return true;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	/////////////////////////////
	// 2. add a menu item with "X" image, which is clicked to quit the program
	//    you may modify it.

	// add a "close" icon to exit the progress. it's an autorelease object
	auto closeItem = MenuItemImage::create(
		"CloseNormal.png",
		"CloseSelected.png",
		CC_CALLBACK_1(HelloWorld::menuCloseCallback, this));

	closeItem->setPosition(Vec2(origin.x + visibleSize.width - closeItem->getContentSize().width / 2,
		origin.y + closeItem->getContentSize().height / 2));

	// create menu, it's an autorelease object
	auto menu = Menu::create(closeItem, NULL);
	menu->setPosition(Vec2::ZERO);
	this->addChild(menu, 1);

	// add a "close" icon to exit the progress. it's an autorelease object
	auto closeItem1 = MenuItemImage::create(
		"CloseNormal.png",
		"CloseSelected.png",
		CC_CALLBACK_1(HelloWorld::menuCloseCallback1, this));

	closeItem1->setPosition(Vec2(500,
		origin.y + closeItem1->getContentSize().height / 2));

	// create menu, it's an autorelease object
	auto menu1 = Menu::create(closeItem1, NULL);
	menu1->setPosition(Vec2::ZERO);
	this->addChild(menu1, 1);

	/////////////////////////////
	// 3. add your codes below...

	// add a label shows "Hello World"
	// create and initialize a label

	auto label = LabelTTF::create("Hello World", "Arial", 24);

	// position the label on the center of the screen
	label->setPosition(Vec2(origin.x + visibleSize.width / 2,
		origin.y + visibleSize.height - label->getContentSize().height));

	// add the label as a child to this layer
	this->addChild(label, 1);

	// add "HelloWorld" splash screen"
	auto sprite = Sprite::create("HelloWorld.png");

	// position the sprite on the center of the screen
	sprite->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));

	// add the sprite as a child to this layer
	this->addChild(sprite, 0);

	return true;
}


void HelloWorld::menuCloseCallback1(Ref* pSender)
{

	_ws = new cocos2d::network::WebSocket();
	_ws->init(*this, URL);

}
void HelloWorld::menuCloseCallback(Ref* pSender)
{
	if (_ws)
	{
		_ws->close();
		CC_SAFE_DELETE(_ws);
	}






#if (CC_TARGET_PLATFORM == CC_PLATFORM_WP8) || (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT)
	MessageBox("You pressed the close button. Windows Store Apps do not implement a close button.","Alert");
	return;
#endif

	// Director::getInstance()->end();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	exit(0);
#endif
}

void HelloWorld::onOpen(WebSocket* ws)
{

	
	log("open");
}


void HelloWorld::onClose(WebSocket* ws)
{

	log("close");
}

void HelloWorld::onError(WebSocket* ws, const cocos2d::network::WebSocket::ErrorCode& error)
{
	log("error");
}


void HelloWorld::onMessage(WebSocket* ws, const cocos2d::network::WebSocket::Data& data)
{

}
