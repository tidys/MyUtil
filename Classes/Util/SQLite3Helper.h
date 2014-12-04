/*
* ���ݽṹ����ƣ�
	vector		vector        map
	 ���1 --->  �ֶ�1   -- 	 (�ֶ����� �ֶ�ֵ)
			|->	 �ֶ�2  -- 	 (�ֶ����� �ֶ�ֵ)
			|->	 �ֶ�3  -- 	 (�ֶ����� �ֶ�ֵ)

   	���2  --->  �ֶ�1   -- 	 (�ֶ����� �ֶ�ֵ)
			|->	 �ֶ�2  -- 	 (�ֶ����� �ֶ�ֵ)
			|->	 �ֶ�3  -- 	 (�ֶ����� �ֶ�ֵ)

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

	string	getResult(int index, string field);				// ��������е��ֶΣ������ֶ�ֵ
	string  getResult(int index, int fieldIndex);			// ��������е��ֶα�ţ������ֶ�ֵ
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