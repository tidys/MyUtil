/*
* 数据结构的设计：
	vector		vector        map
	 结果1 --->  字段1   -- 	 (字段名， 字段值)
			|->	 字段2  -- 	 (字段名， 字段值)
			|->	 字段3  -- 	 (字段名， 字段值)

   	结果2  --->  字段1   -- 	 (字段名， 字段值)
			|->	 字段2  -- 	 (字段名， 字段值)
			|->	 字段3  -- 	 (字段名， 字段值)

*/
#ifndef __SQLite3Helper__h_
#define __SQLite3Helper__h_

#include "sqlite3.h"

#include <iostream>
#include <string>
using namespace std;



typedef std::vector<std::map<string, string>> SQLRESULT;

class SQLite3Helper
{
public:
	SQLite3Helper();
	~SQLite3Helper();
public:
	bool openDB(std::string dbName);
	bool	isExistTable(string tableName);
	bool	execSQLCmd(string cmd);
	bool	importFile(string fileName, string tableName);

	string	getResult(int index, string field);				// 给出结果中的字段，返回字段值
	string  getResult(int index, int fieldIndex);			// 给出结果中的字段编号，返回字段值
	int     getFieldSize();
	int     getResultSize(){ return _result.size(); }
private: 

private:
	sqlite3* _pDB;
	char*	 _pErrMsg;
	string	 _rootParh;

	vector<SQLRESULT> _result;
};

#endif