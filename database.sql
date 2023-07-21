-- create database 
CREATE DATABASE IF NOT EXISTS `ImageDataBase` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ImageDataBase`;
-- create table with 3 columns id, name and image (id is primary key) (name and image are not null) (image is string base64)
CREATE TABLE IF NOT EXISTS `ImageTable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` tinytext NOT NULL,
  `image` longtext NOT NULL, -- base64 string
  `copyright` varchar(255),
  `date` date,
  `explaination` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

