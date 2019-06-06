/*
Navicat MySQL Data Transfer

Source Server         : mysql01
Source Server Version : 50562
Source Host           : 127.0.0.1:3306
Source Database       : angdemo

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2019-06-06 16:29:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `title` varchar(200) DEFAULT NULL,
  `id` int(255) NOT NULL,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT '' COMMENT '新闻内容',
  `create_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------

-- ----------------------------
-- Table structure for `userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `age` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('6', '2019-04-30 02:41:45', '2019-04-30 02:41:45', '11', '111@qq', '3eb52c5f6af1f84a2d1a1339cf78e3b7', null, null, null);
INSERT INTO `userinfo` VALUES ('7', '2019-06-04 11:53:55', '2019-06-05 14:58:07', '112', '1112', 'ae2d874fe06430805b3fa7e61ae7f46d', '2233', '112122', '55');
