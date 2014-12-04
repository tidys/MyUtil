#ifndef __CharConvert__
#define __CharConvert__

#include <iostream>
using namespace std;
class CharConvert
{
public:
	static string a2u(const string &srcStr);		// GBK->UTF-8
	static string u2a(const string &srcStr);		// UTF-8->GBK
};

#endif