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
  uname VARCHAR(128) NOT NULL DEFAULT '',    #邮箱为账号
  upwd VARCHAR(32)NOT NULL DEFAULT '',
  qs1 INT,      #qs1至qs3为3个密保问题
  qs1Answer VARCHAR(120) NOT NULL DEFAULT '',
  qs2 INT,
  qs2Answer VARCHAR(120) NOT NULL DEFAULT '',
  qs3 INT,
  qs3Answer VARCHAR(120) NOT NULL DEFAULT '',
  user_lastName VARCHAR(50) NOT NULL DEFAULT '',
  user_firstName VARCHAR(50) NOT NULL DEFAULT '',
  country VARCHAR(10) NOT NULL DEFAULT '',
  birthday CHAR(11) NOT NULL DEFAULT '',
  isGetNews INT,    # 0不获取公告    1 获取
  isGetItunes INT  # 0不获取iTunes  1 获取
);

  #创建验证码表
CREATE TABLE ap_idms (
  iid INT PRIMARY KEY AUTO_INCREMENT,
  idms_url VARCHAR(128) NOT NULL DEFAULT '',
  idms_codes CHAR(4) NOT NULL DEFAULT ''
);

  #创建购物车表
CREATE TABLE ap_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  pid INT,
  count INT,
  giftPack INT  #1有包装可选 0没有包装可选
)

INSERT INTO `ap_cart`(`cid`, `uid`, `pid`, `count`, `giftPack`) VALUES (NULL,1,1,10,1);
INSERT INTO `ap_cart`(`cid`, `uid`, `pid`, `count`, `giftPack`) VALUES (NULL,1,2,5,0);

INSERT INTO `ap_user`(`uid`, `uname`, `upwd`, `qs1`,`qs1Answer`, `qs2`,`qs2Answer`,`qs3`,`qs3Answer`,`user_lastName`,`user_firstName`,`country`,`birthday`,`isGetNews`,`isGetItunes`) VALUES (null,"1234@163.com",md5('123456'),100,"abc",101,"abc",102,"abc","李","荣浩","CHN","1995年11月11日",0,0);

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
