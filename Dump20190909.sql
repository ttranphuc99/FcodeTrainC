CREATE DATABASE  IF NOT EXISTS `fcodetrainc` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `fcodetrainc`;
-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: fcodetrainc
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.19.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fc_account`
--

DROP TABLE IF EXISTS `fc_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_account` (
  `uc_id` int(11) DEFAULT NULL,
  `ro_id` int(11) DEFAULT NULL,
  `ac_id` int(11) NOT NULL AUTO_INCREMENT,
  `ac_username` varchar(45) DEFAULT NULL,
  `ac_password` varchar(255) DEFAULT NULL,
  `ac_fullname` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `ac_description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `ac_status` int(11) DEFAULT NULL,
  `ac_date_created` timestamp(6) NULL DEFAULT NULL,
  `ac_last_modified` timestamp(6) NULL DEFAULT NULL,
  `ac_creator_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ac_id`),
  KEY `uc_id_idx` (`uc_id`),
  KEY `ro_id_idx` (`ro_id`),
  KEY `ac_creator_id_idx` (`ac_creator_id`),
  KEY `ac_creator_id` (`ac_creator_id`),
  CONSTRAINT `ac_creator_id` FOREIGN KEY (`ac_creator_id`) REFERENCES `fc_account` (`ac_id`) ON UPDATE CASCADE,
  CONSTRAINT `ro_id` FOREIGN KEY (`ro_id`) REFERENCES `fc_role` (`ro_id`) ON UPDATE CASCADE,
  CONSTRAINT `uc_id` FOREIGN KEY (`uc_id`) REFERENCES `fc_university_course` (`uc_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_account`
--

LOCK TABLES `fc_account` WRITE;
/*!40000 ALTER TABLE `fc_account` DISABLE KEYS */;
INSERT INTO `fc_account` VALUES (1,1,1,'admin','$2a$12$TMt1gZxGtEWkxUCmdSnu1e.6pc4nbN/0lzbxmQVT.QNRY7AsYl2l2','FCode','Admin of FCode',1,'2019-08-12 09:01:13.000000','2019-08-27 13:52:31.000000',1),(1,3,2,'admin2','$2a$12$TMt1gZxGtEWkxUCmdSnu1e.6pc4nbN/0lzbxmQVT.QNRY7AsYl2l2','FCode','Test',1,'2019-08-27 11:19:15.000000','2019-08-27 11:55:45.000000',1),(1,2,5,'se130139','$2a$10$S8cEfJnD.f2R0lSNaPrmUemhzQcUPpBmj.xpdoBgb0I6kXwpmzSgG',NULL,NULL,0,'2019-08-27 13:07:40.000000','2019-08-27 13:26:13.000000',1),(1,2,6,'se130191','$2a$10$UKCo.qUO5hojogo1vtrEFuVOUrgHsbcTRdg6Fi8yinYh./jw2MgHq',NULL,NULL,1,'2019-08-27 13:11:53.000000',NULL,1),(1,3,7,'binhpd','$2a$10$DkXbmLXTsFJ1BVc0t1WIWOq0pTM1YY6TxkBJt3ZOgdvzqz4sDeu/2','Phạm Đức Bình',NULL,1,'2019-08-28 12:55:57.000000',NULL,1),(1,3,8,'hungnp','$2a$10$bs8i41gRJwSQ2fRf5rAR/e63K2Ssh3V.NocODO50j7KAyev.4vj1m','Nguyễn Phú Hưng',NULL,1,'2019-08-28 12:59:57.000000',NULL,1),(19,3,9,'binhtt','$2a$10$WGY54aE2A.BJ1MwRKdSuVuRoQBufVfQnYrUIKq.T6cCzsbw9IL4KG','Trương Thanh Bình',NULL,1,'2019-08-28 13:01:14.000000',NULL,1),(19,3,10,'hoald','$2a$10$EtGxgQL0Ge9O2pRmzJHxFee4ONgrbK74K32D.getp.BaNHu0WQ8uq','Lưu Diệu Hoa',NULL,1,'2019-08-28 13:03:59.000000',NULL,1),(19,3,11,'nguyentg','$2a$10$uW.JQUhtJQgfyAwp9n3nL.U0DvXJJb2iiHf3XdTsmqTJOR/qhVg2q','Trần Gia Nguyên',NULL,1,'2019-08-28 13:23:42.000000',NULL,1),(16,3,12,'hungpt','$2a$10$XkPKhKF.I8XcgqfY1nzH3ufI876J9xglA3tgzYgDimbMA0q.XwaO2','Phan Thanh Hùng',NULL,1,'2019-08-28 14:06:10.000000',NULL,1),(1,3,13,'minhvq','$2a$10$75r1liPnQi02U6Bj0r1zJemt3Q75XxlUvvDeVBSfKbwXPMImBmIbG','Võ Quang Minh',NULL,1,'2019-09-08 07:27:15.000000',NULL,1),(1,2,14,'se130010','$2a$10$U6FZXJEBycPl0r5qc5aPgOJKa/TKWydOJacyE1AagX4cHroq24IOS','Võ Quang Minh',NULL,1,'2019-09-09 10:21:49.000000',NULL,1);
/*!40000 ALTER TABLE `fc_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_insert_account
 BEFORE INSERT ON fc_account
 FOR EACH ROW
 BEGIN
	SET new.ac_date_created := NOW();
    SET new.ac_status := 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_update_account
 BEFORE UPDATE ON fc_account
 FOR EACH ROW
	SET new.ac_last_modified := NOW() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fc_account_course`
--

DROP TABLE IF EXISTS `fc_account_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_account_course` (
  `ac_id` int(11) NOT NULL,
  `co_id` int(11) NOT NULL,
  `ac_creator` int(11) DEFAULT NULL,
  `ac_modifier` int(11) DEFAULT NULL,
  `ac_co_created_time` timestamp(6) NULL DEFAULT NULL,
  `ac_co_last_modified` timestamp(6) NULL DEFAULT NULL,
  `ac_co_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`ac_id`,`co_id`),
  KEY `fk_fc_account_course_2_idx` (`co_id`),
  KEY `fk_fc_account_course_3_idx` (`ac_creator`),
  KEY `fk_fc_account_course_4_idx` (`ac_modifier`),
  CONSTRAINT `fk_fc_account_course_1` FOREIGN KEY (`ac_id`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_account_course_2` FOREIGN KEY (`co_id`) REFERENCES `fc_course` (`co_id`),
  CONSTRAINT `fk_fc_account_course_3` FOREIGN KEY (`ac_creator`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_account_course_4` FOREIGN KEY (`ac_modifier`) REFERENCES `fc_account` (`ac_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_account_course`
--

LOCK TABLES `fc_account_course` WRITE;
/*!40000 ALTER TABLE `fc_account_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `fc_account_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fcodetrainc`.`fc_account_course_BEFORE_INSERT` BEFORE INSERT ON `fc_account_course` FOR EACH ROW
BEGIN
SET NEW.ac_co_created_time := NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fcodetrainc`.`fc_account_course_BEFORE_UPDATE` BEFORE UPDATE ON `fc_account_course` FOR EACH ROW
BEGIN
SET NEW.ac_co_last_modified := NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fc_assignment`
--

DROP TABLE IF EXISTS `fc_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_assignment` (
  `co_id` int(11) DEFAULT NULL,
  `as_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `as_title` varchar(255) DEFAULT NULL,
  `as_content` text,
  `as_mark` int(11) DEFAULT NULL,
  `as_submit_time` int(11) DEFAULT NULL,
  `as_time_start` timestamp NULL DEFAULT NULL,
  `as_deadline` timestamp NULL DEFAULT NULL,
  `as_created_time` timestamp NULL DEFAULT NULL,
  `as_last_modified` timestamp NULL DEFAULT NULL,
  `ac_creator_id` int(11) DEFAULT NULL,
  `ac_modifier_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`as_id`),
  KEY `fk_fc_assignment_1_idx` (`co_id`),
  KEY `fk_fc_assignment_2_idx` (`ac_creator_id`),
  KEY `fk_fc_assignment_3_idx` (`ac_modifier_id`),
  CONSTRAINT `fk_fc_assignment_1` FOREIGN KEY (`co_id`) REFERENCES `fc_course` (`co_id`),
  CONSTRAINT `fk_fc_assignment_2` FOREIGN KEY (`ac_creator_id`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_assignment_3` FOREIGN KEY (`ac_modifier_id`) REFERENCES `fc_account` (`ac_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_assignment`
--

LOCK TABLES `fc_assignment` WRITE;
/*!40000 ALTER TABLE `fc_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `fc_assignment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fcodetrainc`.`fc_assignment_BEFORE_INSERT` BEFORE INSERT ON `fc_assignment` FOR EACH ROW
BEGIN
SET NEW.as_created_time := NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fcodetrainc`.`fc_assignment_BEFORE_UPDATE` BEFORE UPDATE ON `fc_assignment` FOR EACH ROW
BEGIN
SET new.as_last_modified := NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fc_course`
--

DROP TABLE IF EXISTS `fc_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_course` (
  `co_id` int(11) NOT NULL AUTO_INCREMENT,
  `co_name` varchar(45) DEFAULT NULL,
  `co_description` varchar(255) DEFAULT NULL,
  `co_status` int(11) DEFAULT NULL,
  `co_created_time` timestamp(6) NULL DEFAULT NULL,
  `co_last_modified` timestamp(6) NULL DEFAULT NULL,
  `ac_creator_id` int(11) DEFAULT NULL,
  `ac_modified_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`co_id`),
  UNIQUE KEY `co_name_UNIQUE` (`co_name`),
  KEY `ac_creator_id_idx` (`ac_creator_id`),
  KEY `ac_modified_id_idx` (`ac_modified_id`),
  CONSTRAINT `creator` FOREIGN KEY (`ac_creator_id`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `modifier` FOREIGN KEY (`ac_modified_id`) REFERENCES `fc_account` (`ac_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_course`
--

LOCK TABLES `fc_course` WRITE;
/*!40000 ALTER TABLE `fc_course` DISABLE KEYS */;
/*!40000 ALTER TABLE `fc_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fcodetrainc`.`fc_course_BEFORE_INSERT` BEFORE INSERT ON `fc_course` FOR EACH ROW
BEGIN
	SET new.co_created_time := now();
    SET new.co_status := 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fcodetrainc`.`fc_course_BEFORE_UPDATE` BEFORE UPDATE ON `fc_course` FOR EACH ROW
BEGIN
	SET new.co_last_modified := NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fc_role`
--

DROP TABLE IF EXISTS `fc_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_role` (
  `ro_id` int(5) NOT NULL,
  `ro_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_role`
--

LOCK TABLES `fc_role` WRITE;
/*!40000 ALTER TABLE `fc_role` DISABLE KEYS */;
INSERT INTO `fc_role` VALUES (1,'admin'),(2,'member'),(3,'mentor');
/*!40000 ALTER TABLE `fc_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fc_university_course`
--

DROP TABLE IF EXISTS `fc_university_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_university_course` (
  `uc_id` int(11) NOT NULL AUTO_INCREMENT,
  `uc_name` varchar(10) DEFAULT NULL,
  `uc_date_created` timestamp(6) NULL DEFAULT NULL,
  `uc_last_modified` timestamp(6) NULL DEFAULT NULL,
  `ac_creator_id` int(11) DEFAULT NULL,
  `ac_modified_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`uc_id`),
  UNIQUE KEY `co_name_UNIQUE` (`uc_name`),
  KEY `ac_id_idx` (`ac_creator_id`),
  KEY `ac_id_idx1` (`ac_modified_id`),
  CONSTRAINT `ac_id` FOREIGN KEY (`ac_creator_id`) REFERENCES `fc_account` (`ac_id`) ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_university_course`
--

LOCK TABLES `fc_university_course` WRITE;
/*!40000 ALTER TABLE `fc_university_course` DISABLE KEYS */;
INSERT INTO `fc_university_course` VALUES (1,'K13','2019-08-20 12:14:31.000000','2019-08-20 12:56:00.000000',1,1),(16,'K12','2019-08-27 10:44:42.000000',NULL,1,NULL),(17,'K11','2019-08-27 11:52:50.000000',NULL,1,NULL),(19,'K14','2019-08-28 13:00:33.000000',NULL,1,NULL),(20,'K10','2019-08-28 14:21:00.000000',NULL,1,NULL);
/*!40000 ALTER TABLE `fc_university_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_insert_course
 BEFORE INSERT ON fc_university_course
 FOR EACH ROW
	SET new.uc_date_created := NOW() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_update_course
 BEFORE UPDATE ON fc_university_course
 FOR EACH ROW
	SET new.uc_last_modified := NOW() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'fcodetrainc'
--

--
-- Dumping routines for database 'fcodetrainc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-09 20:23:54
