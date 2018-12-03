SET NAMES UTF8;
DROP DATABASE IF EXISTS apple;
#创建数据库
CREATE DATABASE apple CHARSET = UTF8;
#使用数据库
USE apple;
#创建表
  #创建用户表
CREATE TABLE ap_user (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(128),    #邮箱为账号
  upwd VARCHAR(16),
  qs1 INT,      #qs1至qs3为3个密保问题
  qs1Answer VARCHAR(120),
  qs2 INT,
  qs2Answer VARCHAR(120),
  qs3 INT,
  qs3Answer VARCHAR(120),
  user_lastName VARCHAR(50),
  user_firstName VARCHAR(50),
  country VARCHAR(10),
  birthday CHAR(11),
  isGetNews INT,    # 0不获取公告    1 获取
  isGetItunes INT  # 0不获取iTunes  1 获取
);

  #创建验证码表
CREATE TABLE ap_idms (
  iid INT PRIMARY KEY AUTO_INCREMENT,
  idms_url VARCHAR(128),
  idms_codes CHAR(4)
);

INSERT INTO `ap_user`(`uid`, `uname`, `upwd`, `qs1`,`qs1Answer`, `qs2`,`qs2Answer`,`qs3`,`qs3Answer`,`user_lastName`,`user_firstName`,`country`,`birthday`,`isGetNews`,`isGetItunes`) VALUES (null,"1234@163.com",123456,100,"abc",101,"abc",102,"abc","李","荣浩","CHN","1995年11月11日",0,0);

INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/1.jpg","CDXV");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/2.jpg","1179");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/3.jpg","JLDB");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/4.jpg","RKBD");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/5.jpg","K3SR");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/6.jpg","474B");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/7.jpg","RKBD");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/8.jpg","CBD2");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/9.jpg","EXED");
INSERT INTO `ap_idms`(`iid`,`idms_url`,`idms_codes`) VALUES (null,"http://localhost:8080/img/idms/10.jpg","U25R");
