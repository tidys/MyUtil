#include "cocos2d.h"
#include "SQLite3Helper.h"
#include "CharConvert.h"
#include "Directory.h"
USING_NS_CC;
/*
创建表： create table TABLENAME (id integer primary key， field1 text, field2 text)
插入： insert into TABLENAME values(1, 'field1', 'field2')
查询： select * from TABLENAME

导入csv：	.separator ","
			.import a.csv tableName
*/

SQLite3Helper::SQLite3Helper()
: _pDB(nullptr)
, _pErrMsg(nullptr)
{
	_rootParh = FileUtils::getInstance()->getWritablePath();
	FileUtils::getInstance()->addSearchPath(_rootParh);
}


SQLite3Helper::~SQLite3Helper()
{
	if (_pDB)
	{
		sqlite3_close(_pDB);
		_pDB = nullptr;
	}
}
//////////////////////////////////////////////////////////////////////////

int isExisted(void* para, int n_column, char** column_value, char** column_name)
{
	bool * is = (bool*)para;
	*is = **column_value == '0' ? false : true;
	return 0;

}
//////////////////////////////////////////////////////////////////////////

// 参数是相对于getWritablePath的路径
bool SQLite3Helper::openDB(std::string dbName)
{
	// 处理目录问题，可能有问题
	string path = _rootParh + dbName;
	if (Directory::isExist(const_cast<char*> (path.c_str())) ==false)
	{
		int pos = path.find_last_of('/');
		string createDir = path.substr(0, pos);
		 
		Directory::CreatDir(const_cast<char*>(createDir.c_str()));
	}

	// 打开数据库
	int result = sqlite3_open(path.c_str(), &_pDB);
	if (result != SQLITE_OK)
	{
		CCLOG("open DB filed, errCode:&d, reason: %s", result, _pErrMsg);
		return false;
	}
	else
	{
		CCLOG("create DB successed, path = %s", path.c_str());
		return true;
	}
}


bool SQLite3Helper::isExistTable(string tableName)
{
	bool isExist = false;
	if (_pDB)
	{
		string cmd = "select count(type) from sqlite_master where type ='table' and name = '" + tableName + "'";
		sqlite3_exec(_pDB, cmd.c_str(), isExisted, &isExist, &_pErrMsg);
		return isExist;
	}
	return false;
}

bool SQLite3Helper::execSQLCmd(string cmd)
{
	cmd = CharConvert::a2u(cmd);

	char** dbResult =nullptr;
	int row, column;
	_result.clear();

	if (_pDB)
	{
		int ret = sqlite3_get_table(_pDB, cmd.c_str(), &dbResult, &row, &column, &_pErrMsg);

		if (ret == SQLITE_OK)
		{
			int index = column;

			for (int i = 0; i < row; i++)
			{
				SQLRESULT eachResult;
				for (int j = 0; j < column; j++)
				{
					//CCLOG("%s", dbResult[index]);
					std::map<string, string> result;
					
					if (dbResult[index])
					{
						int header = index % column ;
						//CCLOG("%s-%s", dbResult[header], dbResult[index]);
						result[dbResult[header]] = std::string(dbResult[index]);
						eachResult.push_back(result);
						
					}
					else
					{
						int header = index % column ;
						//CCLOG("%s-%s", dbResult[header], dbResult[index]);
						result[dbResult[header]] = "";
						eachResult.push_back(result);
					}
					index++;
				}
				_result.push_back(eachResult);
			}

		}
		else
		{
			CCLOG("SQLCmd Failed, [errCode]%d, [reason]%s", ret, _pErrMsg);
			return false;
		}
	}

	if (dbResult)
	{
		sqlite3_free_table(dbResult);
	}
	if (_pDB)
	{
		sqlite3_errcode(_pDB);
	}
	return true;
}

bool SQLite3Helper::importFile(string fileName, string tableName)
{
	execSQLCmd("separator ','");

	fileName = FileUtils::getInstance()->fullPathForFilename(fileName);
	char cmd[256] = { 0 };
	sprintf(cmd, "import %s %s", fileName.c_str(), tableName.c_str());
	 return execSQLCmd(cmd);
}



string SQLite3Helper::getResult(int index, string field)
{
	field = CharConvert::a2u(field);

	int resultSize = _result.size();
	if (index < resultSize)
	{
		SQLRESULT value = _result.at(index);

		for (int i = 0; i < value.size();i++)
		{
			map<string, string> ret = value[i];
			map<string, string>::iterator it = ret.find(field);
			if ( it != ret.end())
			{
				return it->second;
			}
		}
	}
	return string("");
}

std::string SQLite3Helper::getResult(int index, int fieldIndex)
{
	int resultSize = _result.size();
	if (index < resultSize)
	{
		SQLRESULT value = _result.at(index);
		if (fieldIndex < value.size())
		{
			map<string, string> ret = value[fieldIndex];
			map<string, string>::iterator it = ret.begin();
			return it->second;
		}
	}
	return string("");
}

int SQLite3Helper::getFieldSize()
{
	if (getResultSize()>0)
	{
		return _result.at(0).size();
	}
	return 0;
}
