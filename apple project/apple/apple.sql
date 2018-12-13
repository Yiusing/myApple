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

 #创建商品详情表
CREATE TABLE ap_products(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  price DECIMAL COMMENT '商品价格',
  title VARCHAR(50) NOT NULL DEFAULT '' COMMENT '详情页标题',
  pic VARCHAR(128) NOT NULL DEFAULT '' COMMENT '商品图片',
  details VARCHAR(255) NOT NULL DEFAULT '' COMMENT '商品详情'
  );
#创建cpu表
CREATE TABLE ap_product_cpu(
  cpu_id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  add_price DECIMAL COMMENT 'CPU额外价格',
  title VARCHAR(120) NOT NULL DEFAULT '' COMMENT 'CPU名称'
);
#创建内存表
CREATE TABLE ap_product_memory(
  memory_id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  add_price DECIMAL COMMENT '内存额外价格',
  title VARCHAR(50) NOT NULL DEFAULT '' COMMENT '内存名称'
);
#创建硬盘表
CREATE TABLE ap_product_harddrive(
  harddrive_id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  add_price DECIMAL COMMENT '硬盘额外价格',
  title VARCHAR(120) NOT NULL DEFAULT '' COMMENT '硬盘名称'
);
#创建软件表
CREATE TABLE ap_product_soft(
  soft_id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  add_price DECIMAL COMMENT '软件额外价格',
  title VARCHAR(50) NOT NULL DEFAULT '' COMMENT '软件名称'
);
#创建包装表
CREATE TABLE ap_product_pack(
  pack_id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  title VARCHAR(50) NOT NULL DEFAULT '' COMMENT '包装名称',
  bg_pic VARCHAR(128) NOT NULL DEFAULT '' COMMENT '包装图片大',
  sm_pic VARCHAR(128) NOT NULL DEFAULT '' COMMENT '包装图片小'
);

#创建键盘语言表
CREATE TABLE ap_product_lang(
  lang_id INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,
  title VARCHAR(50) NOT NULL DEFAULT '' COMMENT '语言名称',
  val VARCHAR(5) NOT NULL DEFAULT '' COMMENT '对应value值'
);

#商品详情数据
INSERT INTO `ap_products`(`pid`, `price`, `title`,`pic`, `details`) VALUES (NULL,10200,'定制你的 13 英寸 MacBook Pro - 深空灰色','img/products/macbookpro/mbp13-space-select-201807_GEO_CN.jpg','2.3GHz 双核第七代 Intel Core i5 处理器，Turbo Boost 最高可达 3.6GHz/Intel Iris Plus Graphics 640 图形处理器/8GB 2133MHz LPDDR3 内存/128GB 固态硬盘/两个雷雳 3 端口')

#CPU数据
INSERT INTO `ap_product_cpu`(`cpu_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,0,'2.3GHz 双核第七代 Intel Core i5 处理器，Turbo Boost 最高可达 3.6GHz');
INSERT INTO `ap_product_cpu`(`cpu_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,2259,'
2.5GHz 双核第七代 Intel Core i7 处理器，Turbo Boost 最高可达 4.0GHz');

#硬盘数据
INSERT INTO `ap_product_harddrive`(`harddrive_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,0,'128GB 固态硬盘');
INSERT INTO `ap_product_harddrive`(`harddrive_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,1586,'256GB 固态硬盘');
INSERT INTO `ap_product_harddrive`(`harddrive_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,3172,'512GB 固态硬盘');
INSERT INTO `ap_product_harddrive`(`harddrive_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,6104,'1TB 固态硬盘');

#内存数据
INSERT INTO `ap_product_memory`(`memory_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,0,'8GB 2133MHz LPDDR3 内存');
INSERT INTO `ap_product_memory`(`memory_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,1506,'16GB 2133MHz LPDDR3 内存');

#软件数据
INSERT INTO `ap_product_soft`(`soft_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,1980,'Final Cut Pro X');
INSERT INTO `ap_product_soft`(`soft_id`, `pid`, `add_price`, `title`) VALUES (NULL,1,1286,'Logic Pro X');

#包装数据
INSERT INTO `ap_product_pack`(`pack_id`, `pid`, `title`, `bg_pic`, `sm_pic`) VALUES (NULL,1,'13 英寸 MacBook Pro','img/products/macbookpro/mbp13-witb-gray-201610.jpg','img/products/macbookpro/mbp13-witb-gray-201610_FMT_WHH.jpg');
INSERT INTO `ap_product_pack`(`pack_id`, `pid`, `title`, `bg_pic`, `sm_pic`) VALUES (NULL,1,'USB-C 充电线(2 米)','img/products/macbookpro/mbp-witb-cable-201610.jpg','img/products/macbookpro/mbp-witb-cable-201610.jpg');
INSERT INTO `ap_product_pack`(`pack_id`, `pid`, `title`,  `bg_pic`, `sm_pic`) VALUES (NULL,1,'61W USB-C 电源适配器','img/products/macbookpro/mbp-13-witb-adapter-201808_GEO_CN.jpg','img/products/macbookpro/mbp-13-witb-adapter-201808_GEO_CN_FMT_WHH.jpg');

#键盘语言数据
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 中文 - 拼音','CH');
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 美式英语','CE');
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 繁体中文 - 仓颉与注音','CW');
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 日语','CJ');
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 韩语','CK');
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 德语','CD');
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 法语','CF');
INSERT INTO `ap_product_lang`(`lang_id`, `pid`, `title`, `val`) VALUES (NULL,1,'背光键盘 - 英式英语','CB');


#购物车数据
INSERT INTO `ap_cart`(`cid`, `uid`, `pid`, `count`, `giftPack`) VALUES (NULL,1,1,10,1);
INSERT INTO `ap_cart`(`cid`, `uid`, `pid`, `count`, `giftPack`) VALUES (NULL,1,2,5,0);

#用户数据
INSERT INTO `ap_user`(`uid`, `uname`, `upwd`, `qs1`,`qs1Answer`, `qs2`,`qs2Answer`,`qs3`,`qs3Answer`,`user_lastName`,`user_firstName`,`country`,`birthday`,`isGetNews`,`isGetItunes`) VALUES (null,"1234@163.com",md5('123456'),100,"abc",101,"abc",102,"abc","李","荣浩","CHN","1995年11月11日",0,0);

#验证码
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
