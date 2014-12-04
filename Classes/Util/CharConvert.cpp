#include "CharConvert.h"
#include "cocos2d.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include "..\cocos2d\iconv\include\iconv.h"
//#include "include/iconv.h"
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "../cocos2d/iconv/include/iconv.h"
#endif


#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
#include "..\cocos2d\external\win32-specific\icon\include\iconv.h"
#pragma comment(lib,"libiconv.lib")
#endif


#include <string>
using namespace std;

string StringCovert(const string &srcStr, const char* formCode, const char* toCode)  
{  
	std::string strRet;
	iconv_t iconvH;  
	iconvH = iconv_open(toCode, formCode);  
	if(iconvH == 0)  
	{  
		return strRet;  
	}  

	const char* strChar = srcStr.c_str();  
#ifdef  WIN32
	const char** pin = &strChar;
#else
	char** pin =(char**)&strChar;
#endif
	size_t strLength = srcStr.length();  
	char* outbuf = new char[strLength*4];  
	char* pBuff = outbuf;  
	memset(outbuf,0,strLength*4);  
	size_t outLength = strLength*4; 
	if( -1 == iconv(iconvH,pin,&strLength,&outbuf,&outLength) )  
	{  
		iconv_close(iconvH);  
		delete [] pBuff;
		pBuff = NULL;
		return strRet;  
	}  

	
	strRet = pBuff;  
	iconv_close(iconvH);  

	delete [] pBuff;
	pBuff = NULL;
	return strRet;  
}  


string CharConvert::a2u(const string &srcStr)
{
	return StringCovert(srcStr ,"gbk", "utf-8");
}

string CharConvert::u2a(const string &srcStr)
{
	return StringCovert(srcStr,  "utf-8", "gbk");
}
