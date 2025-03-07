-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: shipsass
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_requests`
--

DROP TABLE IF EXISTS `api_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `user_app_id` int NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `request_payload` text,
  `response_payload` text,
  `status_code` int DEFAULT NULL,
  `requested_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`request_id`),
  KEY `user_app_id` (`user_app_id`),
  CONSTRAINT `api_requests_ibfk_1` FOREIGN KEY (`user_app_id`) REFERENCES `user_applications` (`user_app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_requests`
--

LOCK TABLES `api_requests` WRITE;
/*!40000 ALTER TABLE `api_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `app_id` int NOT NULL AUTO_INCREMENT,
  `app_name` varchar(255) NOT NULL,
  `base_api_url` varchar(255) NOT NULL,
  `auth_type` enum('OAuth2','API_Key','Other') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'google_drive','http://localhost:3000/','OAuth2','2025-03-03 08:49:01');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_password`
--

DROP TABLE IF EXISTS `reset_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_password` (
  `user_id` varchar(50) DEFAULT NULL,
  `token_expiry` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reset_token` varchar(150) NOT NULL,
  `consume` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`reset_token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password`
--

LOCK TABLES `reset_password` WRITE;
/*!40000 ALTER TABLE `reset_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_applications`
--

DROP TABLE IF EXISTS `user_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_applications` (
  `user_app_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `app_id` int NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `token_expiry` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_app_id`),
  KEY `app_id` (`app_id`),
  CONSTRAINT `user_applications_ibfk_1` FOREIGN KEY (`app_id`) REFERENCES `applications` (`app_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_applications`
--

LOCK TABLES `user_applications` WRITE;
/*!40000 ALTER TABLE `user_applications` DISABLE KEYS */;
INSERT INTO `user_applications` VALUES (1,'67c963fff8290e692c4805aa',1,'ya29.a0AeXRPp40LgVJ2jCL1FknC9Ky48jd2OgxnjphW0-5rU5rTh-DjoOapjPRUfmEpGOAUSLsx3XklsXJVBleG9zJ0GrnEfC64c-522hqjxOUVmVWSZPJS-WSXuwPFhArtYVw1BXbHSU-qk8PwNn66P_X4OyKfoUaO_2KgO79VfavOAaCgYKARISARMSFQHGX2MiH4Jf4Zw6cGqVF7WufYwMkg0177','1//09c1VzR3HPpwsCgYIARAAGAkSNwF-L9Irw83xF01tEEC304ZUJAh7_UPaJ-SGRyG2esQ6xa3AgePZYBPn4lomDsvGH7n--YKmCys',3599,'2025-03-07 20:10:33'),(2,'123',1,'ya29.a0AeXRPp7VDP7Dp1KALzl8-TDaKfC3xrXDD7Iqc7x6uCEN0RNFZXrxgv5IsYXUYyMOcIpSsFO6jDCMwsiExsRazCIoExqqkbxYmXMVfIJlclp76imp4um8SNIcfmkB2AIlP49xbpGVkYnMT2MgnC3BPz4UI5nIpVh4DVqBkcr8aCgYKAWoSARMSFQHGX2MiGTF6934Y7WVwnpA-TP5JFg0175','1//03g2G2DaycvPlCgYIARAAGAMSNwF-L9IrOFrYEUGGjHfGqut9g-iGr753RD6hs8F_hCFvTzCPSUPnUf7CwWRrXmh3RyPB1fe8bCo',3599,'2025-03-07 05:43:14'),(15,'123',1,'ya29.a0AeXRPp46l2_ImoJP2ofEOBfi8i3p_LA0Lxm0URjZ9lvygMiJob6T_Hp2JsiSSxqXJtmrnrdUQwZUQIlBbDo9R5qRWQ9sGkXCWH-RpmZl1adH_xvaAcU-QgQqD0ij7MCvzLZuFqrOq3KIPdYRoiLtwN-nT5VLOVRi9IHIx1NSaCgYKAYUSARMSFQHGX2MibcfQqIfKORva5_oTwr7zOQ0175','1//03Qhyv_ZGAV-jCgYIARAAGAMSNwF-L9IrKyfjRDaoljC_pKkndDhlVjMjCBnNQxfGZ1JaQ-Nm29LE4fEx_pwoh3E7ih4nlz-jpm4',3599,'2025-03-07 20:33:03'),(16,'123',1,'ya29.a0AeXRPp4O7XB-8uA-0t8bVzb_yxz0YYRrvkz8aU5jhsDGf_08KF6PLm6HG7r4293ckstwIpNaIJW8L-vjF7j5FkhaaYK3l0RXQz0nH9hkyeQbKxEuyb1o8IRs-qNAceey7_64xwONGeKXUfWUAYhH-9A6zPhM5yhpQPHwk833aCgYKAdUSARMSFQHGX2MiAMjEOsJh5x597fAwVTFckQ0175','1//03JRAtLyHNljhCgYIARAAGAMSNwF-L9IrKCGMisaQFOBtWPV-dRt0CRq0xMIEKBr7mRUDIVMEBT78mJ9ijrLSIY1SinP06vydBqI',3599,'2025-03-07 20:36:13'),(17,'65648863de2fcf65b0e33eb2',1,'ya29.a0AeXRPp5iwoJ1tKFMLX-t4TKxWUxCMjlwdoQ2DMZfHIqO91HkFizxWAbt_kH6tfRlP0t802PvwWDJxvk5x1J5h3SfJEyV2dQkxwB9x1UpXU7hkfP_QTnXyazxHbfWpHoD2QGJ3hy_HA__G_CGUr5wEX0lHl3XBW5lLvryTKoVaCgYKAfcSARMSFQHGX2MizTF0lkqW491BTQEGeJ6ZiQ0175','1//03qDiAwRyxqzJCgYIARAAGAMSNwF-L9Ir3cGLSeimIOLBNHRtycA7EW-M7HKEJQwWTTzMFDboziQAv_0MGI-TzMyVIGga6d1UESA',3599,'2025-03-07 20:37:20');
/*!40000 ALTER TABLE `user_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `email` mediumtext,
  `password` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stripe_cus_id` varchar(100) DEFAULT NULL,
  `login_type` enum('web','google') DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `plan_name` varchar(50) DEFAULT NULL,
  `subscription_id` varchar(50) DEFAULT NULL,
  `subscription_status` enum('incomplete','incomplete_expired','trialing','active','past_due','canceled','unpaid') DEFAULT NULL,
  `refresh_token` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('67c963fff8290e692c4805aa','test@gmail.com','$2b$10$4K8ZMpmpcBUlkpVSij4fcuDp4mDzD2WYww2fh/Yl.hqKctmgofx/C','active','2025-03-06 08:59:43',NULL,'web',1,'free',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M5NjNmZmY4MjkwZTY5MmM0ODA1YWEiLCJpYXQiOjE3NDEyNTY3NjMsImV4cCI6MTc0MTg2MTU2M30.Z6i51VjjXhx6k6Hsbnd1lcKWhMtoO5DipB3USuuaNKQ');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verify_email`
--

DROP TABLE IF EXISTS `verify_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verify_email` (
  `user_id` varchar(50) DEFAULT NULL,
  `token_expiry` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `verification_token` varchar(150) NOT NULL,
  PRIMARY KEY (`verification_token`),
  KEY `fk_user_iddd` (`user_id`),
  CONSTRAINT `fk_user_iddd` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verify_email`
--

LOCK TABLES `verify_email` WRITE;
/*!40000 ALTER TABLE `verify_email` DISABLE KEYS */;
INSERT INTO `verify_email` VALUES ('67c963fff8290e692c4805aa','2025-03-07 08:59:43','2025-03-06 08:59:43','fd8f1f54-548b-4508-8636-0b91aca948a0');
/*!40000 ALTER TABLE `verify_email` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webhooks`
--

DROP TABLE IF EXISTS `webhooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webhooks` (
  `webhook_id` int NOT NULL AUTO_INCREMENT,
  `app_id` int NOT NULL,
  `event_type` varchar(255) NOT NULL,
  `payload` text,
  `received_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`webhook_id`),
  KEY `app_id` (`app_id`),
  CONSTRAINT `webhooks_ibfk_1` FOREIGN KEY (`app_id`) REFERENCES `applications` (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webhooks`
--

LOCK TABLES `webhooks` WRITE;
/*!40000 ALTER TABLE `webhooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `webhooks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-08  1:50:27
