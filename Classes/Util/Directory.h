#ifndef __Directory__
#define __Directory__


class Directory
{
public:
	Directory();
	~Directory();

public:
	static int	CreatDir(char *pDir);
	static bool isExist(char* file);
};




#endif