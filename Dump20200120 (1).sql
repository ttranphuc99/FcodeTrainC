CREATE DATABASE  IF NOT EXISTS `fcodetrainc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fcodetrainc`;
-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: 52.230.51.181    Database: fcodetrainc
-- ------------------------------------------------------
-- Server version	8.0.18

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
  `ac_fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ac_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_account`
--

LOCK TABLES `fc_account` WRITE;
/*!40000 ALTER TABLE `fc_account` DISABLE KEYS */;
INSERT INTO `fc_account` VALUES (1,1,1,'admin','$2a$10$Q9q3CZQ1gRttlJQluw0eneXqezy5SY6YQ.7Wu0rpoytbR77S/rMAK','FCode','Admin of FCode',1,'2019-08-12 16:01:13.000000','2019-12-24 03:45:22.000000',1),(1,1,2,'admin2','$2a$10$3TJJsoJveh3M2WNw3OBEQuFJRt7jSwvrSd7c8dJdfxbLHFazEfKqG','FCode','ADMIN2',1,'2019-08-27 18:19:15.000000','2019-12-24 08:55:59.000000',1),(1,2,5,'se130139','$2a$10$S8cEfJnD.f2R0lSNaPrmUemhzQcUPpBmj.xpdoBgb0I6kXwpmzSgG','Trần Thiên Phúc','Phúc',1,'2019-08-27 20:07:40.000000','2020-01-17 08:59:57.000000',1),(1,2,6,'se130191','$2a$10$UKCo.qUO5hojogo1vtrEFuVOUrgHsbcTRdg6Fi8yinYh./jw2MgHq','Nguyễn Đức Huy','huy',0,'2019-08-27 20:11:53.000000','2020-01-17 08:56:28.000000',1),(1,3,7,'binhpd','$2a$10$iHWN8SIAYLXcrEm/4DiDkO/qYX3s6.L/ew5MCm46U1Hpajmvzq6L2','Phạm Đức Bình',NULL,1,'2019-08-28 19:55:57.000000','2019-10-23 09:25:25.000000',1),(1,3,8,'hungnp','$2a$10$bs8i41gRJwSQ2fRf5rAR/e63K2Ssh3V.NocODO50j7KAyev.4vj1m','Nguyễn Phú Hưng',NULL,1,'2019-08-28 19:59:57.000000',NULL,1),(19,3,9,'binhtt','$2a$10$WGY54aE2A.BJ1MwRKdSuVuRoQBufVfQnYrUIKq.T6cCzsbw9IL4KG','Trương Thanh Bình',NULL,1,'2019-08-28 20:01:14.000000',NULL,1),(19,3,10,'hoald','$2a$10$EtGxgQL0Ge9O2pRmzJHxFee4ONgrbK74K32D.getp.BaNHu0WQ8uq','Lưu Diệu Hoa',NULL,1,'2019-08-28 20:03:59.000000',NULL,1),(19,3,11,'nguyentg','$2a$10$40ewQBTSL8DSgsEepIkCgur24tDBPYQB/tgIemafSnHA4ZiZwL7Qe','Trần Gia Nguyên',NULL,1,'2019-08-28 20:23:42.000000','2019-12-20 04:56:43.000000',1),(16,3,12,'hungpt','$2a$10$XkPKhKF.I8XcgqfY1nzH3ufI876J9xglA3tgzYgDimbMA0q.XwaO2','Phan Thanh Hùng',NULL,1,'2019-08-28 21:06:10.000000',NULL,1),(1,3,13,'minhvq','$2a$10$75r1liPnQi02U6Bj0r1zJemt3Q75XxlUvvDeVBSfKbwXPMImBmIbG','Võ Quang Minh','sdskld\'asnl',0,'2019-09-08 14:27:15.000000','2020-01-17 08:56:54.000000',1),(1,2,14,'se130010','$2a$10$U6FZXJEBycPl0r5qc5aPgOJKa/TKWydOJacyE1AagX4cHroq24IOS','Võ Quang Minh',NULL,1,'2019-09-09 17:21:49.000000',NULL,1),(19,3,16,'hienht','$2a$10$ddtrbAD3Y2XfJUmNpBwakeB9d9YYJ2JkHwk/zs3ATpUujmAYw7V/u','Huynh The Hien',NULL,1,'2019-12-14 07:22:29.000000','2019-12-22 13:26:38.000000',1),(1,3,17,'phuctt','$2a$10$QW/FMPaN/YhT/tUTQ6S/lO452w3G.4V9Glc7Tj/A7YOZ0WXPYKMYi','Trần Thiên Phúc',NULL,1,'2019-12-14 07:25:24.000000',NULL,1),(19,2,18,'nguyentg1','$2a$10$E2jfRwahI/LI3X8SBA0dYenaKZgxKvaO.RdyLIT5QEtFYDJO6GHwK','Tran Gia Nguyen',NULL,1,'2019-12-20 05:02:52.000000',NULL,2),(19,3,19,'hieunm','$2a$10$kAOb81HHO6qnuOIx3eEVVOycCrM.E.YYPW.YnKNqrIQmZ8DiHQPsq','Mau Hieu','Mentor',1,'2019-12-22 13:24:53.000000','2019-12-24 03:31:37.000000',2),(19,3,20,'namnk','$2a$10$PfTxQl1LFEnSjYzTHQYZGeQTfWGSbehsQwV29Fiz5yhL8zAI5/Fti','Nam Ke','null',1,'2019-12-22 13:33:35.000000','2020-01-09 05:49:35.000000',2),(19,3,21,'laptt','$2a$10$DEvpIK61pOjhRL.lMsNMdOWmixnROZoqu.Z7u1K053jGa5jzdInda','tiêu trung lập',NULL,1,'2019-12-22 13:34:10.000000',NULL,2),(19,3,22,'longtpm','$2a$10$pUBh7k9qoncSqOqx1JUHl.MJxS0yiTp3sQ1UcD28KA8yDb97DNUDe','triệu phước minh long',NULL,1,'2019-12-22 13:35:10.000000',NULL,2),(19,3,23,'phuongpt','$2a$10$K2d8qop/x3YhvBeqvi5jFemtNPvEc3ymlYAmziOXTRPssjG7n1zgW','Phạm Thanh Phương',NULL,1,'2019-12-22 13:36:00.000000','2019-12-23 08:44:17.000000',2),(19,2,24,'binhtt1','$2a$10$X7oWZnNVPJmgQayt0I.Cv.yEMprZ7HxqKZEcyeRDLTKIvtwhhQ5c.','TRƯƠNG THANH BÌNH',NULL,0,'2019-12-22 13:41:28.000000','2019-12-23 09:06:59.000000',2),(20,2,25,'abc','$2a$10$AXcwnm5O.Q2BYodtZrto9u85xG9c3J.YUyFkeSRzHlu3rCW/yJKTS','abc',NULL,0,'2019-12-22 14:00:49.000000','2019-12-23 09:05:54.000000',2),(19,2,26,'hienht1','$2a$10$4QOq1zmVCjKoqHXl.ZsP..vTdVm.8LkEmBDmPJxM7K/50QvTxyRm6','hiển',NULL,1,'2019-12-22 14:19:27.000000','2020-01-04 10:44:40.000000',2),(20,2,27,'SE150063','$2a$10$RWkfshdK08u2u3pClFUm7OuCvBxXErcyJ6GSOwtHEEaoFXrVZbq.O','Nguyễn Tâm Đắc',NULL,1,'2019-12-23 08:46:43.000000','2019-12-24 11:13:06.000000',2),(20,2,28,'SE150182','$2a$10$ey3LA6ep8Utt15YXVeBTdOdPE4dbY3KlSc11P99RL2BPLG9SZrJCi','Nguyễn Minh Trung',NULL,1,'2019-12-23 08:46:56.000000',NULL,2),(20,2,29,'SE150050','$2a$10$X8tAvKaSnyrXNNsM6t/W5Oht8A3dacaAr8/bOXed7ZOQDDh2RKi56','Hoàng Phước Thành',NULL,1,'2019-12-23 08:47:17.000000','2019-12-24 11:13:06.000000',2),(20,2,30,'SE150246','$2a$10$1/B2ef1WO3exVGg5X1Jwf.23fDBTU0FooC7q4pgXctGNlfHLMWvLK','Thái Võ Trung Nghĩa',NULL,1,'2019-12-23 08:47:32.000000',NULL,2),(20,2,31,'SE150525','$2a$10$SmCp/XUGLKBXdCGnaEHid.PbklqsTF0zEMu0Od8TnzIHkbmxFgDTK','Tôn Trong Nghia',NULL,1,'2019-12-23 08:48:38.000000',NULL,2),(20,2,32,'SE150807','$2a$10$0LioPnFVQkxwmC7EZ3iizeoHQTCScbYnqextE1wPYObYUKDy/l5PO','Nguyễn Nhật Huy',NULL,1,'2019-12-23 08:48:51.000000','2019-12-24 11:11:08.000000',2),(20,2,33,'SE150294','$2a$10$jOVzNz2aeOYoU7LA4l3NCeiGVQFE1sz6HNfkoQPC0o2P70Qg4ukYm','Lương Nguyễn Hải Huy',NULL,1,'2019-12-23 08:49:02.000000',NULL,2),(20,2,34,'SE151180','$2a$10$LHCHsn9f1OC2SQITUzeBe.nptAuGpyGt3oib7tuJwlCt9F.5bRxim','Nguyễn Hữu Vinh',NULL,1,'2019-12-23 08:49:13.000000','2019-12-24 11:12:24.000000',2),(20,2,35,'SE150719','$2a$10$QQISdh34d32jddCZ8qUgAu3DOEyej3O5H3D8O9OwESTjXPEMSsJrS','Nguyễn Vũ Dũng',NULL,1,'2019-12-23 08:49:41.000000',NULL,2),(20,2,36,'SE150713','$2a$10$BNeDaRrQ7iKklHQzUy5/a.dnXzWSHDjKNXUcEqQVZaObFwLciwmwm','Đào Hữu Đức',NULL,1,'2019-12-23 08:49:54.000000','2019-12-31 16:34:53.000000',2),(20,2,37,'SE150683','$2a$10$oI.Q5W/3kq0HPCK9jezeLu8MDPgA.kuaiPnjgzz0kt0v3Br8pJ9MO','Lê Xuân Đại',NULL,1,'2019-12-23 08:50:07.000000','2019-12-24 11:12:53.000000',2),(20,2,38,'SE150692','$2a$10$G6m/4/cWTCjkOs0BZWMgkeKwX6GwT/Ppcjv9lhgUTFIFD2n/F1kcW','Nguyễn Trọng Quốc Đạt',NULL,1,'2019-12-23 08:50:26.000000',NULL,2),(20,2,39,'SE150115','$2a$10$ER1yYxq7r0ojEe9n9SkOB.kLZRNtergRtMOTDdcLqj5LDO0sS722W','Trương Bỉnh Tân',NULL,1,'2019-12-23 08:50:35.000000','2019-12-24 11:11:49.000000',2),(20,2,40,'SE150819','$2a$10$vOtCx.gDjTdVjmPoY/ZsbObK7I6q6wWeP1S6QTVNktn8sJ21/Ipd6','Bùi Ngọc Huy',NULL,1,'2019-12-23 08:50:46.000000',NULL,2),(20,2,41,'SE150204','$2a$10$FHoYzlm9qTs9BPWMw5S9YemHTM5GecKJf4ZnF8hLmSUqivr.qwjta','Trần Bảo Long',NULL,1,'2019-12-23 08:50:59.000000',NULL,2),(20,2,42,'SE151336','$2a$10$7qFaqMurigtXPoKIc5opkuRVv1HIqvDSw521kSFX0LZQ4J/v0SIom','Nguyễn Vũ Lâm',NULL,1,'2019-12-23 08:51:09.000000','2019-12-24 11:12:36.000000',2),(20,2,43,'SE150239','$2a$10$hoF0QmD33kv7UQ4L/wb5auBU4DaHxG.uxVa09EoaKmHAi2XaBZ0LO','Phan Thành Phúc',NULL,1,'2019-12-23 08:51:20.000000',NULL,2),(20,2,44,'SE151340','$2a$10$XKiix84naHJw7zvUKGV9T.5fAeNGuiZwPfS7xBY0tQ7FGIRzgS60W','Trần Trung Kiên',NULL,1,'2019-12-23 08:51:30.000000','2019-12-24 11:12:42.000000',2),(20,2,45,'SE150079','$2a$10$OGV6eK0fkzlldmZj9YN8AeNZFcILd86W35todHycFKIhb9AHxtVoG','Nguyễn Trần Thiên Đức',NULL,1,'2019-12-23 08:51:41.000000','2019-12-24 11:12:41.000000',2),(20,2,46,'Se151023','$2a$10$zjAo5wrqIqVhjkoTKiB2TOs01Pjbnu95aoj1EDDRZIcQ59aY3OeZ2','Nguyễn cao hoài sinh',NULL,1,'2019-12-23 08:55:42.000000',NULL,2),(20,2,47,'SE150907','$2a$10$HVK/QqRFwAnr0DVf4eMJ9eKkR1OEN9o7A7bDz6gYcXLTZtMM02/bO','Tôn Thất Phu Nhật Minh',NULL,1,'2019-12-23 08:56:51.000000','2019-12-24 11:12:40.000000',2),(20,2,48,'SE150854','$2a$10$pUcwQbYW/TvkA31.QgYzTO3QzWUOebDsuo84zE5pZ303TC6tMpXFy','Lê Hoàng Khôi',NULL,1,'2019-12-23 08:57:02.000000',NULL,2),(20,2,49,'SE150666','$2a$10$OG.tiR.z.fPDE/vG/mb.NOxyk6k2trCXnjIJTkBCgghzR7R5fZTP6','Hồ Linh Chi',NULL,1,'2019-12-23 08:57:14.000000',NULL,2),(20,2,50,'se150218','$2a$10$uXo5NTUEK29/jrkwyjKDd.hyEcsMJ23gqyIWJuynLC.GD97Xx0U.e','Hoàng Phi Hải','PayLak member',1,'2019-12-23 08:57:27.000000','2019-12-24 11:12:25.000000',2),(20,2,51,'SE150125','$2a$10$J2cs.Cq0eE9cgWrtAd84xewJGOkYnfxThYsfbtQtNPgIsG1uNbWQu','Nguyễn Quang Hùng',NULL,1,'2019-12-23 08:58:04.000000',NULL,2),(20,2,52,'SE150905','$2a$10$qa7N3j7pFQsuP1ndjJr9ReM68QtqePylC0NsdR24BMfu.icJbhwKS','Trần Bảo Minh',NULL,1,'2019-12-23 08:58:14.000000',NULL,2),(20,2,53,'SE151087','$2a$10$xVt3.08VewoVgRdIf3wUaOCUrbGCkSwkesKuKaZAOYZh2/LA38bqa','Đặng Nguyễn Phú Thịnh',NULL,1,'2019-12-23 08:58:26.000000','2019-12-24 08:55:19.000000',2),(20,2,54,'SE151396','$2a$10$JpCvx7/XdQRFsDrHQ8jwgOEV.uCxbgBzZMSzwhkncXJYJQqZmpezq','Đặng Phương Anh',NULL,1,'2019-12-23 08:58:36.000000','2019-12-24 08:50:44.000000',2),(20,2,55,'SE151082','$2a$10$nZDUo94gaTY9vo.Mjre6le9TF9N/v7cZ2CStEJv4q4DE52r4k7BWa','Le Tien Thinh','Friendly, not very smart but always eager to learn new things or help people when have the chance.',1,'2019-12-23 09:02:54.000000','2019-12-24 14:50:57.000000',2),(20,2,56,'SE140832','$2a$10$JdggulOU2uyHs0gi7xi2tOAlvjcJHvcb.8lICEJUu2OBgSKzkeVtC','Nguyen Mau Hieu','TestAcc',1,'2019-12-24 08:59:17.000000','2020-01-02 13:22:22.000000',2);
/*!40000 ALTER TABLE `fc_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_account` BEFORE INSERT ON `fc_account` FOR EACH ROW BEGIN
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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_update_account` BEFORE UPDATE ON `fc_account` FOR EACH ROW SET new.ac_last_modified := NOW() */;;
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
  `ac_creator_id` int(11) DEFAULT NULL,
  `ac_modifier_id` int(11) DEFAULT NULL,
  `ac_co_created_time` timestamp(6) NULL DEFAULT NULL,
  `ac_co_last_modified` timestamp(6) NULL DEFAULT NULL,
  `ac_co_status` int(11) DEFAULT NULL,
  `ac_co_total_mark` int(11) DEFAULT '0',
  PRIMARY KEY (`ac_id`,`co_id`),
  KEY `fk_fc_account_course_2_idx` (`co_id`),
  KEY `fk_fc_account_course_3_idx` (`ac_creator_id`),
  KEY `fk_fc_account_course_4_idx` (`ac_modifier_id`),
  CONSTRAINT `fk_fc_account_course_1` FOREIGN KEY (`ac_id`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_account_course_2` FOREIGN KEY (`co_id`) REFERENCES `fc_course` (`co_id`),
  CONSTRAINT `fk_fc_account_course_3` FOREIGN KEY (`ac_creator_id`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_account_course_4` FOREIGN KEY (`ac_modifier_id`) REFERENCES `fc_account` (`ac_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_account_course`
--

LOCK TABLES `fc_account_course` WRITE;
/*!40000 ALTER TABLE `fc_account_course` DISABLE KEYS */;
INSERT INTO `fc_account_course` VALUES (5,7,1,NULL,'2020-01-17 09:05:45.000000',NULL,1,0),(24,7,2,2,'2019-12-22 14:08:46.000000','2019-12-23 09:06:59.000000',0,5),(26,7,2,2,'2019-12-22 14:19:49.000000','2019-12-23 09:05:50.000000',0,0),(27,7,2,2,NULL,'2020-01-12 17:12:18.000000',1,85),(28,7,2,NULL,'2019-12-23 15:19:50.000000','2020-01-17 06:57:13.000000',1,105),(29,7,2,2,NULL,'2019-12-24 08:54:48.000000',1,0),(30,7,2,NULL,'2019-12-23 15:19:26.000000','2020-01-11 08:33:40.000000',1,45),(31,7,2,NULL,'2019-12-23 15:19:18.000000','2020-01-17 06:58:57.000000',1,125),(32,7,2,NULL,'2019-12-23 15:19:09.000000','2020-01-17 05:57:47.000000',1,80),(33,7,2,NULL,'2019-12-23 15:18:56.000000','2020-01-15 09:39:33.000000',1,65),(34,7,2,NULL,'2019-12-23 15:18:44.000000',NULL,1,0),(35,7,2,NULL,'2019-12-23 15:18:39.000000','2020-01-19 12:50:46.000000',1,40),(36,7,2,NULL,'2019-12-23 15:18:19.000000','2020-01-15 09:43:11.000000',1,85),(37,7,2,NULL,'2019-12-23 15:18:03.000000','2020-01-15 09:47:11.000000',1,85),(38,7,2,NULL,'2019-12-23 15:17:54.000000',NULL,1,0),(39,7,2,2,NULL,'2020-01-20 07:36:19.000000',1,115),(40,7,2,NULL,'2019-12-23 15:17:22.000000','2020-01-03 07:56:38.000000',1,25),(41,7,2,NULL,'2019-12-23 15:17:01.000000','2020-01-17 05:40:27.000000',1,105),(42,7,2,NULL,'2019-12-23 15:16:00.000000','2020-01-07 09:54:44.000000',1,25),(43,7,2,NULL,'2019-12-23 15:14:47.000000','2020-01-15 09:48:48.000000',1,60),(44,7,2,NULL,'2019-12-23 15:14:32.000000','2020-01-17 05:10:18.000000',1,185),(45,7,2,NULL,'2019-12-23 15:13:29.000000','2020-01-20 07:00:12.000000',1,70),(46,7,2,NULL,'2019-12-23 15:11:00.000000','2020-01-09 14:38:50.000000',1,25),(47,7,2,NULL,'2019-12-23 15:10:43.000000',NULL,1,0),(48,7,2,NULL,'2019-12-23 15:10:30.000000','2020-01-20 08:18:48.000000',1,135),(49,7,2,NULL,'2019-12-23 15:10:10.000000','2020-01-17 07:04:32.000000',1,60),(50,7,2,NULL,'2019-12-23 15:09:00.000000','2020-01-17 06:00:30.000000',1,80),(51,7,2,NULL,'2019-12-23 15:07:50.000000','2020-01-02 03:35:21.000000',1,25),(52,7,2,NULL,'2019-12-23 15:07:08.000000','2020-01-11 08:40:30.000000',1,75),(53,7,2,2,NULL,'2020-01-10 18:37:20.000000',1,25),(54,7,2,1,NULL,'2020-01-12 17:45:06.000000',1,45),(55,7,2,2,NULL,'2020-01-20 13:11:28.000000',1,150),(56,7,2,NULL,'2019-12-24 08:59:43.000000','2019-12-24 09:07:00.000000',1,15);
/*!40000 ALTER TABLE `fc_account_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_account_course_BEFORE_INSERT` BEFORE INSERT ON `fc_account_course` FOR EACH ROW BEGIN
SET NEW.ac_co_created_time := NOW();
SET NEW.ac_co_status := 1;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_account_course_BEFORE_UPDATE` BEFORE UPDATE ON `fc_account_course` FOR EACH ROW BEGIN
SET NEW.ac_co_last_modified := NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fc_announcement`
--

DROP TABLE IF EXISTS `fc_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_announcement` (
  `co_id` int(11) NOT NULL,
  `ac_last_modifier_id` int(11) DEFAULT NULL,
  `ac_creator_id` int(11) NOT NULL,
  `an_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `an_title` varchar(255) NOT NULL,
  `an_content` text,
  `an_created_time` timestamp NULL DEFAULT NULL,
  `an_last_modified` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`an_id`),
  KEY `fk_fc_announcement_1_idx` (`ac_last_modifier_id`),
  KEY `fk_fc_announcement_2_idx` (`ac_creator_id`),
  KEY `fk_fc_announcement_3_idx` (`co_id`),
  CONSTRAINT `fk_fc_announcement_1` FOREIGN KEY (`ac_last_modifier_id`) REFERENCES `fc_account` (`ac_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_fc_announcement_2` FOREIGN KEY (`ac_creator_id`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_announcement_3` FOREIGN KEY (`co_id`) REFERENCES `fc_course` (`co_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_announcement`
--

LOCK TABLES `fc_announcement` WRITE;
/*!40000 ALTER TABLE `fc_announcement` DISABLE KEYS */;
INSERT INTO `fc_announcement` VALUES (7,2,2,13,'THÔNG BÁO PHÒNG TRAIN C LỚP 2-5','<p><strong>Lớp 2-5 phòng 013.</strong></p><p>&nbsp;</p>','2020-01-06 06:32:13','2020-01-13 09:00:32'),(7,NULL,2,14,'[BÀI TẬP]','<p>Lớp 2-7 nộp bài tập theo cú pháp sau:</p><p>Chủ đề: Pseudo code.</p><p>Tên File: Pseudo_<i>code</i>_SE15****.docx.</p><p>deadline: 12h 8/1/2020.</p><p>Email: nguyentgse140823@fpt.edu.vn&nbsp;</p>','2020-01-06 17:11:31',NULL),(7,2,19,15,'THÔNG BÁO PHÒNG TRAIN C LỚP 3-4-5','<p>Phòng: 011</p>','2020-01-07 06:47:14','2020-01-13 09:00:50'),(7,NULL,2,16,'[BÀI TẬP] 2 5','<ul><li>Nhập vào n số và xét các số đó để tính tổng các số lẻ, đếm các số chẵn và in ra số đó có phải số chính phương không. (sử dụng thư viện math.h).</li></ul><p>Tile: Assignment</p><p>Email: nguyentgse140823@fpt.edu.vn</p>','2020-01-14 09:21:58',NULL),(5,NULL,19,17,'THÔNG BÁO THỨ 5 CẢ 2 LỚP HỌC BÌNH THƯỜNG!','','2020-01-16 06:24:03',NULL);
/*!40000 ALTER TABLE `fc_announcement` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_announcement_BEFORE_INSERT` BEFORE INSERT ON `fc_announcement` FOR EACH ROW BEGIN
SET NEW.an_created_time := NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_announcement_BEFORE_UPDATE` BEFORE UPDATE ON `fc_announcement` FOR EACH ROW BEGIN
SET NEW.an_last_modified := NOW();
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
  `as_id` varchar(255) NOT NULL,
  `as_title` varchar(255) DEFAULT NULL,
  `as_content` text,
  `as_mark` int(11) DEFAULT NULL,
  `as_submit_quantity` int(11) DEFAULT NULL,
  `as_status` int(11) DEFAULT '1',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_assignment`
--

LOCK TABLES `fc_assignment` WRITE;
/*!40000 ALTER TABLE `fc_assignment` DISABLE KEYS */;
INSERT INTO `fc_assignment` VALUES (7,'CO-7_AS-1','welcome K15','<p>print out hello mấy em^^</p>',5,3,0,'2019-12-22 13:44:24','2019-12-28 09:10:52',23,23),(7,'CO-7_AS-11','Grade','<p>FPT University needs to calculate the percentage of five subjects Physics, Chemistry, Biology, Mathematics and Computer Science. Physics and Mathematic worth double the point, Computer Science worth triple the point. Calculate percentage and give the student the grade according to given conditions.<br>Percentage &gt;= 90% : Grade A<br>Percentage &gt;= 80% : Grade B<br>Percentage &gt;= 70% : Grade C<br>Percentage &gt;= 60% : Grade D<br>Percentage &gt;= 40% : Grade E<br>Percentage &lt; 40% : Grade F</p><p>Input: Input five floats (0 &lt; input &lt;= 100)</p><p>Output: Print percentage after calculate, grade (A, B, C, D, E or F not percentage) and “Wrong input !” when input is not satisfied.</p><p><br>&nbsp;</p><figure class=\"table\"><table><tbody><tr><td>Input</td><td>Output</td></tr><tr><td><p>Input marks of five subjects</p><p>Physics: 75</p><p>Chemistry: 97</p><p>&nbsp;Biology: 78</p><p>&nbsp;Mathematics: 80</p><p>Computer:75</p></td><td>Grade B</td></tr></tbody></table></figure><p>&nbsp;</p>',15,3,1,'2020-01-13 13:50:29','2020-01-17 08:20:16',22,23),(7,'CO-7_AS-12','Caculate minimum number','<p>Write a C program to calculate the minimum number of notes that make up a number</p><p>Input: Input a integer num (0 &lt; num &lt; 10000)</p><p>Output: Print exactly these number: 500, 100, 50, 20, 10, 5, 2, 1 and count how many time you got one of that for each number. Print “Wrong input” when the input is incorrect.</p><p><br>&nbsp;</p><figure class=\"table\"><table><tbody><tr><td>Input</td><td>Output</td><td>Explain</td></tr><tr><td>575</td><td>500: 1<br>100: 0<br>50: 1<br>20: 1<br>10: 0<br>5: 1<br>2: 0<br>1: 0</td><td>575 = 500 + 50 + 20 + 5&nbsp;</td></tr></tbody></table></figure>',15,3,1,'2020-01-13 13:56:57','2020-01-17 08:20:24',22,23),(7,'CO-7_AS-13','Print n','<h4>Write a C-program to enter the positive integer n (1 &lt; n &lt; 20) so that print out:<br>nnnn<br>nnnn<br>nnnn<br>nnnn</h4><p>Note: Must use Loop</p><p>If n &lt;= 1 or n &gt;= 20 print out “Error”.</p><p>Ex:</p><p>Input: 5</p><p>Output:</p><p>5555</p><p>5555</p><p>5555</p><p>5555</p>',20,3,1,'2020-01-13 16:24:35','2020-01-17 08:14:47',22,23),(7,'CO-7_AS-15','Odd and even number','<p>Write a program to print out all odd number from -99 to 99&nbsp;</p><p>and all even number from -100 to 100.</p><p>Note: Use both for and while/do...while. Print out all odd number first then even number&nbsp;<br>&nbsp;</p>',20,3,1,'2020-01-13 16:30:47','2020-01-17 08:20:17',22,23),(7,'CO-7_AS-16','Sum of real numbers','<p>Calculate the sum of a list of real numbers.</p><p>Input: One integer n (-1000 &lt;= n &lt;= 1000). A list of n real numbers a1, a2, a3, ..., an. (-10^9 &lt; a1, a2, a3, …, an &lt; 10^9).</p><p>Output: One number is the sum of a1, a2, a3, …, an, rounded to 2 decimal places.</p><p>If n &lt; 1, print 0.</p><figure class=\"table\"><table><tbody><tr><td>Input</td><td>Output</td></tr><tr><td><p>5</p><p>3 5 1 4 2</p></td><td>15.00</td></tr><tr><td>0</td><td>0</td></tr></tbody></table></figure>',15,3,1,'2020-01-13 16:34:32','2020-01-17 08:20:13',22,23),(7,'CO-7_AS-17','Factorial','<p>Write a program to calculate factorial of n (user input value of n, 0 &lt;= n &lt;= 15, if user input n &lt; 0 or&nbsp; n &gt; 15, print out “Invalid”).</p><figure class=\"table\"><table><tbody><tr><td>Input</td><td>Output</td></tr><tr><td>Input an integer: 3</td><td>3! = 6</td></tr><tr><td>Input an integer: 20</td><td>Invalid</td></tr><tr><td>Input an integer: -1</td><td>Invalid</td></tr></tbody></table></figure>',15,3,1,'2020-01-13 16:37:22','2020-01-17 08:20:16',22,23),(7,'CO-7_AS-18','Advance Series.','<p>Write a program to calculate S (round to 4 decimals):</p><p>S = ½ + 2/3 + ¾ + .. + (n-2)/(n-1) + (n-1)/n;</p><p>User input value of n, 3 &lt;= n &lt;= 10. If not, print out “Invalid number, please input again” and loop until user input satisfied number.</p><p>Note: S can be double or float type</p><figure class=\"table\"><table><tbody><tr><td>Input</td><td>Output</td></tr><tr><td>Input an integer: 3</td><td>S = ½ + ⅔ = 1.1667</td></tr><tr><td>Input an integer: 4</td><td>S = ½ + ⅔ + ¾&nbsp; = 1.9167</td></tr><tr><td>Input an integer:&nbsp; 6</td><td>S = ½ + ⅔ + ¾ + ⅘ + ⅚&nbsp; = 3.5500</td></tr></tbody></table></figure>',10,3,1,'2020-01-13 16:40:15','2020-01-17 08:20:15',22,23),(7,'CO-7_AS-19','Simple Array','<p>Declare an int array, allow user input number of element and value of each element. Then print out</p><p>Input: Size of array and input value of them</p><p>Output: All thing you have just inputted</p><p><br>&nbsp;</p><figure class=\"table\"><table><tbody><tr><td>Input</td><td>Output</td></tr><tr><td><p>Input size of array: 4</p><p>#1. 4</p><p>#2. 7</p><p>#3. 6</p><p>#4. 1</p></td><td><p>#1. 4</p><p>#2. 7</p><p>#3. 6</p><p>#4. 1</p></td></tr></tbody></table></figure>',20,3,1,'2020-01-18 17:48:01','2020-01-18 17:49:37',23,23),(7,'CO-7_AS-2','Print character using number','<p>Write a program:</p><p>Input: Enter integer numbers.<br>Output: Print \"F-code\" to the screen.</p><p>Note: you do not allowed to enter character from keyboard to print out the screen \"F-code\"</p>',20,3,0,'2019-12-24 05:01:32','2019-12-24 09:24:31',22,2),(7,'CO-7_AS-21','Palindrome','<p>Write a C-Program to check if a number is a palindrome (the reserve of that number is equal to it) or not.&nbsp;</p><figure class=\"table\"><table><tbody><tr><td>Input</td><td>Output</td></tr><tr><td>Input an integer: 121</td><td>121 is a palindrome</td></tr><tr><td>Input an integer: 11</td><td>11 is a palindrome</td></tr></tbody></table></figure>',15,3,1,'2020-01-18 17:52:01','2020-01-18 17:52:58',23,23),(7,'CO-7_AS-22','Duplicated Elements','<p>Declare an int array, allow user input number of element and value of each element. Look up duplicate elements and remove it from the array.</p><p>&nbsp;</p><p><i>Please enter size of array: 5</i></p><p><i>Element[0] = 12</i></p><p><i>Element[1] = 20</i></p><p><i>Element[2] = 30</i></p><p><i>Element[3] = 30</i></p><p><i>Element[4] = 9</i></p><p><i>The original array:</i></p><p><i>12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 30&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 30&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9</i></p><p><i>The array after removing duplicate elements:</i></p><p><i>12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 20&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 30&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9</i></p><p>&nbsp;</p>',10,3,1,'2020-01-18 18:11:19','2020-01-18 18:12:41',23,23),(7,'CO-7_AS-3','Rectangle','<p>Write a program:</p><p>Input: Length, width of the rectangle (<strong>real number</strong>)</p><p>Output: Print out Perimeter and area of the <strong>rectangle (round to zero decimal places)</strong></p>',15,3,0,'2019-12-24 05:20:25','2019-12-24 09:24:34',22,2),(7,'CO-7_AS-4','HAPPY NEW YEAR','<p>Write a program to print big string \"HAPPY NEW YEAR 2020\" as well as wishes for F-Code.</p><p>Example By K14: <a href=\"https://www.facebook.com/pg/fcodefpt/photos/?tab=album&amp;album_id=2204313896451844\">Link Example</a></p><p>&nbsp;</p><p>&nbsp;</p>',25,3,1,'2019-12-31 13:23:30','2020-01-17 08:20:33',23,23),(7,'CO-7_AS-5','Variable Number','<p>Declare an integer variable, name “num”.</p><p>Let the user enter the value of variable number. Print out the value of variable number.</p><p>Let the user enter a new value of variable number. Print out the new value of variable number.</p><p><strong>Example:</strong></p><p>Input:&nbsp;</p><p>Enter value of number: 2</p><p>Enter value of number after changing: 10</p><p>Output:</p><p>Value of number: 2</p><p>Value of number after changing: 10</p>',20,5,1,'2020-01-08 15:44:17','2020-01-17 08:20:34',23,23),(7,'CO-7_AS-6','Simple Clothing Shop','<p>&nbsp;Write a C program to calculate price of clothes. Know that the formula is “cost*quantity*(100 - discount)%” (cost, quantity and discount &gt; 0).</p><p><strong>Example:</strong></p><p>Input:&nbsp;</p><p>Cost: 10</p><p>Quantity: 15</p><p>Discount: 20</p><p>Output: Price of clothes: 120</p><p>&nbsp;</p><p>Input:&nbsp;</p><p>Cost: 17</p><p>Quantity: 16</p><p>Discount: 20</p><p>Output: Price of clothes: 217.6</p><p>&nbsp;</p>',15,5,1,'2020-01-08 15:46:09','2020-01-17 08:20:36',23,23),(7,'CO-7_AS-7','Rich Contractor\'s Land','<p>A rich contractor has a rectangular pieces of land. Help him write a program to calculate the area of each piece of land. Length and width get from input (length, width &gt; 0). (Notes: length and width can be decimal and round the result to 2 decimal places).&nbsp;</p><p><strong>Example:</strong></p><p><strong>Input:&nbsp;</strong></p><p>Length: 8.5</p><p>Width: 4.5</p><p><strong>Output: Area: </strong>38.25</p>',15,5,1,'2020-01-08 15:47:55','2020-01-17 08:20:38',23,23),(7,'CO-7_AS-8','Days Conversion','<p>&nbsp;Write a C program to convert specified days into years, weeks and days. Note: Ignore leap year (days &gt;= 0).</p><p><strong>Input:</strong> Enter the number of days: 751</p><p><strong>Output:</strong><br>Years: 2<br>Weeks: 3<br>Days: 0</p>',10,5,1,'2020-01-08 15:49:15','2020-01-17 08:20:44',23,23),(7,'CO-7_AS-9','The greatest number','<p>Input: Two integer num1, num2 (-10^9 &lt; num1, num2 &lt; 10^9).</p><p>Output: The greatest number. If two numbers are equal, print one of them.</p>',20,3,1,'2020-01-13 13:38:19','2020-01-17 08:20:46',22,23);
/*!40000 ALTER TABLE `fc_assignment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_assignment_BEFORE_INSERT` BEFORE INSERT ON `fc_assignment` FOR EACH ROW BEGIN
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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_assignment_BEFORE_UPDATE` BEFORE UPDATE ON `fc_assignment` FOR EACH ROW BEGIN
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_course`
--

LOCK TABLES `fc_course` WRITE;
/*!40000 ALTER TABLE `fc_course` DISABLE KEYS */;
INSERT INTO `fc_course` VALUES (5,'train c','train c',0,'2019-12-15 10:30:57.000000','2019-12-28 09:22:36.000000',2,2),(6,'oop','oop',1,'2019-12-15 13:12:52.000000',NULL,2,NULL),(7,'Train C K15','train c k15',1,'2019-12-22 13:42:50.000000',NULL,19,NULL);
/*!40000 ALTER TABLE `fc_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_course_BEFORE_INSERT` BEFORE INSERT ON `fc_course` FOR EACH ROW BEGIN
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
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_course_BEFORE_UPDATE` BEFORE UPDATE ON `fc_course` FOR EACH ROW BEGIN
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  CONSTRAINT `ac_id` FOREIGN KEY (`ac_creator_id`) REFERENCES `fc_account` (`ac_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_university_course`
--

LOCK TABLES `fc_university_course` WRITE;
/*!40000 ALTER TABLE `fc_university_course` DISABLE KEYS */;
INSERT INTO `fc_university_course` VALUES (1,'K13','2019-08-20 19:14:31.000000','2019-08-20 19:56:00.000000',1,1),(16,'K12','2019-08-27 17:44:42.000000',NULL,1,NULL),(19,'K14','2019-08-28 20:00:33.000000',NULL,1,NULL),(20,'K15','2019-12-22 13:46:24.000000',NULL,2,NULL);
/*!40000 ALTER TABLE `fc_university_course` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_course` BEFORE INSERT ON `fc_university_course` FOR EACH ROW SET new.uc_date_created := NOW() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_update_course` BEFORE UPDATE ON `fc_university_course` FOR EACH ROW SET new.uc_last_modified := NOW() */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fc_work`
--

DROP TABLE IF EXISTS `fc_work`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fc_work` (
  `as_id` varchar(255) DEFAULT NULL,
  `wo_id` varchar(45) NOT NULL,
  `ac_worker` int(11) DEFAULT NULL,
  `ac_judger` int(11) DEFAULT NULL,
  `wo_name` varchar(45) DEFAULT NULL,
  `wo_submit_quantity` int(11) DEFAULT NULL,
  `wo_comment` text,
  `wo_status` int(11) DEFAULT NULL,
  `wo_submit_time` timestamp NULL DEFAULT NULL,
  `wo_judge_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`wo_id`),
  UNIQUE KEY `wo_name_UNIQUE` (`wo_name`),
  KEY `fk_fc_work_1_idx` (`ac_worker`),
  KEY `fk_fc_work_2_idx` (`ac_judger`),
  KEY `fk_fc_work_3_idx` (`as_id`),
  CONSTRAINT `fk_fc_work_1` FOREIGN KEY (`ac_worker`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_work_2` FOREIGN KEY (`ac_judger`) REFERENCES `fc_account` (`ac_id`),
  CONSTRAINT `fk_fc_work_3` FOREIGN KEY (`as_id`) REFERENCES `fc_assignment` (`as_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fc_work`
--

LOCK TABLES `fc_work` WRITE;
/*!40000 ALTER TABLE `fc_work` DISABLE KEYS */;
INSERT INTO `fc_work` VALUES ('CO-7_AS-1','binhtt1_CO-7_AS-1_1',24,2,'binhtt1_CO-7_AS-1_1.c',1,'',-1,'2019-12-22 15:24:12','2020-01-07 10:51:49'),('CO-7_AS-1','hienht1_CO-7_AS-1_1',26,NULL,'hienht1_CO-7_AS-1_1.c',1,NULL,0,'2019-12-22 15:18:33',NULL),('CO-7_AS-1','SE140832_CO-7_AS-1_1',56,NULL,'SE140832_CO-7_AS-1_1.c',1,NULL,0,'2019-12-24 09:01:40',NULL),('CO-7_AS-1','SE140832_CO-7_AS-1_2',56,NULL,'SE140832_CO-7_AS-1_2.c',2,NULL,0,'2019-12-24 09:10:42',NULL),('CO-7_AS-2','SE140832_CO-7_AS-2_1',56,NULL,'SE140832_CO-7_AS-2_1.c',1,NULL,0,'2019-12-24 09:03:44',NULL),('CO-7_AS-2','SE140832_CO-7_AS-2_2',56,NULL,'SE140832_CO-7_AS-2_2.c',2,NULL,NULL,NULL,NULL),('CO-7_AS-3','SE140832_CO-7_AS-3_1',56,2,'SE140832_CO-7_AS-3_1.c',1,'',-1,'2019-12-24 09:06:12','2020-01-07 10:51:59'),('CO-7_AS-12','SE150063_CO-7_AS-12_1',27,22,'SE150063_CO-7_AS-12_1.c',1,'Bắt số 10000 nhưng lại kêu người dùng nhập, nên chỉnh tab cách còn 4 ô',-1,'2020-01-16 10:20:28','2020-01-20 07:16:12'),('CO-7_AS-13','SE150063_CO-7_AS-13_1',27,NULL,'SE150063_CO-7_AS-13_1.c',1,NULL,0,'2020-01-19 17:02:11',NULL),('CO-7_AS-15','SE150063_CO-7_AS-15_1',27,NULL,'SE150063_CO-7_AS-15_1.c',1,NULL,0,'2020-01-19 17:01:46',NULL),('CO-7_AS-16','SE150063_CO-7_AS-16_1',27,NULL,'SE150063_CO-7_AS-16_1.c',1,NULL,0,'2020-01-19 17:03:19',NULL),('CO-7_AS-17','SE150063_CO-7_AS-17_1',27,NULL,'SE150063_CO-7_AS-17_1.c',1,NULL,0,'2020-01-19 17:06:14',NULL),('CO-7_AS-18','SE150063_CO-7_AS-18_1',27,NULL,'SE150063_CO-7_AS-18_1.c',1,NULL,0,'2020-01-19 17:04:00',NULL),('CO-7_AS-19','SE150063_CO-7_AS-19_1',27,NULL,'SE150063_CO-7_AS-19_1.c',1,NULL,0,'2020-01-19 17:04:20',NULL),('CO-7_AS-4','SE150063_CO-7_AS-4_1',27,2,'SE150063_CO-7_AS-4_1.c',1,'',1,'2020-01-02 16:37:41','2020-01-07 09:48:44'),('CO-7_AS-4','SE150063_CO-7_AS-4_2',27,22,'SE150063_CO-7_AS-4_2.c',2,'',1,'2020-01-05 09:17:37','2020-01-09 14:22:51'),('CO-7_AS-5','SE150063_CO-7_AS-5_1',27,23,'SE150063_CO-7_AS-5_1.c',1,'',1,'2020-01-11 14:45:15','2020-01-12 17:01:41'),('CO-7_AS-6','SE150063_CO-7_AS-6_1',27,23,'SE150063_CO-7_AS-6_1.c',1,'Xem kĩ lại kiểu dữ liệu các biến',1,'2020-01-11 14:46:13','2020-01-12 17:04:07'),('CO-7_AS-6','SE150063_CO-7_AS-6_2',27,23,'SE150063_CO-7_AS-6_2.c',2,'',1,'2020-01-11 15:01:00','2020-01-12 17:21:39'),('CO-7_AS-7','SE150063_CO-7_AS-7_1',27,23,'SE150063_CO-7_AS-7_1.c',1,'Code quá phúc tạp sao với đề bài, bài không yêu cầu nhập số lượng mảnh đất',1,'2020-01-11 14:47:00','2020-01-12 17:08:14'),('CO-7_AS-8','SE150063_CO-7_AS-8_1',27,23,'SE150063_CO-7_AS-8_1.c',1,'',1,'2020-01-11 14:48:16','2020-01-12 17:12:18'),('CO-7_AS-9','SE150063_CO-7_AS-9_1',27,NULL,'SE150063_CO-7_AS-9_1.c',1,NULL,0,'2020-01-20 12:50:54',NULL),('CO-7_AS-9','SE150063_CO-7_AS-9_2',27,NULL,'SE150063_CO-7_AS-9_2.c',2,NULL,0,'2020-01-20 12:51:30',NULL),('CO-7_AS-1','SE150079_CO-7_AS-1_1',45,NULL,'SE150079_CO-7_AS-1_1.c',1,NULL,0,'2019-12-27 14:59:12',NULL),('CO-7_AS-1','SE150079_CO-7_AS-1_2',45,NULL,'SE150079_CO-7_AS-1_2.c',2,NULL,0,'2019-12-27 14:59:53',NULL),('CO-7_AS-4','SE150079_CO-7_AS-4_1',45,2,'SE150079_CO-7_AS-4_1.c',1,'',1,'2020-01-02 06:40:58','2020-01-07 09:47:36'),('CO-7_AS-5','SE150079_CO-7_AS-5_1',45,23,'SE150079_CO-7_AS-5_1.c',1,'Not clean code ',-1,'2020-01-11 03:44:01','2020-01-11 08:44:05'),('CO-7_AS-5','SE150079_CO-7_AS-5_2',45,23,'SE150079_CO-7_AS-5_2.c',2,'Not clean code ',-1,'2020-01-11 04:13:37','2020-01-11 08:40:38'),('CO-7_AS-5','SE150079_CO-7_AS-5_3',45,23,'SE150079_CO-7_AS-5_3.c',3,'',1,'2020-01-13 16:30:12','2020-01-15 09:49:05'),('CO-7_AS-6','SE150079_CO-7_AS-6_1',45,23,'SE150079_CO-7_AS-6_1.c',1,'Not clean code ',-1,'2020-01-11 04:02:40','2020-01-11 08:40:53'),('CO-7_AS-6','SE150079_CO-7_AS-6_2',45,23,'SE150079_CO-7_AS-6_2.c',2,'cost, discount cũng có thể là số thực r. Không cần đợi tính ra price mới sang float',-1,'2020-01-13 16:30:45','2020-01-15 09:50:14'),('CO-7_AS-6','SE150079_CO-7_AS-6_3',45,22,'SE150079_CO-7_AS-6_3.c',3,'Code chưa clean ( sau } có dấu ;), chưa đọc kỹ đề',-3,'2020-01-16 04:55:26','2020-01-20 06:45:05'),('CO-7_AS-7','SE150079_CO-7_AS-7_1',45,23,'SE150079_CO-7_AS-7_1.c',1,'Gặp mentor để biết thêm',-1,'2020-01-11 04:49:25','2020-01-11 08:38:29'),('CO-7_AS-7','SE150079_CO-7_AS-7_2',45,23,'SE150079_CO-7_AS-7_2.c',2,'Nếu giá trị <= 0 thì sao',-1,'2020-01-13 16:31:40','2020-01-15 09:50:34'),('CO-7_AS-7','SE150079_CO-7_AS-7_3',45,22,'SE150079_CO-7_AS-7_3.c',3,'',1,'2020-01-16 05:13:13','2020-01-20 06:53:38'),('CO-7_AS-8','SE150079_CO-7_AS-8_1',45,23,'SE150079_CO-7_AS-8_1.c',1,'Not clean code ',-1,'2020-01-11 04:37:52','2020-01-11 08:40:04'),('CO-7_AS-8','SE150079_CO-7_AS-8_2',45,23,'SE150079_CO-7_AS-8_2.c',2,'Nếu giá trị < 0 thì sao',-1,'2020-01-13 16:32:44','2020-01-15 09:50:46'),('CO-7_AS-8','SE150079_CO-7_AS-8_3',45,22,'SE150079_CO-7_AS-8_3.c',3,'',1,'2020-01-16 05:03:00','2020-01-20 07:00:12'),('CO-7_AS-11','SE150115_CO-7_AS-11_1',39,22,'SE150115_CO-7_AS-11_1.c',1,'',1,'2020-01-16 11:23:41','2020-01-20 07:34:18'),('CO-7_AS-12','SE150115_CO-7_AS-12_1',39,22,'SE150115_CO-7_AS-12_1.c',1,'',1,'2020-01-16 11:38:58','2020-01-20 07:36:19'),('CO-7_AS-4','SE150115_CO-7_AS-4_1',39,19,'SE150115_CO-7_AS-4_1.c',1,'',1,'2020-01-02 16:51:30','2020-01-03 07:58:57'),('CO-7_AS-5','SE150115_CO-7_AS-5_1',39,23,'SE150115_CO-7_AS-5_1.c',1,'',1,'2020-01-10 04:24:00','2020-01-11 08:15:58'),('CO-7_AS-5','SE150115_CO-7_AS-5_2',39,23,'SE150115_CO-7_AS-5_2.c',2,'Nộp 2 lần trong 1 bài, giống bài trước',1,'2020-01-10 04:24:01','2020-01-11 08:16:34'),('CO-7_AS-5','SE150115_CO-7_AS-5_3',39,23,'SE150115_CO-7_AS-5_3.c',3,'',1,'2020-01-10 04:24:02','2020-01-11 08:49:43'),('CO-7_AS-6','SE150115_CO-7_AS-6_1',39,23,'SE150115_CO-7_AS-6_1.c',1,'Cộng trừ nhân chia cách nhau dấu cách',-1,'2020-01-10 04:37:47','2020-01-11 08:18:41'),('CO-7_AS-6','SE150115_CO-7_AS-6_2',39,23,'SE150115_CO-7_AS-6_2.c',2,'',1,'2020-01-11 08:34:34','2020-01-11 08:42:00'),('CO-7_AS-7','SE150115_CO-7_AS-7_1',39,23,'SE150115_CO-7_AS-7_1.c',1,'Cộng trừ nhân chia cách nhau dấu cách',-1,'2020-01-10 04:50:17','2020-01-11 08:19:06'),('CO-7_AS-7','SE150115_CO-7_AS-7_2',39,23,'SE150115_CO-7_AS-7_2.c',2,'',1,'2020-01-11 08:35:43','2020-01-11 08:42:13'),('CO-7_AS-8','SE150115_CO-7_AS-8_1',39,23,'SE150115_CO-7_AS-8_1.c',1,'',1,'2020-01-10 05:00:40','2020-01-11 08:19:19'),('CO-7_AS-8','SE150115_CO-7_AS-8_2',39,23,'SE150115_CO-7_AS-8_2.c',2,'',1,'2020-01-10 05:01:02','2020-01-10 19:21:38'),('CO-7_AS-9','SE150115_CO-7_AS-9_1',39,22,'SE150115_CO-7_AS-9_1.c',1,'đọc kỹ lại yêu cầu đề',-1,'2020-01-16 10:51:07','2020-01-20 07:21:46'),('CO-7_AS-1','SE150125_CO-7_AS-1_1',51,NULL,'SE150125_CO-7_AS-1_1.c',1,NULL,0,'2019-12-27 16:05:26',NULL),('CO-7_AS-1','SE150125_CO-7_AS-1_2',51,NULL,'SE150125_CO-7_AS-1_2.c',2,NULL,NULL,NULL,NULL),('CO-7_AS-4','SE150125_CO-7_AS-4_1',51,2,'SE150125_CO-7_AS-4_1.c',1,'',1,'2020-01-01 19:13:42','2020-01-02 03:35:21'),('CO-7_AS-4','SE150125_CO-7_AS-4_2',51,NULL,'SE150125_CO-7_AS-4_2.c',2,NULL,0,'2020-01-01 19:13:43',NULL),('CO-7_AS-4','SE150125_CO-7_AS-4_3',51,23,'SE150125_CO-7_AS-4_3.c',3,'',1,'2020-01-01 19:13:44','2020-01-10 18:38:15'),('CO-7_AS-5','SE150125_CO-7_AS-5_1',51,23,'SE150125_CO-7_AS-5_1.c',1,'Not clean code ',-3,'2020-01-11 04:25:52','2020-01-11 08:36:49'),('CO-7_AS-11','SE150182_CO-7_AS-11_1',28,NULL,'SE150182_CO-7_AS-11_1.c',1,NULL,0,'2020-01-18 06:09:24',NULL),('CO-7_AS-12','SE150182_CO-7_AS-12_1',28,NULL,'SE150182_CO-7_AS-12_1.c',1,NULL,0,'2020-01-18 03:52:19',NULL),('CO-7_AS-13','SE150182_CO-7_AS-13_1',28,23,'SE150182_CO-7_AS-13_1.c',1,'Sai yêu cầu đề bài',-1,'2020-01-14 17:36:28','2020-01-17 05:48:20'),('CO-7_AS-13','SE150182_CO-7_AS-13_2',28,NULL,'SE150182_CO-7_AS-13_2.c',2,NULL,0,'2020-01-18 05:10:27',NULL),('CO-7_AS-15','SE150182_CO-7_AS-15_1',28,23,'SE150182_CO-7_AS-15_1.c',1,'',1,'2020-01-15 08:18:52','2020-01-17 06:57:13'),('CO-7_AS-16','SE150182_CO-7_AS-16_1',28,NULL,'SE150182_CO-7_AS-16_1.c',1,NULL,0,'2020-01-18 06:37:49',NULL),('CO-7_AS-17','SE150182_CO-7_AS-17_1',28,NULL,'SE150182_CO-7_AS-17_1.c',1,NULL,0,'2020-01-18 07:43:15',NULL),('CO-7_AS-18','SE150182_CO-7_AS-18_1',28,NULL,'SE150182_CO-7_AS-18_1.c',1,NULL,0,'2020-01-18 08:38:27',NULL),('CO-7_AS-4','SE150182_CO-7_AS-4_1',28,2,'SE150182_CO-7_AS-4_1.c',1,'',1,'2020-01-03 09:34:51','2020-01-07 09:52:46'),('CO-7_AS-5','SE150182_CO-7_AS-5_1',28,22,'SE150182_CO-7_AS-5_1.c',1,'',1,'2020-01-08 17:29:22','2020-01-09 15:25:22'),('CO-7_AS-5','SE150182_CO-7_AS-5_2',28,NULL,'SE150182_CO-7_AS-5_2.c',2,NULL,0,'2020-01-08 17:29:24',NULL),('CO-7_AS-5','SE150182_CO-7_AS-5_3',28,NULL,'SE150182_CO-7_AS-5_3.c',3,NULL,0,'2020-01-08 17:29:26',NULL),('CO-7_AS-6','SE150182_CO-7_AS-6_1',28,23,'SE150182_CO-7_AS-6_1.c',1,'Declare not used variable',-1,'2020-01-08 17:55:48','2020-01-10 19:03:45'),('CO-7_AS-6','SE150182_CO-7_AS-6_2',28,23,'SE150182_CO-7_AS-6_2.c',2,'',1,'2020-01-11 14:55:06','2020-01-12 17:12:49'),('CO-7_AS-7','SE150182_CO-7_AS-7_1',28,22,'SE150182_CO-7_AS-7_1.c',1,'',-1,'2020-01-08 16:24:52','2020-01-09 15:12:40'),('CO-7_AS-7','SE150182_CO-7_AS-7_2',28,23,'SE150182_CO-7_AS-7_2.c',2,'Căn lề chưa đúng',-1,'2020-01-09 18:38:58','2020-01-11 08:13:29'),('CO-7_AS-7','SE150182_CO-7_AS-7_3',28,23,'SE150182_CO-7_AS-7_3.c',3,'Đề ko yêu cầu nhập số lượng mảnh đất nha, làm hơi dư rồi đó',1,'2020-01-11 13:48:45','2020-01-12 16:44:48'),('CO-7_AS-7','SE150182_CO-7_AS-7_4',28,23,'SE150182_CO-7_AS-7_4.c',4,'',1,'2020-01-11 14:55:27','2020-01-12 17:13:44'),('CO-7_AS-8','SE150182_CO-7_AS-8_1',28,22,'SE150182_CO-7_AS-8_1.c',1,'',-1,'2020-01-08 18:41:23','2020-01-09 16:01:41'),('CO-7_AS-8','SE150182_CO-7_AS-8_2',28,23,'SE150182_CO-7_AS-8_2.c',2,'',1,'2020-01-09 13:33:24','2020-01-10 19:19:12'),('CO-7_AS-1','SE150204_CO-7_AS-1_1',41,NULL,'SE150204_CO-7_AS-1_1.c',1,NULL,0,'2019-12-25 15:35:52',NULL),('CO-7_AS-11','SE150204_CO-7_AS-11_1',41,NULL,'SE150204_CO-7_AS-11_1.c',1,NULL,0,'2020-01-19 02:48:58',NULL),('CO-7_AS-12','SE150204_CO-7_AS-12_1',41,NULL,'SE150204_CO-7_AS-12_1.c',1,NULL,0,'2020-01-18 14:55:32',NULL),('CO-7_AS-13','SE150204_CO-7_AS-13_1',41,23,'SE150204_CO-7_AS-13_1.c',1,'Đọc kĩ lại đề',-1,'2020-01-13 20:36:46','2020-01-17 05:06:56'),('CO-7_AS-13','SE150204_CO-7_AS-13_2',41,NULL,'SE150204_CO-7_AS-13_2.c',2,NULL,NULL,NULL,NULL),('CO-7_AS-15','SE150204_CO-7_AS-15_1',41,23,'SE150204_CO-7_AS-15_1.c',1,'',1,'2020-01-14 15:26:18','2020-01-17 05:40:27'),('CO-7_AS-16','SE150204_CO-7_AS-16_1',41,NULL,'SE150204_CO-7_AS-16_1.c',1,NULL,0,'2020-01-19 05:16:52',NULL),('CO-7_AS-16','SE150204_CO-7_AS-16_2',41,NULL,'SE150204_CO-7_AS-16_2.c',2,NULL,0,'2020-01-19 05:16:53',NULL),('CO-7_AS-16','SE150204_CO-7_AS-16_3',41,NULL,'SE150204_CO-7_AS-16_3.c',3,NULL,0,'2020-01-19 05:16:56',NULL),('CO-7_AS-17','SE150204_CO-7_AS-17_1',41,NULL,'SE150204_CO-7_AS-17_1.c',1,NULL,0,'2020-01-20 01:16:20',NULL),('CO-7_AS-17','SE150204_CO-7_AS-17_2',41,NULL,'SE150204_CO-7_AS-17_2.c',2,NULL,0,'2020-01-20 01:16:20',NULL),('CO-7_AS-4','SE150204_CO-7_AS-4_1',41,2,'SE150204_CO-7_AS-4_1.c',1,'Not clean code',-1,'2020-01-03 17:38:51','2020-01-07 10:30:27'),('CO-7_AS-4','SE150204_CO-7_AS-4_2',41,22,'SE150204_CO-7_AS-4_2.c',2,'',1,'2020-01-07 15:42:03','2020-01-09 14:24:20'),('CO-7_AS-5','SE150204_CO-7_AS-5_1',41,23,'SE150204_CO-7_AS-5_1.c',1,'',1,'2020-01-09 03:47:46','2020-01-10 18:42:11'),('CO-7_AS-6','SE150204_CO-7_AS-6_1',41,23,'SE150204_CO-7_AS-6_1.c',1,'Not clean code',-1,'2020-01-09 03:48:16','2020-01-10 18:53:18'),('CO-7_AS-6','SE150204_CO-7_AS-6_2',41,23,'SE150204_CO-7_AS-6_2.c',2,'',1,'2020-01-11 03:47:04','2020-01-11 08:35:06'),('CO-7_AS-7','SE150204_CO-7_AS-7_1',41,23,'SE150204_CO-7_AS-7_1.c',1,'Clean code!!!',-1,'2020-01-09 03:49:09','2020-01-10 19:05:16'),('CO-7_AS-7','SE150204_CO-7_AS-7_2',41,23,'SE150204_CO-7_AS-7_2.c',2,'',1,'2020-01-11 17:54:57','2020-01-12 17:32:41'),('CO-7_AS-8','SE150204_CO-7_AS-8_1',41,23,'SE150204_CO-7_AS-8_1.c',1,'',-2,'2020-01-09 03:49:32','2020-01-10 19:10:19'),('CO-7_AS-8','SE150204_CO-7_AS-8_2',41,23,'SE150204_CO-7_AS-8_2.c',2,'',-1,'2020-01-09 03:49:33','2020-01-10 19:11:28'),('CO-7_AS-8','SE150204_CO-7_AS-8_3',41,23,'SE150204_CO-7_AS-8_3.c',3,'Not clean code ',-1,'2020-01-09 04:04:13','2020-01-10 19:11:08'),('CO-7_AS-8','SE150204_CO-7_AS-8_4',41,23,'SE150204_CO-7_AS-8_4.c',4,'Một số chỗ chưa có dấu cách (chưa clean code)',-1,'2020-01-11 16:47:06','2020-01-12 17:29:31'),('CO-7_AS-8','SE150204_CO-7_AS-8_5',41,23,'SE150204_CO-7_AS-8_5.c',5,'',1,'2020-01-13 04:27:23','2020-01-15 09:39:56'),('CO-7_AS-9','SE150204_CO-7_AS-9_1',41,23,'SE150204_CO-7_AS-9_1.c',1,'Sai yêu cầu đề bài',-1,'2020-01-14 05:30:19','2020-01-17 05:23:26'),('CO-7_AS-1','se150218_CO-7_AS-1_1',50,NULL,'se150218_CO-7_AS-1_1.c',1,NULL,0,'2019-12-25 14:47:23',NULL),('CO-7_AS-1','se150218_CO-7_AS-1_2',50,NULL,'se150218_CO-7_AS-1_2.c',2,NULL,0,'2019-12-25 14:47:26',NULL),('CO-7_AS-1','se150218_CO-7_AS-1_3',50,NULL,'se150218_CO-7_AS-1_3.c',3,NULL,0,'2019-12-25 14:47:27',NULL),('CO-7_AS-4','se150218_CO-7_AS-4_1',50,2,'se150218_CO-7_AS-4_1.c',1,'Not clean code',-1,'2020-01-03 15:16:23','2020-01-07 10:32:40'),('CO-7_AS-4','se150218_CO-7_AS-4_2',50,23,'se150218_CO-7_AS-4_2.c',2,'The output is hard to see and too small',-1,'2020-01-09 11:30:49','2020-01-10 18:35:00'),('CO-7_AS-4','se150218_CO-7_AS-4_3',50,23,'se150218_CO-7_AS-4_3.c',3,'Còn sai lỗi chính tả',-1,'2020-01-11 16:06:40','2020-01-12 17:24:54'),('CO-7_AS-5','se150218_CO-7_AS-5_1',50,23,'se150218_CO-7_AS-5_1.c',1,'Do not use \"puts\".',-1,'2020-01-09 08:11:54','2020-01-10 18:45:52'),('CO-7_AS-5','se150218_CO-7_AS-5_2',50,23,'se150218_CO-7_AS-5_2.c',2,'Không có ai viết \"& num\" đâu nhe. Clean code ko phải cách chỗ đó',-1,'2020-01-11 10:02:18','2020-01-12 16:37:18'),('CO-7_AS-5','se150218_CO-7_AS-5_3',50,23,'se150218_CO-7_AS-5_3.c',3,'',1,'2020-01-14 05:12:59','2020-01-17 05:20:02'),('CO-7_AS-6','se150218_CO-7_AS-6_1',50,23,'se150218_CO-7_AS-6_1.c',1,'Why use \"puts\"?',-1,'2020-01-09 10:24:32','2020-01-10 19:00:02'),('CO-7_AS-6','se150218_CO-7_AS-6_2',50,23,'se150218_CO-7_AS-6_2.c',2,'Sửa lại chỗ dấu & đi',-1,'2020-01-11 14:47:19','2020-01-12 17:11:51'),('CO-7_AS-6','se150218_CO-7_AS-6_3',50,23,'se150218_CO-7_AS-6_3.c',3,'Not clean code (canh lề chưa đúng)',-1,'2020-01-11 14:56:29','2020-01-12 17:19:59'),('CO-7_AS-6','se150218_CO-7_AS-6_4',50,23,'se150218_CO-7_AS-6_4.c',4,'Lần sau cái nào kiểu int thì khai báo int, ko nên khai báo float xong rồi ép kiểu như thế',1,'2020-01-14 05:25:12','2020-01-17 05:23:14'),('CO-7_AS-7','se150218_CO-7_AS-7_1',50,23,'se150218_CO-7_AS-7_1.c',1,'',-1,'2020-01-09 10:26:35','2020-01-10 19:06:40'),('CO-7_AS-7','se150218_CO-7_AS-7_2',50,23,'se150218_CO-7_AS-7_2.c',2,'Thiếu validation',-1,'2020-01-11 15:01:39','2020-01-12 17:22:01'),('CO-7_AS-7','se150218_CO-7_AS-7_3',50,23,'se150218_CO-7_AS-7_3.c',3,'',1,'2020-01-14 06:07:45','2020-01-17 05:27:29'),('CO-7_AS-7','se150218_CO-7_AS-7_4',50,NULL,'se150218_CO-7_AS-7_4.c',4,NULL,NULL,NULL,NULL),('CO-7_AS-8','se150218_CO-7_AS-8_1',50,23,'se150218_CO-7_AS-8_1.c',1,'Not clean code ',-1,'2020-01-09 10:26:58','2020-01-10 19:13:55'),('CO-7_AS-8','se150218_CO-7_AS-8_2',50,23,'se150218_CO-7_AS-8_2.c',2,'Sửa lại chỗ dấu & đi',-1,'2020-01-11 15:10:51','2020-01-12 17:22:28'),('CO-7_AS-8','se150218_CO-7_AS-8_3',50,23,'se150218_CO-7_AS-8_3.c',3,'',1,'2020-01-14 06:19:13','2020-01-17 05:27:57'),('CO-7_AS-9','se150218_CO-7_AS-9_1',50,23,'se150218_CO-7_AS-9_1.c',1,'',1,'2020-01-15 05:42:53','2020-01-17 06:00:29'),('CO-7_AS-5','SE150239_CO-7_AS-5_1',43,23,'SE150239_CO-7_AS-5_1.c',1,'',1,'2020-01-12 04:55:06','2020-01-12 17:42:14'),('CO-7_AS-6','SE150239_CO-7_AS-6_1',43,23,'SE150239_CO-7_AS-6_1.c',1,'',1,'2020-01-12 04:59:55','2020-01-12 17:43:54'),('CO-7_AS-7','SE150239_CO-7_AS-7_1',43,23,'SE150239_CO-7_AS-7_1.c',1,'',1,'2020-01-12 04:56:23','2020-01-12 17:43:07'),('CO-7_AS-8','SE150239_CO-7_AS-8_1',43,23,'SE150239_CO-7_AS-8_1.c',1,'Thiếu validation',-1,'2020-01-12 04:53:38','2020-01-12 17:42:00'),('CO-7_AS-8','SE150239_CO-7_AS-8_2',43,23,'SE150239_CO-7_AS-8_2.c',2,'Nên khai báo kiểu int, không khai báo quá nhiều',1,'2020-01-13 16:21:47','2020-01-15 09:48:48'),('CO-7_AS-4','SE150246_CO-7_AS-4_1',30,2,'SE150246_CO-7_AS-4_1.c',1,'',1,'2020-01-02 12:46:15','2020-01-07 09:48:22'),('CO-7_AS-5','SE150246_CO-7_AS-5_1',30,22,'SE150246_CO-7_AS-5_1.c',1,'đọc kỹ lại yêu cầu đề',-1,'2020-01-08 17:48:29','2020-01-09 15:34:56'),('CO-7_AS-5','SE150246_CO-7_AS-5_2',30,23,'SE150246_CO-7_AS-5_2.c',2,'',1,'2020-01-09 15:38:46','2020-01-10 18:46:28'),('CO-7_AS-6','SE150246_CO-7_AS-6_1',30,23,'SE150246_CO-7_AS-6_1.c',1,'Wrong data type',-1,'2020-01-09 15:41:57','2020-01-10 19:02:05'),('CO-7_AS-6','SE150246_CO-7_AS-6_2',30,23,'SE150246_CO-7_AS-6_2.c',2,'Not clean code ',-1,'2020-01-11 03:44:02','2020-01-11 08:33:40'),('CO-7_AS-7','SE150246_CO-7_AS-7_1',30,23,'SE150246_CO-7_AS-7_1.c',1,'Đặt tên biến rõ ràng',-1,'2020-01-11 03:45:44','2020-01-11 08:34:40'),('CO-7_AS-8','SE150246_CO-7_AS-8_1',30,23,'SE150246_CO-7_AS-8_1.c',1,'Year, day, week là số nguyên hay số thực',-1,'2020-01-13 16:13:06','2020-01-15 09:48:09'),('CO-7_AS-8','SE150246_CO-7_AS-8_2',30,22,'SE150246_CO-7_AS-8_2.c',2,'yêu cầu người dùng nhập lại phải > 0 nhưng vẫn nhận số 0',-1,'2020-01-15 18:13:53','2020-01-19 12:14:55'),('CO-7_AS-9','SE150246_CO-7_AS-9_1',30,22,'SE150246_CO-7_AS-9_1.c',1,'đọc kỹ lại yêu cầu đề',-1,'2020-01-15 18:18:08','2020-01-19 12:19:15'),('CO-7_AS-4','SE150294_CO-7_AS-4_1',33,2,'SE150294_CO-7_AS-4_1.c',1,'đọc kĩ đề.',-1,'2020-01-01 07:04:47','2020-01-01 07:44:41'),('CO-7_AS-4','SE150294_CO-7_AS-4_2',33,2,'SE150294_CO-7_AS-4_2.c',2,'',1,'2020-01-06 13:44:51','2020-01-07 10:20:03'),('CO-7_AS-5','SE150294_CO-7_AS-5_1',33,23,'SE150294_CO-7_AS-5_1.c',1,'\"Your is Number\"?? Xem lại test case mẫu mới bổ sung',-1,'2020-01-10 09:05:20','2020-01-11 08:25:20'),('CO-7_AS-5','SE150294_CO-7_AS-5_2',33,23,'SE150294_CO-7_AS-5_2.c',2,'Nộp 2 lần trong 1 bài, giống bài trước',-1,'2020-01-10 09:05:24','2020-01-11 08:26:06'),('CO-7_AS-5','SE150294_CO-7_AS-5_3',33,23,'SE150294_CO-7_AS-5_3.c',3,'Xem lại test case của đề bài mới bổ sung',-1,'2020-01-10 12:32:24','2020-01-11 08:27:20'),('CO-7_AS-5','SE150294_CO-7_AS-5_4',33,23,'SE150294_CO-7_AS-5_4.c',4,'Đọc kĩ lại đề',-1,'2020-01-11 11:59:21','2020-01-12 16:39:44'),('CO-7_AS-5','SE150294_CO-7_AS-5_5',33,23,'SE150294_CO-7_AS-5_5.c',5,'Sai kết quả',-1,'2020-01-13 01:43:12','2020-01-15 09:37:14'),('CO-7_AS-6','SE150294_CO-7_AS-6_1',33,23,'SE150294_CO-7_AS-6_1.c',1,'Sai quy tắc đặt tên biến, clean code',-1,'2020-01-11 03:34:41','2020-01-11 08:29:37'),('CO-7_AS-6','SE150294_CO-7_AS-6_2',33,23,'SE150294_CO-7_AS-6_2.c',2,'Sau dấu phẩy là 1 khoảng cách',-1,'2020-01-11 12:52:25','2020-01-12 16:41:22'),('CO-7_AS-6','SE150294_CO-7_AS-6_3',33,23,'SE150294_CO-7_AS-6_3.c',3,'',1,'2020-01-12 01:23:30','2020-01-12 17:33:37'),('CO-7_AS-7','SE150294_CO-7_AS-7_1',33,23,'SE150294_CO-7_AS-7_1.c',1,'Length, width < 0 thì sao',-1,'2020-01-11 13:03:19','2020-01-12 16:41:58'),('CO-7_AS-7','SE150294_CO-7_AS-7_2',33,23,'SE150294_CO-7_AS-7_2.c',2,'',1,'2020-01-13 02:10:40','2020-01-15 09:38:39'),('CO-7_AS-8','SE150294_CO-7_AS-8_1',33,23,'SE150294_CO-7_AS-8_1.c',1,'Thiếu validation, đặt tên biến quy tắc camel case viết sai',-1,'2020-01-11 13:50:34','2020-01-12 16:42:47'),('CO-7_AS-8','SE150294_CO-7_AS-8_2',33,NULL,'SE150294_CO-7_AS-8_2.c',2,NULL,0,'2020-01-13 02:26:20',NULL),('CO-7_AS-8','SE150294_CO-7_AS-8_3',33,23,'SE150294_CO-7_AS-8_3.c',3,'Nên đặt tên biến theo camel case',1,'2020-01-13 02:29:59','2020-01-15 09:39:33'),('CO-7_AS-13','SE150525_CO-7_AS-13_1',31,23,'SE150525_CO-7_AS-13_1.c',1,'Sai yêu cầu đề bài',-1,'2020-01-15 08:44:54','2020-01-17 06:58:20'),('CO-7_AS-15','SE150525_CO-7_AS-15_1',31,23,'SE150525_CO-7_AS-15_1.c',1,'',1,'2020-01-15 08:48:10','2020-01-17 06:58:57'),('CO-7_AS-16','SE150525_CO-7_AS-16_1',31,23,'SE150525_CO-7_AS-16_1.c',1,'',1,'2020-01-14 15:13:19','2020-01-17 05:34:42'),('CO-7_AS-17','SE150525_CO-7_AS-17_1',31,23,'SE150525_CO-7_AS-17_1.c',1,'',1,'2020-01-14 15:16:19','2020-01-17 05:38:56'),('CO-7_AS-18','SE150525_CO-7_AS-18_1',31,23,'SE150525_CO-7_AS-18_1.c',1,'Tên biến không viết hoa chữ cái đầu, bài này chỉ cần do while ko cần if trước đó',-1,'2020-01-14 19:25:33','2020-01-17 05:52:32'),('CO-7_AS-4','SE150525_CO-7_AS-4_1',31,2,'SE150525_CO-7_AS-4_1.c',1,'',1,'2020-01-02 05:11:20','2020-01-07 09:47:15'),('CO-7_AS-5','SE150525_CO-7_AS-5_1',31,23,'SE150525_CO-7_AS-5_1.c',1,'No Vietnamese',-1,'2020-01-09 04:19:25','2020-01-10 18:43:12'),('CO-7_AS-5','SE150525_CO-7_AS-5_2',31,23,'SE150525_CO-7_AS-5_2.c',2,'',1,'2020-01-11 14:00:59','2020-01-12 16:56:03'),('CO-7_AS-6','SE150525_CO-7_AS-6_1',31,23,'SE150525_CO-7_AS-6_1.c',1,'',-1,'2020-01-09 04:23:29','2020-01-10 18:54:10'),('CO-7_AS-6','SE150525_CO-7_AS-6_2',31,23,'SE150525_CO-7_AS-6_2.c',2,'scanf viết xuống hàng nha, chỗ dấu * cũng cách nha, xem kĩ chỗ nào cách vô',-1,'2020-01-11 14:01:23','2020-01-12 16:57:57'),('CO-7_AS-6','SE150525_CO-7_AS-6_3',31,23,'SE150525_CO-7_AS-6_3.c',3,'wrong answer',-1,'2020-01-13 08:19:43','2020-01-15 09:44:20'),('CO-7_AS-7','SE150525_CO-7_AS-7_1',31,23,'SE150525_CO-7_AS-7_1.c',1,'',-1,'2020-01-09 04:32:52','2020-01-10 19:05:35'),('CO-7_AS-7','SE150525_CO-7_AS-7_2',31,NULL,'SE150525_CO-7_AS-7_2.c',2,NULL,0,'2020-01-09 04:32:53',NULL),('CO-7_AS-7','SE150525_CO-7_AS-7_3',31,NULL,'SE150525_CO-7_AS-7_3.c',3,NULL,0,'2020-01-09 04:32:54',NULL),('CO-7_AS-7','SE150525_CO-7_AS-7_4',31,23,'SE150525_CO-7_AS-7_4.c',4,'Thiếu validation',-1,'2020-01-11 14:02:17','2020-01-12 16:59:21'),('CO-7_AS-7','SE150525_CO-7_AS-7_5',31,23,'SE150525_CO-7_AS-7_5.c',5,'wrong answer',-1,'2020-01-13 08:20:14','2020-01-15 09:45:02'),('CO-7_AS-8','SE150525_CO-7_AS-8_1',31,23,'SE150525_CO-7_AS-8_1.c',1,'',-1,'2020-01-09 04:55:22','2020-01-10 19:17:24'),('CO-7_AS-8','SE150525_CO-7_AS-8_2',31,23,'SE150525_CO-7_AS-8_2.c',2,'Thiếu validation, chưa clean code',-1,'2020-01-11 13:59:57','2020-01-12 16:49:44'),('CO-7_AS-8','SE150525_CO-7_AS-8_3',31,23,'SE150525_CO-7_AS-8_3.c',3,'',1,'2020-01-13 08:20:44','2020-01-15 09:45:26'),('CO-7_AS-9','SE150525_CO-7_AS-9_1',31,23,'SE150525_CO-7_AS-9_1.c',1,'',1,'2020-01-14 14:42:27','2020-01-17 05:32:43'),('CO-7_AS-12','SE150666_CO-7_AS-12_1',49,23,'SE150666_CO-7_AS-12_1.c',1,'chưa validate',-1,'2020-01-15 09:25:59','2020-01-17 07:06:13'),('CO-7_AS-4','SE150666_CO-7_AS-4_1',49,19,'SE150666_CO-7_AS-4_1.c',1,'',1,'2020-01-03 07:46:41','2020-01-03 07:54:36'),('CO-7_AS-5','SE150666_CO-7_AS-5_1',49,23,'SE150666_CO-7_AS-5_1.c',1,'Not clean code , xem lại test case mới bổ sung, không ghi tiếng việt',-1,'2020-01-10 07:23:08','2020-01-11 08:48:13'),('CO-7_AS-5','SE150666_CO-7_AS-5_2',49,23,'SE150666_CO-7_AS-5_2.c',2,'',1,'2020-01-13 06:36:50','2020-01-15 09:41:41'),('CO-7_AS-6','SE150666_CO-7_AS-6_1',49,23,'SE150666_CO-7_AS-6_1.c',1,'Nếu giá trị < 0 thì sao',-1,'2020-01-13 06:36:11','2020-01-15 09:41:29'),('CO-7_AS-7','SE150666_CO-7_AS-7_1',49,23,'SE150666_CO-7_AS-7_1.c',1,'Not clean code ',-1,'2020-01-10 07:55:13','2020-01-11 08:47:21'),('CO-7_AS-7','SE150666_CO-7_AS-7_2',49,23,'SE150666_CO-7_AS-7_2.c',2,'Nếu giá trị <= 0 thì sao',-1,'2020-01-13 06:39:03','2020-01-15 09:42:02'),('CO-7_AS-8','SE150666_CO-7_AS-8_1',49,23,'SE150666_CO-7_AS-8_1.c',1,'Not clean code ',-1,'2020-01-10 08:07:28','2020-01-11 08:46:58'),('CO-7_AS-8','SE150666_CO-7_AS-8_2',49,23,'SE150666_CO-7_AS-8_2.c',2,'Submit wrong assignment, not clean code',-1,'2020-01-10 08:07:33','2020-01-10 19:23:20'),('CO-7_AS-8','SE150666_CO-7_AS-8_3',49,NULL,'SE150666_CO-7_AS-8_3.c',3,NULL,0,'2020-01-13 06:45:28',NULL),('CO-7_AS-8','SE150666_CO-7_AS-8_4',49,23,'SE150666_CO-7_AS-8_4.c',4,'Nếu ngày nhập < 0 thì sao',-1,'2020-01-13 06:45:29','2020-01-15 09:42:42'),('CO-7_AS-9','SE150666_CO-7_AS-9_1',49,23,'SE150666_CO-7_AS-9_1.c',1,'chưa validate',-1,'2020-01-15 10:06:58','2020-01-17 07:07:33'),('CO-7_AS-4','SE150683_CO-7_AS-4_1',37,2,'SE150683_CO-7_AS-4_1.c',1,'',1,'2020-01-04 00:54:48','2020-01-07 09:56:14'),('CO-7_AS-5','SE150683_CO-7_AS-5_1',37,23,'SE150683_CO-7_AS-5_1.c',1,'',1,'2020-01-11 03:42:50','2020-01-11 08:29:56'),('CO-7_AS-6','SE150683_CO-7_AS-6_1',37,23,'SE150683_CO-7_AS-6_1.c',1,'Not clean code ',-1,'2020-01-11 03:43:27','2020-01-11 08:44:39'),('CO-7_AS-6','SE150683_CO-7_AS-6_2',37,23,'SE150683_CO-7_AS-6_2.c',2,'Chưa clean code (&&, +, -, *, / đều cách ra), không nên khai báo biến ở ngoài hàm main',-1,'2020-01-12 03:45:36','2020-01-12 17:34:37'),('CO-7_AS-6','SE150683_CO-7_AS-6_3',37,23,'SE150683_CO-7_AS-6_3.c',3,'',1,'2020-01-13 09:08:42','2020-01-15 09:45:42'),('CO-7_AS-7','SE150683_CO-7_AS-7_1',37,23,'SE150683_CO-7_AS-7_1.c',1,'Not clean code ',-1,'2020-01-11 03:43:51','2020-01-11 08:44:16'),('CO-7_AS-7','SE150683_CO-7_AS-7_2',37,23,'SE150683_CO-7_AS-7_2.c',2,'Nhận xét giống bài trước',-1,'2020-01-12 03:46:13','2020-01-12 17:35:23'),('CO-7_AS-7','SE150683_CO-7_AS-7_3',37,23,'SE150683_CO-7_AS-7_3.c',3,'',1,'2020-01-13 09:09:02','2020-01-15 09:47:02'),('CO-7_AS-8','SE150683_CO-7_AS-8_1',37,23,'SE150683_CO-7_AS-8_1.c',1,'Not clean code ',-1,'2020-01-11 03:44:13','2020-01-11 08:43:42'),('CO-7_AS-8','SE150683_CO-7_AS-8_2',37,23,'SE150683_CO-7_AS-8_2.c',2,'Nhận xét giống bài trước',-1,'2020-01-12 03:46:34','2020-01-12 17:35:46'),('CO-7_AS-8','SE150683_CO-7_AS-8_3',37,23,'SE150683_CO-7_AS-8_3.c',3,'',1,'2020-01-13 09:09:25','2020-01-15 09:47:11'),('CO-7_AS-11','SE150713_CO-7_AS-11_1',36,NULL,'SE150713_CO-7_AS-11_1.c',1,NULL,0,'2020-01-17 10:36:34',NULL),('CO-7_AS-12','SE150713_CO-7_AS-12_1',36,NULL,'SE150713_CO-7_AS-12_1.c',1,NULL,0,'2020-01-17 10:36:49',NULL),('CO-7_AS-13','SE150713_CO-7_AS-13_1',36,NULL,'SE150713_CO-7_AS-13_1.c',1,NULL,0,'2020-01-17 10:45:58',NULL),('CO-7_AS-15','SE150713_CO-7_AS-15_1',36,NULL,'SE150713_CO-7_AS-15_1.c',1,NULL,0,'2020-01-17 10:37:02',NULL),('CO-7_AS-16','SE150713_CO-7_AS-16_1',36,NULL,'SE150713_CO-7_AS-16_1.c',1,NULL,0,'2020-01-17 10:38:35',NULL),('CO-7_AS-17','SE150713_CO-7_AS-17_1',36,NULL,'SE150713_CO-7_AS-17_1.c',1,NULL,0,'2020-01-17 10:39:39',NULL),('CO-7_AS-18','SE150713_CO-7_AS-18_1',36,NULL,'SE150713_CO-7_AS-18_1.c',1,NULL,0,'2020-01-17 10:39:55',NULL),('CO-7_AS-4','SE150713_CO-7_AS-4_1',36,2,'SE150713_CO-7_AS-4_1.c',1,'đọc kĩ đề.',-1,'2019-12-31 16:03:21','2020-01-01 02:32:07'),('CO-7_AS-4','SE150713_CO-7_AS-4_2',36,2,'SE150713_CO-7_AS-4_2.c',2,'',1,'2020-01-01 12:11:13','2020-01-02 03:34:38'),('CO-7_AS-5','SE150713_CO-7_AS-5_1',36,NULL,'SE150713_CO-7_AS-5_1.c',1,NULL,0,'2020-01-10 05:43:22',NULL),('CO-7_AS-5','SE150713_CO-7_AS-5_2',36,23,'SE150713_CO-7_AS-5_2.c',2,'',1,'2020-01-10 05:43:25','2020-01-11 08:22:08'),('CO-7_AS-6','SE150713_CO-7_AS-6_1',36,23,'SE150713_CO-7_AS-6_1.c',1,'Cộng trừ nhân chia cách nhau dấu cách',-1,'2020-01-10 05:55:05','2020-01-11 08:21:50'),('CO-7_AS-6','SE150713_CO-7_AS-6_2',36,23,'SE150713_CO-7_AS-6_2.c',2,'Thiếu trường hợp discount > 100',-1,'2020-01-12 17:06:24','2020-01-12 17:46:28'),('CO-7_AS-6','SE150713_CO-7_AS-6_3',36,23,'SE150713_CO-7_AS-6_3.c',3,'',1,'2020-01-13 07:23:27','2020-01-15 09:43:11'),('CO-7_AS-7','SE150713_CO-7_AS-7_1',36,23,'SE150713_CO-7_AS-7_1.c',1,'Length, width < 0 thì sao',-1,'2020-01-10 06:11:42','2020-01-11 08:21:15'),('CO-7_AS-7','SE150713_CO-7_AS-7_2',36,23,'SE150713_CO-7_AS-7_2.c',2,'',1,'2020-01-12 17:06:46','2020-01-12 17:45:42'),('CO-7_AS-8','SE150713_CO-7_AS-8_1',36,23,'SE150713_CO-7_AS-8_1.c',1,'',1,'2020-01-10 06:36:07','2020-01-10 19:22:25'),('CO-7_AS-9','SE150713_CO-7_AS-9_1',36,NULL,'SE150713_CO-7_AS-9_1.c',1,NULL,0,'2020-01-17 10:36:20',NULL),('CO-7_AS-11','SE150719_CO-7_AS-11_1',35,22,'SE150719_CO-7_AS-11_1.c',1,'Code chưa clean',-1,'2020-01-15 19:02:37','2020-01-19 12:26:39'),('CO-7_AS-11','SE150719_CO-7_AS-11_2',35,NULL,'SE150719_CO-7_AS-11_2.c',2,NULL,0,'2020-01-19 14:23:32',NULL),('CO-7_AS-12','SE150719_CO-7_AS-12_1',35,22,'SE150719_CO-7_AS-12_1.c',1,'',1,'2020-01-16 00:36:18','2020-01-19 12:50:46'),('CO-7_AS-13','SE150719_CO-7_AS-13_1',35,NULL,'SE150719_CO-7_AS-13_1.c',1,NULL,0,'2020-01-19 14:24:02',NULL),('CO-7_AS-15','SE150719_CO-7_AS-15_1',35,22,'SE150719_CO-7_AS-15_1.c',1,'Code chưa clean',-1,'2020-01-16 02:20:47','2020-01-20 06:43:24'),('CO-7_AS-16','SE150719_CO-7_AS-16_1',35,22,'SE150719_CO-7_AS-16_1.c',1,'thừa dấu ; sau }',-1,'2020-01-16 01:15:58','2020-01-19 12:52:13'),('CO-7_AS-16','SE150719_CO-7_AS-16_2',35,NULL,'SE150719_CO-7_AS-16_2.c',2,NULL,0,'2020-01-19 14:27:04',NULL),('CO-7_AS-17','SE150719_CO-7_AS-17_1',35,22,'SE150719_CO-7_AS-17_1.c',1,'thừa dấu ; sau }, dòng for chạy ít nhưng lại dùng long',-1,'2020-01-16 01:29:59',NULL),('CO-7_AS-17','SE150719_CO-7_AS-17_2',35,NULL,'SE150719_CO-7_AS-17_2.c',2,NULL,0,'2020-01-19 14:35:03',NULL),('CO-7_AS-18','SE150719_CO-7_AS-18_1',35,22,'SE150719_CO-7_AS-18_1.c',1,'Code chưa clean ( sau } có dấu ;)',-1,'2020-01-16 02:04:17','2020-01-20 06:34:10'),('CO-7_AS-18','SE150719_CO-7_AS-18_2',35,NULL,'SE150719_CO-7_AS-18_2.c',2,NULL,0,'2020-01-20 07:41:33',NULL),('CO-7_AS-19','SE150719_CO-7_AS-19_1',35,NULL,'SE150719_CO-7_AS-19_1.c',1,NULL,0,'2020-01-19 14:55:06',NULL),('CO-7_AS-4','SE150719_CO-7_AS-4_1',35,2,'SE150719_CO-7_AS-4_1.c',1,'',1,'2020-01-05 19:09:01','2020-01-07 10:23:41'),('CO-7_AS-5','SE150719_CO-7_AS-5_1',35,23,'SE150719_CO-7_AS-5_1.c',1,'Last chance about clean code',-1,'2020-01-09 16:11:51','2020-01-10 18:46:48'),('CO-7_AS-5','SE150719_CO-7_AS-5_2',35,23,'SE150719_CO-7_AS-5_2.c',2,'Sai yêu cầu đề bài',-1,'2020-01-12 17:29:21','2020-01-15 09:34:11'),('CO-7_AS-6','SE150719_CO-7_AS-6_1',35,23,'SE150719_CO-7_AS-6_1.c',1,'Sai quy tắc đặt tên biến',-3,'2020-01-09 18:06:37','2020-01-11 08:09:12'),('CO-7_AS-6','SE150719_CO-7_AS-6_2',35,23,'SE150719_CO-7_AS-6_2.c',2,'Nộp 2 lần trong 1 bài, giống bài trước',-3,'2020-01-09 18:06:39','2020-01-11 08:15:23'),('CO-7_AS-7','SE150719_CO-7_AS-7_1',35,23,'SE150719_CO-7_AS-7_1.c',1,'Not clean code ',-1,'2020-01-09 16:15:04','2020-01-10 19:06:26'),('CO-7_AS-7','SE150719_CO-7_AS-7_2',35,23,'SE150719_CO-7_AS-7_2.c',2,'Sai quy tắc đặt tên biến, clean code',-3,'2020-01-12 17:32:15','2020-01-15 09:35:50'),('CO-7_AS-8','SE150719_CO-7_AS-8_1',35,23,'SE150719_CO-7_AS-8_1.c',1,'Sai quy tắc đặt tên biến',-3,'2020-01-09 16:15:35','2020-01-11 08:08:59'),('CO-7_AS-9','SE150719_CO-7_AS-9_1',35,23,'SE150719_CO-7_AS-9_1.c',1,'Thiếu validation',-1,'2020-01-15 00:28:00','2020-01-17 05:53:02'),('CO-7_AS-9','SE150719_CO-7_AS-9_2',35,NULL,'SE150719_CO-7_AS-9_2.c',2,NULL,0,'2020-01-19 14:22:20',NULL),('CO-7_AS-11','SE150807_CO-7_AS-11_1',32,NULL,'SE150807_CO-7_AS-11_1.c',1,NULL,0,'2020-01-20 08:18:00',NULL),('CO-7_AS-12','SE150807_CO-7_AS-12_1',32,NULL,'SE150807_CO-7_AS-12_1.c',1,NULL,0,'2020-01-20 08:30:56',NULL),('CO-7_AS-13','SE150807_CO-7_AS-13_1',32,23,'SE150807_CO-7_AS-13_1.c',1,'Not clean code ',-1,'2020-01-14 12:54:26','2020-01-17 05:31:12'),('CO-7_AS-13','SE150807_CO-7_AS-13_2',32,NULL,'SE150807_CO-7_AS-13_2.c',2,NULL,0,'2020-01-19 08:48:39',NULL),('CO-7_AS-17','SE150807_CO-7_AS-17_1',32,23,'SE150807_CO-7_AS-17_1.c',1,'',1,'2020-01-15 01:37:05','2020-01-17 05:57:47'),('CO-7_AS-18','SE150807_CO-7_AS-18_1',32,23,'SE150807_CO-7_AS-18_1.c',1,'',1,'2020-01-15 01:27:22','2020-01-17 05:56:55'),('CO-7_AS-4','SE150807_CO-7_AS-4_1',32,2,'SE150807_CO-7_AS-4_1.c',1,'Not clean code',-1,'2020-01-04 13:35:45','2020-01-07 10:26:09'),('CO-7_AS-4','SE150807_CO-7_AS-4_2',32,23,'SE150807_CO-7_AS-4_2.c',2,'Not clean code ',-1,'2020-01-10 12:25:28','2020-01-10 18:31:54'),('CO-7_AS-4','SE150807_CO-7_AS-4_3',32,23,'SE150807_CO-7_AS-4_3.c',3,'',1,'2020-01-11 17:16:59','2020-01-12 17:29:58'),('CO-7_AS-5','SE150807_CO-7_AS-5_1',32,23,'SE150807_CO-7_AS-5_1.c',1,'Ghi rõ ràng nhập gì in gì',-1,'2020-01-10 16:26:15','2020-01-11 08:28:24'),('CO-7_AS-5','SE150807_CO-7_AS-5_2',32,23,'SE150807_CO-7_AS-5_2.c',2,'',1,'2020-01-11 17:28:58','2020-01-12 17:30:36'),('CO-7_AS-6','SE150807_CO-7_AS-6_1',32,23,'SE150807_CO-7_AS-6_1.c',1,'Ghi rõ ràng nhập gì in gì, clean code',-1,'2020-01-10 12:36:43','2020-01-11 08:46:09'),('CO-7_AS-6','SE150807_CO-7_AS-6_2',32,23,'SE150807_CO-7_AS-6_2.c',2,'Chưa validation, cái nào float thì khai báo float ko nhất thiết phải ép kiểu',-1,'2020-01-11 17:42:21','2020-01-12 17:31:04'),('CO-7_AS-6','SE150807_CO-7_AS-6_3',32,23,'SE150807_CO-7_AS-6_3.c',3,'chưa validate',-1,'2020-01-14 12:56:25','2020-01-17 05:31:27'),('CO-7_AS-6','SE150807_CO-7_AS-6_4',32,NULL,'SE150807_CO-7_AS-6_4.c',4,NULL,0,'2020-01-19 08:27:00',NULL),('CO-7_AS-7','SE150807_CO-7_AS-7_1',32,23,'SE150807_CO-7_AS-7_1.c',1,'chưa validate',-1,'2020-01-14 13:06:36','2020-01-17 05:31:42'),('CO-7_AS-7','SE150807_CO-7_AS-7_2',32,NULL,'SE150807_CO-7_AS-7_2.c',2,NULL,0,'2020-01-19 08:43:03',NULL),('CO-7_AS-8','SE150807_CO-7_AS-8_1',32,23,'SE150807_CO-7_AS-8_1.c',1,'Not clean code ',-1,'2020-01-10 16:42:24','2020-01-11 08:45:30'),('CO-7_AS-8','SE150807_CO-7_AS-8_2',32,23,'SE150807_CO-7_AS-8_2.c',2,'Nộp 2 lần trong 1 bài, giống bài trước',-1,'2020-01-10 16:42:25','2020-01-11 08:45:19'),('CO-7_AS-8','SE150807_CO-7_AS-8_3',32,23,'SE150807_CO-7_AS-8_3.c',3,'',1,'2020-01-11 17:19:49','2020-01-12 17:30:15'),('CO-7_AS-9','SE150807_CO-7_AS-9_1',32,23,'SE150807_CO-7_AS-9_1.c',1,'chưa validate',-1,'2020-01-14 13:37:50','2020-01-17 05:32:07'),('CO-7_AS-9','SE150807_CO-7_AS-9_2',32,NULL,'SE150807_CO-7_AS-9_2.c',2,NULL,0,'2020-01-19 08:36:00',NULL),('CO-7_AS-4','SE150819_CO-7_AS-4_1',40,19,'SE150819_CO-7_AS-4_1.c',1,'',1,'2020-01-03 04:04:14','2020-01-03 07:56:38'),('CO-7_AS-11','SE150854_CO-7_AS-11_1',48,22,'SE150854_CO-7_AS-11_1.c',1,'',1,'2020-01-17 03:44:57','2020-01-20 07:59:58'),('CO-7_AS-12','SE150854_CO-7_AS-12_1',48,22,'SE150854_CO-7_AS-12_1.c',1,'sai ĐK',-1,'2020-01-17 04:03:41','2020-01-20 08:21:02'),('CO-7_AS-13','SE150854_CO-7_AS-13_1',48,22,'SE150854_CO-7_AS-13_1.c',1,'',1,'2020-01-17 03:54:34','2020-01-20 08:01:50'),('CO-7_AS-15','SE150854_CO-7_AS-15_1',48,NULL,'SE150854_CO-7_AS-15_1.c',1,NULL,0,'2020-01-19 10:26:56',NULL),('CO-7_AS-15','SE150854_CO-7_AS-15_2',48,NULL,'SE150854_CO-7_AS-15_2.c',2,NULL,0,'2020-01-19 10:26:59',NULL),('CO-7_AS-15','SE150854_CO-7_AS-15_3',48,NULL,'SE150854_CO-7_AS-15_3.c',3,NULL,0,'2020-01-19 10:27:09',NULL),('CO-7_AS-16','SE150854_CO-7_AS-16_1',48,22,'SE150854_CO-7_AS-16_1.c',1,'sai ĐK',-1,'2020-01-17 04:00:18','2020-01-20 08:12:55'),('CO-7_AS-17','SE150854_CO-7_AS-17_1',48,22,'SE150854_CO-7_AS-17_1.c',1,'',1,'2020-01-17 04:02:46','2020-01-20 08:18:48'),('CO-7_AS-18','SE150854_CO-7_AS-18_1',48,NULL,'SE150854_CO-7_AS-18_1.c',1,NULL,0,'2020-01-19 10:34:26',NULL),('CO-7_AS-4','SE150854_CO-7_AS-4_1',48,2,'SE150854_CO-7_AS-4_1.c',1,'',1,'2020-01-02 02:40:14','2020-01-02 03:37:07'),('CO-7_AS-5','SE150854_CO-7_AS-5_1',48,23,'SE150854_CO-7_AS-5_1.c',1,'',1,'2020-01-12 04:31:07','2020-01-12 17:36:03'),('CO-7_AS-6','SE150854_CO-7_AS-6_1',48,23,'SE150854_CO-7_AS-6_1.c',1,'',1,'2020-01-12 04:33:21','2020-01-12 17:38:05'),('CO-7_AS-7','SE150854_CO-7_AS-7_1',48,23,'SE150854_CO-7_AS-7_1.c',1,'',1,'2020-01-12 04:34:36','2020-01-12 17:39:23'),('CO-7_AS-8','SE150854_CO-7_AS-8_1',48,23,'SE150854_CO-7_AS-8_1.c',1,'',1,'2020-01-12 04:36:28','2020-01-12 17:40:47'),('CO-7_AS-17','SE150905_CO-7_AS-17_1',52,23,'SE150905_CO-7_AS-17_1.c',1,'Sai kết quả',-1,'2020-01-14 12:16:07','2020-01-17 05:29:37'),('CO-7_AS-4','SE150905_CO-7_AS-4_1',52,2,'SE150905_CO-7_AS-4_1.c',1,'đọc kĩ đề.',-1,'2020-01-01 08:58:57','2020-01-02 03:24:08'),('CO-7_AS-4','SE150905_CO-7_AS-4_2',52,2,'SE150905_CO-7_AS-4_2.c',2,'',1,'2020-01-02 01:37:32','2020-01-02 03:36:37'),('CO-7_AS-5','SE150905_CO-7_AS-5_1',52,23,'SE150905_CO-7_AS-5_1.c',1,'',1,'2020-01-09 03:49:24','2020-01-10 18:42:34'),('CO-7_AS-6','SE150905_CO-7_AS-6_1',52,23,'SE150905_CO-7_AS-6_1.c',1,'',-1,'2020-01-09 03:50:04','2020-01-10 18:53:59'),('CO-7_AS-6','SE150905_CO-7_AS-6_2',52,23,'SE150905_CO-7_AS-6_2.c',2,'',1,'2020-01-11 04:13:03','2020-01-11 08:36:15'),('CO-7_AS-7','SE150905_CO-7_AS-7_1',52,23,'SE150905_CO-7_AS-7_1.c',1,'',-1,'2020-01-09 03:48:37','2020-01-10 19:04:45'),('CO-7_AS-7','SE150905_CO-7_AS-7_2',52,23,'SE150905_CO-7_AS-7_2.c',2,'',1,'2020-01-11 04:13:50','2020-01-11 08:40:30'),('CO-7_AS-8','SE150905_CO-7_AS-8_1',52,23,'SE150905_CO-7_AS-8_1.c',1,'',-1,'2020-01-09 03:46:06','2020-01-10 19:08:27'),('CO-7_AS-8','SE150905_CO-7_AS-8_2',52,NULL,'SE150905_CO-7_AS-8_2.c',2,NULL,NULL,NULL,NULL),('CO-7_AS-4','SE150907_CO-7_AS-4_1',47,23,'SE150907_CO-7_AS-4_1.c',1,'In bị lỗi',-1,'2020-01-14 02:57:10','2020-01-17 05:13:28'),('CO-7_AS-5','SE150907_CO-7_AS-5_1',47,NULL,'SE150907_CO-7_AS-5_1.c',1,NULL,0,'2020-01-14 03:25:13',NULL),('CO-7_AS-5','SE150907_CO-7_AS-5_2',47,23,'SE150907_CO-7_AS-5_2.c',2,'Sai yêu cầu đề bài',-1,'2020-01-14 03:27:01','2020-01-17 05:13:44'),('CO-7_AS-6','SE150907_CO-7_AS-6_1',47,23,'SE150907_CO-7_AS-6_1.c',1,'Sai yêu cầu đề bài',-1,'2020-01-14 05:20:46','2020-01-17 05:21:11'),('CO-7_AS-6','SE150907_CO-7_AS-6_2',47,NULL,'SE150907_CO-7_AS-6_2.c',2,NULL,NULL,NULL,NULL),('CO-7_AS-8','SE150907_CO-7_AS-8_1',47,23,'SE150907_CO-7_AS-8_1.c',1,'Nếu ngày nhập < 0 thì sao, chưa clean code',-1,'2020-01-14 05:47:02','2020-01-17 05:23:44'),('CO-7_AS-8','SE150907_CO-7_AS-8_2',47,23,'SE150907_CO-7_AS-8_2.c',2,'Nếu ngày nhập < 0 thì sao, chưa clean code',-1,'2020-01-14 05:48:51','2020-01-17 05:26:04'),('CO-7_AS-9','SE150907_CO-7_AS-9_1',47,23,'SE150907_CO-7_AS-9_1.c',1,'Sai điều kiện',-1,'2020-01-14 03:43:34','2020-01-17 05:17:17'),('CO-7_AS-9','SE150907_CO-7_AS-9_2',47,23,'SE150907_CO-7_AS-9_2.c',2,'Sai điều kiện',-1,'2020-01-14 03:43:36','2020-01-17 05:18:04'),('CO-7_AS-9','SE150907_CO-7_AS-9_3',47,NULL,'SE150907_CO-7_AS-9_3.c',3,NULL,NULL,NULL,NULL),('CO-7_AS-12','Se151023_CO-7_AS-12_1',46,22,'Se151023_CO-7_AS-12_1.c',1,'Code chưa clean',-3,'2020-01-17 03:28:49','2020-01-20 07:47:07'),('CO-7_AS-13','Se151023_CO-7_AS-13_1',46,22,'Se151023_CO-7_AS-13_1.c',1,'',-3,'2020-01-17 03:27:08','2020-01-20 07:46:40'),('CO-7_AS-15','Se151023_CO-7_AS-15_1',46,22,'Se151023_CO-7_AS-15_1.c',1,'Code chưa clean',-3,'2020-01-16 13:56:55','2020-01-20 07:44:47'),('CO-7_AS-16','Se151023_CO-7_AS-16_1',46,22,'Se151023_CO-7_AS-16_1.c',1,'Code chưa clean',-3,'2020-01-16 14:38:46','2020-01-20 07:44:54'),('CO-7_AS-17','Se151023_CO-7_AS-17_1',46,22,'Se151023_CO-7_AS-17_1.c',1,'Code chưa clean',-3,'2020-01-16 15:00:58','2020-01-20 07:46:07'),('CO-7_AS-18','Se151023_CO-7_AS-18_1',46,23,'Se151023_CO-7_AS-18_1.c',1,'Not clean code ',-3,'2020-01-14 16:33:32','2020-01-17 05:43:20'),('CO-7_AS-18','Se151023_CO-7_AS-18_2',46,23,'Se151023_CO-7_AS-18_2.c',2,'Not clean code ',-3,'2020-01-15 01:40:14','2020-01-17 05:59:32'),('CO-7_AS-19','Se151023_CO-7_AS-19_1',46,NULL,'Se151023_CO-7_AS-19_1.c',1,NULL,0,'2020-01-19 02:48:02',NULL),('CO-7_AS-19','Se151023_CO-7_AS-19_2',46,NULL,'Se151023_CO-7_AS-19_2.c',2,NULL,0,'2020-01-19 02:59:49',NULL),('CO-7_AS-4','Se151023_CO-7_AS-4_1',46,22,'Se151023_CO-7_AS-4_1.c',1,'',1,'2020-01-08 11:10:20','2020-01-09 14:38:50'),('CO-7_AS-5','Se151023_CO-7_AS-5_1',46,22,'Se151023_CO-7_AS-5_1.c',1,'đọc kỹ lại yêu cầu đề',-1,'2020-01-16 13:24:16','2020-01-20 07:39:01'),('CO-7_AS-6','Se151023_CO-7_AS-6_1',46,23,'Se151023_CO-7_AS-6_1.c',1,'',-1,'2020-01-09 03:25:09','2020-01-10 18:56:35'),('CO-7_AS-6','Se151023_CO-7_AS-6_2',46,23,'Se151023_CO-7_AS-6_2.c',2,'',-1,'2020-01-09 03:25:11','2020-01-10 18:50:03'),('CO-7_AS-6','Se151023_CO-7_AS-6_3',46,22,'Se151023_CO-7_AS-6_3.c',3,'Code chưa clean',-3,'2020-01-17 03:17:13','2020-01-20 07:46:26'),('CO-7_AS-7','Se151023_CO-7_AS-7_1',46,23,'Se151023_CO-7_AS-7_1.c',1,'Thiếu validation',-1,'2020-01-15 03:11:36','2020-01-17 05:59:41'),('CO-7_AS-7','Se151023_CO-7_AS-7_2',46,NULL,'Se151023_CO-7_AS-7_2.c',2,NULL,0,'2020-01-19 02:53:01',NULL),('CO-7_AS-8','Se151023_CO-7_AS-8_1',46,NULL,'Se151023_CO-7_AS-8_1.c',1,NULL,0,'2020-01-13 15:49:57',NULL),('CO-7_AS-8','Se151023_CO-7_AS-8_2',46,23,'Se151023_CO-7_AS-8_2.c',2,'Nếu ngày nhập < 0 thì sao',-1,'2020-01-13 15:54:53','2020-01-15 09:47:27'),('CO-7_AS-8','Se151023_CO-7_AS-8_3',46,22,'Se151023_CO-7_AS-8_3.c',3,'Code chưa clean',-1,'2020-01-16 11:06:50','2020-01-20 07:24:06'),('CO-7_AS-9','Se151023_CO-7_AS-9_1',46,22,'Se151023_CO-7_AS-9_1.c',1,'Code chưa clean',-3,'2020-01-17 03:31:55','2020-01-20 07:47:55'),('CO-7_AS-11','SE151082_CO-7_AS-11_1',55,23,'SE151082_CO-7_AS-11_1.c',1,'',1,'2020-01-15 08:57:45','2020-01-17 07:02:56'),('CO-7_AS-12','SE151082_CO-7_AS-12_1',55,22,'SE151082_CO-7_AS-12_1.c',1,'Code chưa clean',-1,'2020-01-16 07:14:30','2020-01-20 06:55:27'),('CO-7_AS-13','SE151082_CO-7_AS-13_1',55,22,'SE151082_CO-7_AS-13_1.c',1,'In sai, chưa clean code',-1,'2020-01-16 07:48:29','2020-01-20 13:07:07'),('CO-7_AS-15','SE151082_CO-7_AS-15_1',55,22,'SE151082_CO-7_AS-15_1.c',1,'Code chưa clean',-1,'2020-01-16 09:40:04','2020-01-20 07:02:21'),('CO-7_AS-16','SE151082_CO-7_AS-16_1',55,22,'SE151082_CO-7_AS-16_1.c',1,'Code chưa clean',1,'2020-01-16 10:05:44','2020-01-20 13:10:49'),('CO-7_AS-17','SE151082_CO-7_AS-17_1',55,22,'SE151082_CO-7_AS-17_1.c',1,'Code chưa clean',1,'2020-01-16 10:12:52','2020-01-20 13:11:28'),('CO-7_AS-18','SE151082_CO-7_AS-18_1',55,NULL,'SE151082_CO-7_AS-18_1.c',1,NULL,0,'2020-01-17 07:13:49',NULL),('CO-7_AS-4','SE151082_CO-7_AS-4_1',55,2,'SE151082_CO-7_AS-4_1.c',1,'Not clean code',-1,'2020-01-03 17:02:40','2020-01-07 10:30:59'),('CO-7_AS-4','SE151082_CO-7_AS-4_2',55,22,'SE151082_CO-7_AS-4_2.c',2,'Not clean code',-1,'2020-01-08 16:05:10','2020-01-09 16:29:41'),('CO-7_AS-4','SE151082_CO-7_AS-4_3',55,23,'SE151082_CO-7_AS-4_3.c',3,'',1,'2020-01-09 16:30:10','2020-01-10 18:39:08'),('CO-7_AS-5','SE151082_CO-7_AS-5_1',55,23,'SE151082_CO-7_AS-5_1.c',1,'',1,'2020-01-09 07:36:26','2020-01-10 18:44:35'),('CO-7_AS-6','SE151082_CO-7_AS-6_1',55,23,'SE151082_CO-7_AS-6_1.c',1,'',-1,'2020-01-09 08:37:39','2020-01-10 18:58:16'),('CO-7_AS-6','SE151082_CO-7_AS-6_2',55,23,'SE151082_CO-7_AS-6_2.c',2,'',1,'2020-01-12 17:42:24','2020-01-15 09:36:11'),('CO-7_AS-7','SE151082_CO-7_AS-7_1',55,23,'SE151082_CO-7_AS-7_1.c',1,'',-1,'2020-01-09 08:49:31','2020-01-10 19:06:55'),('CO-7_AS-7','SE151082_CO-7_AS-7_2',55,23,'SE151082_CO-7_AS-7_2.c',2,'',1,'2020-01-12 17:32:06','2020-01-15 09:35:13'),('CO-7_AS-8','SE151082_CO-7_AS-8_1',55,23,'SE151082_CO-7_AS-8_1.c',1,'Not clean code ',-1,'2020-01-09 09:23:19','2020-01-10 19:15:30'),('CO-7_AS-8','SE151082_CO-7_AS-8_2',55,23,'SE151082_CO-7_AS-8_2.c',2,'Kiểu int là đủ rồi',1,'2020-01-12 16:46:34','2020-01-12 17:47:11'),('CO-7_AS-9','SE151082_CO-7_AS-9_1',55,NULL,'SE151082_CO-7_AS-9_1.c',1,NULL,0,'2020-01-15 07:12:50',NULL),('CO-7_AS-9','SE151082_CO-7_AS-9_2',55,2,'SE151082_CO-7_AS-9_2.c',2,'chú ý cách sử dụng Tab',1,'2020-01-15 07:12:53','2020-01-19 01:38:30'),('CO-7_AS-9','SE151082_CO-7_AS-9_3',55,NULL,'SE151082_CO-7_AS-9_3.c',3,NULL,NULL,NULL,NULL),('CO-7_AS-4','SE151087_CO-7_AS-4_1',53,23,'SE151087_CO-7_AS-4_1.c',1,'',1,'2020-01-09 09:57:14','2020-01-10 18:37:20'),('CO-7_AS-5','SE151087_CO-7_AS-5_1',53,23,'SE151087_CO-7_AS-5_1.c',1,'Last chance about clean code',-1,'2020-01-09 07:33:55','2020-01-10 18:44:01'),('CO-7_AS-5','SE151087_CO-7_AS-5_2',53,23,'SE151087_CO-7_AS-5_2.c',2,'Sai yêu cầu đề bài',-1,'2020-01-15 16:42:42','2020-01-17 07:09:25'),('CO-7_AS-6','SE151087_CO-7_AS-6_1',53,23,'SE151087_CO-7_AS-6_1.c',1,'Clean code!!!!',-1,'2020-01-09 08:14:20','2020-01-10 18:57:55'),('CO-7_AS-6','SE151087_CO-7_AS-6_2',53,23,'SE151087_CO-7_AS-6_2.c',2,'chưa cẩn thận clean code',-1,'2020-01-15 16:05:56','2020-01-17 07:08:57'),('CO-7_AS-7','SE151087_CO-7_AS-7_1',53,23,'SE151087_CO-7_AS-7_1.c',1,'Not clean code ',0,'2020-01-09 08:28:21',NULL),('CO-7_AS-7','SE151087_CO-7_AS-7_2',53,23,'SE151087_CO-7_AS-7_2.c',2,'Not clean code ',-1,'2020-01-09 08:28:24','2020-01-10 19:07:14'),('CO-7_AS-7','SE151087_CO-7_AS-7_3',53,23,'SE151087_CO-7_AS-7_3.c',3,'Not clean code ',-3,'2020-01-15 15:55:20','2020-01-17 07:08:05'),('CO-7_AS-8','SE151087_CO-7_AS-8_1',53,23,'SE151087_CO-7_AS-8_1.c',1,'Validate day',-1,'2020-01-09 08:40:43','2020-01-10 19:16:25'),('CO-7_AS-8','SE151087_CO-7_AS-8_2',53,23,'SE151087_CO-7_AS-8_2.c',2,'Not clean code ',-3,'2020-01-15 15:37:45','2020-01-17 07:07:53'),('CO-7_AS-9','SE151087_CO-7_AS-9_1',53,23,'SE151087_CO-7_AS-9_1.c',1,'Thiếu validation',-1,'2020-01-15 16:33:40','2020-01-17 07:09:11'),('CO-7_AS-12','SE151180_CO-7_AS-12_1',34,23,'SE151180_CO-7_AS-12_1.c',1,'Không được khai báo biến toàn cục, đặt tên biến theo camel case',-1,'2020-01-14 18:23:12','2020-01-17 05:49:18'),('CO-7_AS-12','SE151180_CO-7_AS-12_2',34,NULL,'SE151180_CO-7_AS-12_2.c',2,NULL,0,'2020-01-14 18:23:14',NULL),('CO-7_AS-13','SE151180_CO-7_AS-13_1',34,23,'SE151180_CO-7_AS-13_1.c',1,'Không được khai báo biến toàn cục',-1,'2020-01-14 17:17:21','2020-01-17 05:46:24'),('CO-7_AS-13','SE151180_CO-7_AS-13_2',34,23,'SE151180_CO-7_AS-13_2.c',2,'Không được khai báo biến toàn cục',-1,'2020-01-14 17:17:23','2020-01-17 05:46:33'),('CO-7_AS-13','SE151180_CO-7_AS-13_3',34,23,'SE151180_CO-7_AS-13_3.c',3,'Không được khai báo biến toàn cục',-1,'2020-01-14 17:17:25','2020-01-17 05:46:40'),('CO-7_AS-15','SE151180_CO-7_AS-15_1',34,23,'SE151180_CO-7_AS-15_1.c',1,'Không được khai báo biến toàn cục',-1,'2020-01-14 17:11:21','2020-01-17 05:46:07'),('CO-7_AS-16','SE151180_CO-7_AS-16_1',34,23,'SE151180_CO-7_AS-16_1.c',1,'Không được khai báo biến toàn cục',-1,'2020-01-14 16:58:47','2020-01-17 05:46:13'),('CO-7_AS-17','SE151180_CO-7_AS-17_1',34,23,'SE151180_CO-7_AS-17_1.c',1,'Không được khai báo biến toàn cục',-1,'2020-01-14 16:36:28','2020-01-17 05:45:53'),('CO-7_AS-17','SE151180_CO-7_AS-17_2',34,NULL,'SE151180_CO-7_AS-17_2.c',2,NULL,0,'2020-01-17 07:42:40',NULL),('CO-7_AS-18','SE151180_CO-7_AS-18_1',34,23,'SE151180_CO-7_AS-18_1.c',1,'Sai yêu cầu đề bài',-1,'2020-01-14 16:09:09','2020-01-17 05:42:23'),('CO-7_AS-18','SE151180_CO-7_AS-18_2',34,NULL,'SE151180_CO-7_AS-18_2.c',2,NULL,0,'2020-01-17 07:36:42',NULL),('CO-7_AS-4','SE151180_CO-7_AS-4_1',34,2,'SE151180_CO-7_AS-4_1.c',1,'Not put enough efforts.',-1,'2020-01-06 09:40:07','2020-01-07 10:22:36'),('CO-7_AS-6','SE151180_CO-7_AS-6_1',34,23,'SE151180_CO-7_AS-6_1.c',1,'Not clean code ',-3,'2020-01-09 06:15:13','2020-01-11 07:41:03'),('CO-7_AS-6','SE151180_CO-7_AS-6_2',34,23,'SE151180_CO-7_AS-6_2.c',2,'Not clean code ',-3,'2020-01-11 03:25:56','2020-01-11 08:29:05'),('CO-7_AS-7','SE151180_CO-7_AS-7_1',34,23,'SE151180_CO-7_AS-7_1.c',1,'Not clean code ',-3,'2020-01-09 06:20:59','2020-01-11 07:41:08'),('CO-7_AS-8','SE151180_CO-7_AS-8_1',34,23,'SE151180_CO-7_AS-8_1.c',1,'Not clean code ',-3,'2020-01-09 06:26:22','2020-01-11 07:41:24'),('CO-7_AS-8','SE151180_CO-7_AS-8_2',34,NULL,'SE151180_CO-7_AS-8_2.c',2,NULL,NULL,NULL,NULL),('CO-7_AS-11','SE151336_CO-7_AS-11_1',42,23,'SE151336_CO-7_AS-11_1.c',1,'Not clean code ',-3,'2020-01-15 07:59:29','2020-01-17 06:30:17'),('CO-7_AS-12','SE151336_CO-7_AS-12_1',42,23,'SE151336_CO-7_AS-12_1.c',1,'Not clean code ',-3,'2020-01-15 07:59:46','2020-01-17 06:39:56'),('CO-7_AS-13','SE151336_CO-7_AS-13_1',42,23,'SE151336_CO-7_AS-13_1.c',1,'Not clean code ',-3,'2020-01-15 08:00:01','2020-01-17 06:39:54'),('CO-7_AS-16','SE151336_CO-7_AS-16_1',42,23,'SE151336_CO-7_AS-16_1.c',1,'Not clean code ',-3,'2020-01-15 08:00:18','2020-01-17 06:40:08'),('CO-7_AS-17','SE151336_CO-7_AS-17_1',42,23,'SE151336_CO-7_AS-17_1.c',1,'Not clean code ',-3,'2020-01-15 08:00:40','2020-01-17 06:40:16'),('CO-7_AS-18','SE151336_CO-7_AS-18_1',42,23,'SE151336_CO-7_AS-18_1.c',1,'Not clean code ',-3,'2020-01-15 08:00:56','2020-01-17 06:40:25'),('CO-7_AS-4','SE151336_CO-7_AS-4_1',42,2,'SE151336_CO-7_AS-4_1.c',1,'được đấy :vv',1,'2020-01-03 14:25:17','2020-01-07 09:54:44'),('CO-7_AS-5','SE151336_CO-7_AS-5_1',42,23,'SE151336_CO-7_AS-5_1.c',1,'Not clean code ',-3,'2020-01-15 07:58:36','2020-01-17 06:29:47'),('CO-7_AS-6','SE151336_CO-7_AS-6_1',42,23,'SE151336_CO-7_AS-6_1.c',1,'Not clean code ',-3,'2020-01-15 07:58:59','2020-01-17 06:29:57'),('CO-7_AS-7','SE151336_CO-7_AS-7_1',42,NULL,'SE151336_CO-7_AS-7_1.c',1,NULL,0,'2020-01-15 07:57:11',NULL),('CO-7_AS-7','SE151336_CO-7_AS-7_2',42,23,'SE151336_CO-7_AS-7_2.c',2,'Not clean code , chưa validate',-3,'2020-01-15 07:57:15','2020-01-17 06:29:22'),('CO-7_AS-8','SE151336_CO-7_AS-8_1',42,23,'SE151336_CO-7_AS-8_1.c',1,'Not clean code ',-3,'2020-01-15 07:59:13','2020-01-17 06:30:07'),('CO-7_AS-9','SE151336_CO-7_AS-9_1',42,23,'SE151336_CO-7_AS-9_1.c',1,'Not clean code ',-3,'2020-01-15 07:57:24','2020-01-17 06:29:36'),('CO-7_AS-11','SE151340_CO-7_AS-11_1',44,23,'SE151340_CO-7_AS-11_1.c',1,'Khi nhập sai yêu cầu không in ra \"Wrong input\"',-1,'2020-01-13 19:07:59','2020-01-16 18:17:14'),('CO-7_AS-11','SE151340_CO-7_AS-11_2',44,NULL,'SE151340_CO-7_AS-11_2.c',2,NULL,0,'2020-01-18 06:54:08',NULL),('CO-7_AS-12','SE151340_CO-7_AS-12_1',44,23,'SE151340_CO-7_AS-12_1.c',1,'In sai',-1,'2020-01-13 19:08:19','2020-01-16 18:18:57'),('CO-7_AS-12','SE151340_CO-7_AS-12_2',44,NULL,'SE151340_CO-7_AS-12_2.c',2,NULL,0,'2020-01-18 16:58:05',NULL),('CO-7_AS-13','SE151340_CO-7_AS-13_1',44,23,'SE151340_CO-7_AS-13_1.c',1,'',1,'2020-01-13 19:08:32','2020-01-16 18:22:22'),('CO-7_AS-15','SE151340_CO-7_AS-15_1',44,23,'SE151340_CO-7_AS-15_1.c',1,'Cách làm quá phức tạp nên suy nghĩ cách đơn giản hơn',1,'2020-01-13 19:08:45','2020-01-17 05:10:18'),('CO-7_AS-16','SE151340_CO-7_AS-16_1',44,23,'SE151340_CO-7_AS-16_1.c',1,'',1,'2020-01-13 19:08:58','2020-01-17 04:59:20'),('CO-7_AS-17','SE151340_CO-7_AS-17_1',44,23,'SE151340_CO-7_AS-17_1.c',1,'',1,'2020-01-13 19:09:10','2020-01-17 05:01:36'),('CO-7_AS-18','SE151340_CO-7_AS-18_1',44,23,'SE151340_CO-7_AS-18_1.c',1,'',1,'2020-01-13 19:09:25','2020-01-17 05:04:38'),('CO-7_AS-19','SE151340_CO-7_AS-19_1',44,NULL,'SE151340_CO-7_AS-19_1.c',1,NULL,0,'2020-01-19 11:38:28',NULL),('CO-7_AS-4','SE151340_CO-7_AS-4_1',44,2,'SE151340_CO-7_AS-4_1.c',1,'Not clean code',-1,'2020-01-04 07:42:15','2020-01-07 10:29:08'),('CO-7_AS-4','SE151340_CO-7_AS-4_2',44,22,'SE151340_CO-7_AS-4_2.c',2,'',1,'2020-01-08 05:11:06','2020-01-09 14:33:50'),('CO-7_AS-5','SE151340_CO-7_AS-5_1',44,23,'SE151340_CO-7_AS-5_1.c',1,'',1,'2020-01-09 18:07:24','2020-01-10 18:56:06'),('CO-7_AS-6','SE151340_CO-7_AS-6_1',44,23,'SE151340_CO-7_AS-6_1.c',1,'Sai quy tắc đặt tên biến',-1,'2020-01-09 18:07:42','2020-01-11 08:49:58'),('CO-7_AS-6','SE151340_CO-7_AS-6_2',44,23,'SE151340_CO-7_AS-6_2.c',2,'Xem kĩ lại kiểu dữ liệu các biến',-1,'2020-01-11 14:01:01','2020-01-12 16:56:39'),('CO-7_AS-6','SE151340_CO-7_AS-6_3',44,23,'SE151340_CO-7_AS-6_3.c',3,'Nộp 2 lần trong 1 bài, đã nhận xét lần nộp trước',-1,'2020-01-11 14:18:26','2020-01-12 17:00:26'),('CO-7_AS-6','SE151340_CO-7_AS-6_4',44,23,'SE151340_CO-7_AS-6_4.c',4,'',1,'2020-01-13 19:07:25','2020-01-16 18:04:56'),('CO-7_AS-7','SE151340_CO-7_AS-7_1',44,23,'SE151340_CO-7_AS-7_1.c',1,'Sai quy tắc đặt tên biến',-1,'2020-01-09 18:08:32','2020-01-11 08:50:09'),('CO-7_AS-7','SE151340_CO-7_AS-7_2',44,23,'SE151340_CO-7_AS-7_2.c',2,'',1,'2020-01-11 14:18:39','2020-01-12 17:00:48'),('CO-7_AS-8','SE151340_CO-7_AS-8_1',44,23,'SE151340_CO-7_AS-8_1.c',1,'Sai quy tắc đặt tên biến',-1,'2020-01-09 18:08:43','2020-01-11 08:50:04'),('CO-7_AS-8','SE151340_CO-7_AS-8_2',44,23,'SE151340_CO-7_AS-8_2.c',2,'',1,'2020-01-11 14:18:54','2020-01-12 17:01:19'),('CO-7_AS-9','SE151340_CO-7_AS-9_1',44,23,'SE151340_CO-7_AS-9_1.c',1,'',1,'2020-01-13 19:07:42','2020-01-16 18:09:28'),('CO-7_AS-4','SE151396_CO-7_AS-4_1',54,2,'SE151396_CO-7_AS-4_1.c',1,'Not clean code.',-1,'2020-01-06 16:37:44','2020-01-07 10:21:30'),('CO-7_AS-4','SE151396_CO-7_AS-4_2',54,23,'SE151396_CO-7_AS-4_2.c',2,'',1,'2020-01-12 13:41:21','2020-01-12 17:44:55'),('CO-7_AS-5','SE151396_CO-7_AS-5_1',54,23,'SE151396_CO-7_AS-5_1.c',1,'',1,'2020-01-12 15:00:41','2020-01-12 17:45:06');
/*!40000 ALTER TABLE `fc_work` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `fc_work_BEFORE_INSERT` BEFORE INSERT ON `fc_work` FOR EACH ROW BEGIN
SET NEW.wo_submit_time := NOW();
SET NEW.wo_status := 0;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,NO_AUTO_VALUE_ON_ZERO,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `judgeWork` BEFORE UPDATE ON `fc_work` FOR EACH ROW BEGIN
    IF OLD.wo_status  != NEW.wo_status THEN
        SET NEW.wo_judge_time := NOW();
    END IF;
END */;;
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

-- Dump completed on 2020-01-20 20:49:27
