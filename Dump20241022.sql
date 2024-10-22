-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: car_system
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_form_owners`
--

DROP TABLE IF EXISTS `car_form_owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_form_owners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `correction` longtext COLLATE utf8mb4_unicode_ci,
  `date_correction` date DEFAULT NULL,
  `consequence` longtext COLLATE utf8mb4_unicode_ci,
  `deal_consequence` longtext COLLATE utf8mb4_unicode_ci,
  `date_deal_consequence` date DEFAULT NULL,
  `corrective_action` longtext COLLATE utf8mb4_unicode_ci,
  `date_corrective_action` date DEFAULT NULL,
  `similar_nonconformity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `potential_nonconformity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_potential_nonconformity` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `car_form_owners_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `car_form_owners_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_form_owners`
--

LOCK TABLES `car_form_owners` WRITE;
/*!40000 ALTER TABLE `car_form_owners` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_form_owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_form_processors`
--

DROP TABLE IF EXISTS `car_form_processors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_form_processors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_number` bigint unsigned NOT NULL,
  `issue_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nonconformance_classification` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nonconformance_observation` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditor_initiator` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_reported_to_ims` date NOT NULL,
  `concerned_department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` bigint unsigned NOT NULL,
  `approver_id` bigint unsigned NOT NULL,
  `receiver_id` bigint unsigned NOT NULL,
  `email_receiver` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_head_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `car_form_processors_created_by_foreign` (`created_by`),
  KEY `car_form_processors_approver_id_foreign` (`approver_id`),
  KEY `car_form_processors_receiver_id_foreign` (`receiver_id`),
  KEY `car_form_processors_department_head_id_foreign` (`department_head_id`),
  CONSTRAINT `car_form_processors_approver_id_foreign` FOREIGN KEY (`approver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `car_form_processors_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `car_form_processors_department_head_id_foreign` FOREIGN KEY (`department_head_id`) REFERENCES `users` (`id`),
  CONSTRAINT `car_form_processors_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_form_processors`
--

LOCK TABLES `car_form_processors` WRITE;
/*!40000 ALTER TABLE `car_form_processors` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_form_processors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classifications`
--

DROP TABLE IF EXISTS `classifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `stage` int NOT NULL,
  `risk` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `weakness` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `threat` text COLLATE utf8mb4_unicode_ci,
  `p` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `s` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `r` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `classification` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `classifications_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `classifications_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classifications`
--

LOCK TABLES `classifications` WRITE;
/*!40000 ALTER TABLE `classifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `classifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clauses`
--

DROP TABLE IF EXISTS `clauses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clauses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `reference_id` bigint unsigned NOT NULL,
  `clause_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_clause_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clauses_reference_id_foreign` (`reference_id`),
  CONSTRAINT `clauses_reference_id_foreign` FOREIGN KEY (`reference_id`) REFERENCES `references` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clauses`
--

LOCK TABLES `clauses` WRITE;
/*!40000 ALTER TABLE `clauses` DISABLE KEYS */;
/*!40000 ALTER TABLE `clauses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codetables`
--

DROP TABLE IF EXISTS `codetables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codetables` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `codename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codevalue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codetables`
--

LOCK TABLES `codetables` WRITE;
/*!40000 ALTER TABLE `codetables` DISABLE KEYS */;
INSERT INTO `codetables` VALUES (1,'DEPARTMENT','Testing','Testing',NULL,NULL),(2,'DEPARTMENT','IH','IH WEM',NULL,NULL),(3,'DEPARTMENT','Consulting','Consulting',NULL,NULL),(4,'DEPARTMENT','OSHMS','OSHMS',NULL,NULL),(5,'DEPARTMENT','HR','HR',NULL,NULL),(6,'DEPARTMENT','Sales','Sales',NULL,NULL),(7,'DEPARTMENT','Marketing','Marketing',NULL,NULL),(8,'DEPARTMENT','FAD','FAD',NULL,NULL),(9,'DEPARTMENT','IT','IT',NULL,NULL),(10,'DEPARTMENT','IMS','IMS',NULL,NULL),(11,'DEPARTMENT','ESH','ESH',NULL,NULL),(12,'DEPARTMENT','Top Management','Top Management',NULL,NULL),(13,'DEPARTMENT','IH','IH Lab',NULL,NULL),(14,'CLASSIFICATION','Process','Process',NULL,NULL),(15,'CLASSIFICATION','Performance Evaluation','Performance Evaluation',NULL,NULL),(16,'CLASSIFICATION','Documented Information','Documented Information',NULL,NULL),(17,'CLASSIFICATION','Legal Compliance','Legal Compliance',NULL,NULL),(18,'CLASSIFICATION','Costumer Satisfaction','Costumer Satisfaction',NULL,NULL),(19,'RFA_CLASSIFICATION','IA','Internal Audits',NULL,NULL),(20,'RFA_CLASSIFICATION','VOC','Customer Complaints/Voice of Customer',NULL,NULL),(21,'RFA_CLASSIFICATION','Obj','Unmet Targets/Objectives',NULL,NULL),(22,'RFA_CLASSIFICATION','MR','Management Reviews',NULL,NULL),(23,'RFA_CLASSIFICATION','NO','Nonconforming outputs (including from suppliers)',NULL,NULL),(24,'RFA_CLASSIFICATION','IPC','In-process concerns',NULL,NULL),(25,'RFA_CLASSIFICATION','Inci','Accidents/Incidents',NULL,NULL),(26,'RFA_CLASSIFICATION','Envi inci','Environmental Incidents',NULL,NULL),(27,'CLAUSE','Clause 4','Clause 4 (Context)',NULL,NULL),(28,'CLAUSE','Clause 5','Clause 5 (Leadership)',NULL,NULL),(29,'CLAUSE','Clause 6','Clause 6 (Planning)',NULL,NULL),(30,'CLAUSE','Clause 7','Clause 7 (Support)',NULL,NULL),(31,'CLAUSE','Clause 8','Clause 8 (Operation)',NULL,NULL),(32,'CLAUSE','Clause 9','Clause 9 (Performance Evaluation)',NULL,NULL),(33,'CLAUSE','Clause 10','Clause 10 (Improvement)',NULL,NULL),(34,'SUB CLAUSE ISO 9001','Sub Clause 4','Sub Clause 4.1 (Understanding the organization and its context)',NULL,NULL),(35,'SUB CLAUSE ISO 9001','Sub Clause 4','Sub Clause 4.2 (Understanding the needs and expectations of interested parties)',NULL,NULL),(36,'SUB CLAUSE ISO 9001','Sub Clause 4','Sub Clause 4.3 (Determining the scope of the quality management system)',NULL,NULL),(37,'SUB CLAUSE ISO 9001','Sub Clause 4','Sub Clause 4.4 (Quality management system and its processes)',NULL,NULL),(38,'SUB CLAUSE ISO 9001','Sub Clause 5','Sub Clause 5.1 (Leadership and commitment)',NULL,NULL),(39,'SUB CLAUSE ISO 9001','Sub Clause 5','Sub Clause 5.2 (Quality policy)',NULL,NULL),(40,'SUB CLAUSE ISO 9001','Sub Clause 5','Sub Clause 5.3 (Organizational roles, responsibilities, and authorities)',NULL,NULL),(41,'SUB CLAUSE ISO 9001','Sub Clause 6','Sub Clause 6.1 (Actions to address risks and opportunities)',NULL,NULL),(42,'SUB CLAUSE ISO 9001','Sub Clause 6','Sub Clause 6.2 (Quality objectives and planning to achieve them)',NULL,NULL),(43,'SUB CLAUSE ISO 9001','Sub Clause 7','Sub Clause 7.1 (Resources)',NULL,NULL),(44,'SUB CLAUSE ISO 9001','Sub Clause 7','Sub Clause 7.2 (Competence)',NULL,NULL),(45,'SUB CLAUSE ISO 9001','Sub Clause 7','Sub Clause 7.3 (Awareness)',NULL,NULL),(46,'SUB CLAUSE ISO 9001','Sub Clause 7','Sub Clause 7.4 (Communication)',NULL,NULL),(47,'SUB CLAUSE ISO 9001','Sub Clause 7','Sub Clause 7.5 (Documented information)',NULL,NULL),(48,'SUB CLAUSE ISO 9001','Sub Clause 8','Sub Clause 8.1 (Operational planning and control)',NULL,NULL),(49,'SUB CLAUSE ISO 9001','Sub Clause 8','Sub Clause 8.2 (Requirements for products and services)',NULL,NULL),(50,'SUB CLAUSE ISO 9001','Sub Clause 8','Sub Clause 8.3 (Design and development of products and services)',NULL,NULL),(51,'SUB CLAUSE ISO 9001','Sub Clause 8','Sub Clause 8.4 (Control of externally provided processes, products, and services)',NULL,NULL),(52,'SUB CLAUSE ISO 9001','Sub Clause 8','Sub Clause 8.5 (Production and service provision)',NULL,NULL),(53,'SUB CLAUSE ISO 9001','Sub Clause 8','Sub Clause 8.6 (Release of products and services)',NULL,NULL),(54,'SUB CLAUSE ISO 9001','Sub Clause 8','Sub Clause 8.7 (Control of nonconforming outputs)',NULL,NULL),(55,'SUB CLAUSE ISO 9001','Sub Clause 9','Sub Clause 9.1 (Monitoring, measurement, analysis, and evaluation)',NULL,NULL),(56,'SUB CLAUSE ISO 9001','Sub Clause 9','Sub Clause 9.2 (Internal audit)',NULL,NULL),(57,'SUB CLAUSE ISO 9001','Sub Clause 9','Sub Clause 9.3 (Management review)',NULL,NULL),(58,'SUB CLAUSE ISO 9001','Sub Clause 10','Sub Clause 10.1 (General)',NULL,NULL),(59,'SUB CLAUSE ISO 9001','Sub Clause 10','Sub Clause 10.2 (Nonconformity and corrective action)',NULL,NULL),(60,'SUB CLAUSE ISO 9001','Sub Clause 10','Sub Clause 10.3 (Continual improvement)',NULL,NULL),(61,'SUB CLAUSE ISO 14001','Sub Clause 4','Sub Clause 4.1 (Understanding the organization and its context)',NULL,NULL),(62,'SUB CLAUSE ISO 14001','Sub Clause 4','Sub Clause 4.2 (Understanding the needs and expectations of interested parties)',NULL,NULL),(63,'SUB CLAUSE ISO 14001','Sub Clause 4','Sub Clause 4.3 (Determining the scope of the environmental management system)',NULL,NULL),(64,'SUB CLAUSE ISO 14001','Sub Clause 4','Sub Clause 4.4 (Environmental management system)',NULL,NULL),(65,'SUB CLAUSE ISO 14001','Sub Clause 5','Sub Clause 5.1 (Leadership and commitment)',NULL,NULL),(66,'SUB CLAUSE ISO 14001','Sub Clause 5','Sub Clause 5.2 (Environmental policy)',NULL,NULL),(67,'SUB CLAUSE ISO 14001','Sub Clause 6','Sub Clause 6.1 (Actions to address risks and opportunities)',NULL,NULL),(68,'SUB CLAUSE ISO 14001','Sub Clause 6','Sub Clause 6.2 (Environmental objectives and planning to achieve them)',NULL,NULL),(69,'SUB CLAUSE ISO 14001','Sub Clause 7','Sub Clause 7.1 (Resources)',NULL,NULL),(70,'SUB CLAUSE ISO 14001','Sub Clause 7','Sub Clause 7.2 (Competence)',NULL,NULL),(71,'SUB CLAUSE ISO 14001','Sub Clause 7','Sub Clause 7.3 (Awareness)',NULL,NULL),(72,'SUB CLAUSE ISO 14001','Sub Clause 7','Sub Clause 7.4 (Communication)',NULL,NULL),(73,'SUB CLAUSE ISO 14001','Sub Clause 7','Sub Clause 7.5 (Documented information)',NULL,NULL),(74,'SUB CLAUSE ISO 14001','Sub Clause 8','Sub Clause 8.1 (Operational planning and control)',NULL,NULL),(75,'SUB CLAUSE ISO 14001','Sub Clause 8','Sub Clause 8.2 (Emergency preparedness and response)',NULL,NULL),(76,'SUB CLAUSE ISO 14001','Sub Clause 9','Sub Clause 9.1 (Monitoring, measurement, analysis, and evaluation)',NULL,NULL),(77,'SUB CLAUSE ISO 14001','Sub Clause 9','Sub Clause 9.2 (Internal audit)',NULL,NULL),(78,'SUB CLAUSE ISO 14001','Sub Clause 9','Sub Clause 9.3 (Management review)',NULL,NULL),(79,'SUB CLAUSE ISO 14001','Sub Clause 10','Sub Clause 10.1 (General)',NULL,NULL),(80,'SUB CLAUSE ISO 14001','Sub Clause 10','Sub Clause 10.2 (Nonconformity and corrective action)',NULL,NULL),(81,'SUB CLAUSE ISO 14001','Sub Clause 10','Sub Clause 10.3 (Continual improvement)',NULL,NULL),(82,'SUB CLAUSE ISO 45001','Sub Clause 4','Sub Clause 4.1 (Understanding the organization and its context)',NULL,NULL),(83,'SUB CLAUSE ISO 45001','Sub Clause 4','Sub Clause 4.2 (Understanding the needs and expectations of workers and other interested parties)',NULL,NULL),(84,'SUB CLAUSE ISO 45001','Sub Clause 4','Sub Clause 4.3 (Determining the scope of the occupational health and safety management system)',NULL,NULL),(85,'SUB CLAUSE ISO 45001','Sub Clause 4','Sub Clause 4.4 (Occupational health and safety management system)',NULL,NULL),(86,'SUB CLAUSE ISO 45001','Sub Clause 5','Sub Clause 5.1 (Leadership and commitment)',NULL,NULL),(87,'SUB CLAUSE ISO 45001','Sub Clause 5','Sub Clause 5.2 (Policy)',NULL,NULL),(88,'SUB CLAUSE ISO 45001','Sub Clause 5','Sub Clause 5.3 (Organizational roles, responsibilities, and authorities)',NULL,NULL),(89,'SUB CLAUSE ISO 45001','Sub Clause 6','Sub Clause 6.1 (Actions to address risks and opportunities)',NULL,NULL),(90,'SUB CLAUSE ISO 45001','Sub Clause 6','Sub Clause 6.2 (Occupational health and safety objectives and planning to achieve them)',NULL,NULL),(91,'SUB CLAUSE ISO 45001','Sub Clause 7','Sub Clause 7.1 (Resources)',NULL,NULL),(92,'SUB CLAUSE ISO 45001','Sub Clause 7','Sub Clause 7.2 (Competence)',NULL,NULL),(93,'SUB CLAUSE ISO 45001','Sub Clause 7','Sub Clause 7.3 (Awareness)',NULL,NULL),(94,'SUB CLAUSE ISO 45001','Sub Clause 7','Sub Clause 7.4 (Communication)',NULL,NULL),(95,'SUB CLAUSE ISO 45001','Sub Clause 7','Sub Clause 7.5 (Documented information)',NULL,NULL),(96,'SUB CLAUSE ISO 45001','Sub Clause 8','Sub Clause 8.1 (Operational planning and control)',NULL,NULL),(97,'SUB CLAUSE ISO 45001','Sub Clause 8','Sub Clause 8.2 (Management of change)',NULL,NULL),(98,'SUB CLAUSE ISO 45001','Sub Clause 8','Sub Clause 8.3 (Outsourcing)',NULL,NULL),(99,'SUB CLAUSE ISO 45001','Sub Clause 8','Sub Clause 8.4 (Procurement)',NULL,NULL),(100,'SUB CLAUSE ISO 45001','Sub Clause 9','Sub Clause 9.1 (Monitoring, measurement, analysis, and performance evaluation)',NULL,NULL),(101,'SUB CLAUSE ISO 45001','Sub Clause 9','Sub Clause 9.2 (Internal audit)',NULL,NULL),(102,'SUB CLAUSE ISO 45001','Sub Clause 9','Sub Clause 9.3 (Management review)',NULL,NULL),(103,'SUB CLAUSE ISO 45001','Sub Clause 10','Sub Clause 10.1 (Incident, nonconformity, and corrective action)',NULL,NULL),(104,'SUB CLAUSE ISO 45001','Sub Clause 10','Sub Clause 10.2 (Continual improvement)',NULL,NULL);
/*!40000 ALTER TABLE `codetables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delay_forms`
--

DROP TABLE IF EXISTS `delay_forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delay_forms` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `submission_delay` int NOT NULL,
  `manager_approval_delay` int NOT NULL,
  `ims_approval_delay` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `delay_forms_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `delay_forms_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delay_forms`
--

LOCK TABLES `delay_forms` WRITE;
/*!40000 ALTER TABLE `delay_forms` DISABLE KEYS */;
/*!40000 ALTER TABLE `delay_forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `users_department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departments_user_id_foreign` (`user_id`),
  CONSTRAINT `departments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_ccs`
--

DROP TABLE IF EXISTS `email_ccs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_ccs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email_ccs_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `email_ccs_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_ccs`
--

LOCK TABLES `email_ccs` WRITE;
/*!40000 ALTER TABLE `email_ccs` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_ccs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_approvers`
--

DROP TABLE IF EXISTS `feedback_approvers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_approvers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `element_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `feedback` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feedback_approvers_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `feedback_approvers_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_approvers`
--

LOCK TABLES `feedback_approvers` WRITE;
/*!40000 ALTER TABLE `feedback_approvers` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_approvers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_managers`
--

DROP TABLE IF EXISTS `feedback_managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_managers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `element_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `feedback` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `feedback_managers_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `feedback_managers_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_managers`
--

LOCK TABLES `feedback_managers` WRITE;
/*!40000 ALTER TABLE `feedback_managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `first_verifications`
--

DROP TABLE IF EXISTS `first_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `first_verifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `verification_id` bigint unsigned NOT NULL,
  `correction_implemented` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `consequence_dealt` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `corrective_action_implemented` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `potential_nonconformity` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `others_verification` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `conclusion` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `first_verifications_verification_id_foreign` (`verification_id`),
  CONSTRAINT `first_verifications_verification_id_foreign` FOREIGN KEY (`verification_id`) REFERENCES `verifications` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `first_verifications`
--

LOCK TABLES `first_verifications` WRITE;
/*!40000 ALTER TABLE `first_verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `first_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managers`
--

DROP TABLE IF EXISTS `managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `manager_department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `managers_user_id_foreign` (`user_id`),
  CONSTRAINT `managers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managers`
--

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;
/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (115,'0001_01_01_000000_create_users_table',1),(116,'0001_01_01_000001_create_cache_table',1),(117,'0001_01_01_000002_create_jobs_table',1),(118,'2024_08_24_031620_create_car_form_processors_table',1),(119,'2024_08_28_073459_create_departments_table',1),(120,'2024_08_28_073509_create_roles_table',1),(121,'2024_08_28_073719_create_verifications_table',1),(122,'2024_08_28_073752_create_request_for_action_verifications_table',1),(123,'2024_08_28_073814_create_classifications_table',1),(124,'2024_08_28_073826_create_root_causes_table',1),(125,'2024_08_28_073845_create_email_ccs_table',1),(126,'2024_08_28_073946_create_references_table',1),(127,'2024_08_28_073957_create_clauses_table',1),(128,'2024_08_28_074232_create_codetables_table',1),(129,'2024_08_28_074319_create_car_form_owners_table',1),(130,'2024_08_28_075230_create_first_verifications_table',1),(131,'2024_08_28_075248_create_other_verifications_table',1),(132,'2024_08_28_081000_create_managers_table',1),(133,'2024_08_28_082407_create_feedback_managers_table',1),(134,'2024_08_28_082413_create_feedback_approvers_table',1),(135,'2024_09_01_053416_create_related_cars_table',1),(136,'2024_09_02_015447_create_role_user_table',1),(137,'2024_10_15_020049_create_delay_forms_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `other_verifications`
--

DROP TABLE IF EXISTS `other_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `other_verifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `verification_id` bigint unsigned NOT NULL,
  `correction_implemented_still_implemented` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `corrective_action_effective` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `others_verification` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `conclusion` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `other_verifications_verification_id_foreign` (`verification_id`),
  CONSTRAINT `other_verifications_verification_id_foreign` FOREIGN KEY (`verification_id`) REFERENCES `verifications` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `other_verifications`
--

LOCK TABLES `other_verifications` WRITE;
/*!40000 ALTER TABLE `other_verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `other_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `references`
--

DROP TABLE IF EXISTS `references`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `references` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `reference_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `references_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `references_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `references`
--

LOCK TABLES `references` WRITE;
/*!40000 ALTER TABLE `references` DISABLE KEYS */;
/*!40000 ALTER TABLE `references` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `related_cars`
--

DROP TABLE IF EXISTS `related_cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `related_cars` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `related_car` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `related_cars_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `related_cars_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `related_cars`
--

LOCK TABLES `related_cars` WRITE;
/*!40000 ALTER TABLE `related_cars` DISABLE KEYS */;
/*!40000 ALTER TABLE `related_cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_for_action_verifications`
--

DROP TABLE IF EXISTS `request_for_action_verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_for_action_verifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `verification_id` bigint unsigned NOT NULL,
  `result_of_the_action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `close_out_follow_up` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `request_for_action_verifications_verification_id_foreign` (`verification_id`),
  CONSTRAINT `request_for_action_verifications_verification_id_foreign` FOREIGN KEY (`verification_id`) REFERENCES `verifications` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_for_action_verifications`
--

LOCK TABLES `request_for_action_verifications` WRITE;
/*!40000 ALTER TABLE `request_for_action_verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_for_action_verifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Approver','2024-10-22 04:51:18','2024-10-22 04:51:18'),(2,'Department Head','2024-10-22 04:51:18','2024-10-22 04:51:18'),(3,'Process Owner','2024-10-22 04:51:18','2024-10-22 04:51:18'),(4,'Processor','2024-10-22 04:51:18','2024-10-22 04:51:18');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_user`
--

DROP TABLE IF EXISTS `roles_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_user` (
  `roles_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  KEY `roles_user_roles_id_foreign` (`roles_id`),
  KEY `roles_user_user_id_foreign` (`user_id`),
  CONSTRAINT `roles_user_roles_id_foreign` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `roles_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_user`
--

LOCK TABLES `roles_user` WRITE;
/*!40000 ALTER TABLE `roles_user` DISABLE KEYS */;
INSERT INTO `roles_user` VALUES (1,1),(2,1),(3,1),(4,1),(1,2),(2,3),(4,4);
/*!40000 ALTER TABLE `roles_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `root_causes`
--

DROP TABLE IF EXISTS `root_causes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `root_causes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `stage` int NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `root_causes_car_form_id_foreign` (`car_form_id`),
  CONSTRAINT `root_causes_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `root_causes`
--

LOCK TABLES `root_causes` WRITE;
/*!40000 ALTER TABLE `root_causes` DISABLE KEYS */;
/*!40000 ALTER TABLE `root_causes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Steven Scad Guinto','ssgguinto.p360@gmail.com','2024-10-22 04:51:20','$2y$12$HjDBbYLQ2jUPFK3ZVfLySecHkYLt5F17huL3zOGDZbpVPXpCqljKa','41b0B7zFoY','2024-10-22 04:51:20','2024-10-22 04:51:20'),(2,'Max Franecki','vandervort.leola@example.org','2024-10-22 04:51:20','$2y$12$j.8TcCvdWjlTQ2gAlLYl9ucFX1wIP8O4JKgrSXIWMa5RCFSyEv5PS','FEyFexC3nx','2024-10-22 04:51:20','2024-10-22 04:51:20'),(3,'Phoebe Jast','heloise08@example.org','2024-10-22 04:51:20','$2y$12$j.8TcCvdWjlTQ2gAlLYl9ucFX1wIP8O4JKgrSXIWMa5RCFSyEv5PS','r6MNEoQFYD','2024-10-22 04:51:20','2024-10-22 04:51:20'),(4,'Avis Mertz','brayan55@example.com','2024-10-22 04:51:20','$2y$12$j.8TcCvdWjlTQ2gAlLYl9ucFX1wIP8O4JKgrSXIWMa5RCFSyEv5PS','GpBXNCQck9','2024-10-22 04:51:20','2024-10-22 04:51:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verifications`
--

DROP TABLE IF EXISTS `verifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `car_form_id` bigint unsigned NOT NULL,
  `verification_stage` int NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `person_responsible_id` bigint unsigned NOT NULL,
  `creator_id` bigint unsigned NOT NULL,
  `approver_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `verifications_car_form_id_foreign` (`car_form_id`),
  KEY `verifications_person_responsible_id_foreign` (`person_responsible_id`),
  KEY `verifications_creator_id_foreign` (`creator_id`),
  KEY `verifications_approver_id_foreign` (`approver_id`),
  CONSTRAINT `verifications_approver_id_foreign` FOREIGN KEY (`approver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `verifications_car_form_id_foreign` FOREIGN KEY (`car_form_id`) REFERENCES `car_form_processors` (`id`),
  CONSTRAINT `verifications_creator_id_foreign` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`),
  CONSTRAINT `verifications_person_responsible_id_foreign` FOREIGN KEY (`person_responsible_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verifications`
--

LOCK TABLES `verifications` WRITE;
/*!40000 ALTER TABLE `verifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `verifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-22 20:52:12
