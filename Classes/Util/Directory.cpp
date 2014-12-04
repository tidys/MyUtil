#include "Directory.h"
#include <iostream>
#include <stdio.h>

using namespace std;

//����Ŀ¼����
#ifdef WIN32
#include <direct.h>
#include <io.h>
#else
#include <stdarg.h>
#include <sys/stat.h>
#include <unistd.h>
#endif

#ifdef WIN32
#define ACCESS _access
#define MKDIR(a) _mkdir((a))
#else
#define ACCESS access
//#define MKDIR(a) mkdir((a),0755)
#define MKDIR(a) mkdir((a),0777)
#endif

Directory::Directory()
{
}


Directory::~Directory()
{
}


int Directory::CreatDir(char *pDir)
{
	 	int i = 0;
	 	int iRet;
	 	if (NULL == pDir)
	 	{
	 		return -1;
	 	}
	 
	 	char szDir[1024];
	 	memset(szDir, 0, sizeof(szDir));
	 	if (pDir[0] == '\\' || pDir[0] == '/')
	 	{
	 		memcpy(szDir, &(pDir[1]), strlen(pDir) - 1);
	 	}
	 	else
	 	{
	 		strcpy(szDir, pDir);
	 	}
	 
	 	int iLen = strlen(szDir);
	 
	 	// �����м�Ŀ¼
	 	for (i = 0; i < iLen; i++)
	 	{
	 
	 		if (szDir[i] == '\\' || szDir[i] == '/')
	 		{
	 			szDir[i] = '\0';
	 			//���������,����
	 			iRet = ACCESS(szDir, 0);
	 			if (iRet != 0)
	 			{
	 				iRet = MKDIR(szDir);
	 				if (iRet != 0)
	 				{
	 					return -1;
	 				}
	 			}
	 			//֧��linux,������\����/
	 			szDir[i] = '/';
	 		}
	 	}
	 	iRet = MKDIR(szDir);
	return 0;
}
// �ж��ļ��Ƿ����
bool Directory::isExist(char* file)
{
	int iRet = ACCESS(file, 0);
	return iRet == 0 ? true : false;
}
