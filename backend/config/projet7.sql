-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.28 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour projet7
CREATE DATABASE IF NOT EXISTS `projet7` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projet7`;

-- Listage de la structure de la table projet7. comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(255) NOT NULL,
  `commenterId` varchar(100) NOT NULL,
  `text` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `postId` varchar(255) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.comments : ~7 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `comment_id`, `commenterId`, `text`, `createdAt`, `postId`, `updatedAt`) VALUES
	(11, '0.48115858831452796', '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris', '2022-03-09 17:55:55', '1646844721045.9617', NULL),
	(17, '0.9922239010533465', '98890398-61f6-42f8-a838-3476f2716c3f', 'Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', '2022-03-09 18:04:28', '1646844721045.9617', NULL),
	(19, '0.13111579803336193', 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d', 'vehementer angebatdd', '2022-03-09 18:55:23', '1646848394302.493', '2022-03-10 22:27:41'),
	(20, '0.048952301992933434', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', ';)', '2022-03-09 18:59:26', '1646845560941.3008', NULL),
	(25, '0.3946405583292729', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', 'hey', '2022-03-09 22:06:16', '1646857823802.4658', NULL),
	(29, '0.06384171606833045', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', 'Proinde concepta rabie saeviore, quam desperatio incendebat et fames, amplificatis viribus ardore incohibili in link excidium urbium matris Seleuciae efferebantur, quam comes tuebatur Castricius tresque legiones bellicis sudoribus induratae.\n', '2022-03-10 13:13:19', '1646914298088.7173', '2022-03-10 13:15:18'),
	(38, '0.9441292564070258', '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'testd', '2022-03-10 22:20:23', '1646945472572.138', '2022-03-10 22:21:10');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Listage de la structure de la table projet7. likes
CREATE TABLE IF NOT EXISTS `likes` (
  `postId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  UNIQUE KEY `uq_likes` (`postId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.likes : ~23 rows (environ)
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` (`postId`, `userId`) VALUES
	('1646844553852.2131', '71d19cbd-eba1-42c9-96f4-e434fa3f38c0'),
	('1646844553852.2131', '98890398-61f6-42f8-a838-3476f2716c3f'),
	('1646844553852.2131', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646844553852.2131', 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d'),
	('1646844721045.9617', '71d19cbd-eba1-42c9-96f4-e434fa3f38c0'),
	('1646844721045.9617', '98890398-61f6-42f8-a838-3476f2716c3f'),
	('1646844721045.9617', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646845560941.3008', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646845560941.3008', 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d'),
	('1646848394302.493', 'db406de6-2b49-4bdd-bc9b-306e455faa45'),
	('1646848650287.5042', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646857823802.4658', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646860848044.294', 'db406de6-2b49-4bdd-bc9b-306e455faa45'),
	('1646860848044.294', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646871307482.4863', '71d19cbd-eba1-42c9-96f4-e434fa3f38c0'),
	('1646871307482.4863', 'bb3178d8-b2a1-4034-8c4b-d26fd0faf91c'),
	('1646871307482.4863', 'f33df90b-cd45-405e-bd9e-657542009f4b'),
	('1646916939450.9138', '98890398-61f6-42f8-a838-3476f2716c3f'),
	('1646916939450.9138', 'bb3178d8-b2a1-4034-8c4b-d26fd0faf91c'),
	('1646923959294.36', 'f33df90b-cd45-405e-bd9e-657542009f4b'),
	('1646925225320.8845', 'bb3178d8-b2a1-4034-8c4b-d26fd0faf91c'),
	('1646928924673.5566', '98890398-61f6-42f8-a838-3476f2716c3f'),
	('1646929979282.17', '31fa7be5-aac3-47e5-acb0-b41a9e2b73fe'),
	('1646932189420.6584', '567029ad-b3f2-4a1e-990f-65a08c1193d9');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;

-- Listage de la structure de la table projet7. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `posterId` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `post_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `commentsId` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.posts : ~12 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `posterId`, `message`, `post_id`, `createdAt`, `updatedAt`, `commentsId`, `picture`, `video`) VALUES
	(1, '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'At nunc si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris, primitus tamquam exoptatus suscipieris et interrogatus multa coactusque mentiri, miraberis numquam antea visus summatem virum tenuem te sic enixius observantem, ut paeniteat ob haec bona tamquam praecipua non vidisse ante decennium Romam.', '1646844553852.2131', '2022-03-09 17:49:13', NULL, NULL, '', ''),
	(2, '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'miraberis numquam antea visus summatem', '1646844721045.9617', '2022-03-09 17:52:01', NULL, NULL, './uploads/posts/71d19cbd-eba1-42c9-96f4-e434fa3f38c01646844721043.jpg', ''),
	(3, '98890398-61f6-42f8-a838-3476f2716c3f', 'Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', '1646845560941.3008', '2022-03-09 18:06:00', NULL, NULL, '', 'https://www.youtube.com/embed/5qap5aO4i9A'),
	(4, 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d', '', '1646848394302.493', '2022-03-09 18:53:14', NULL, NULL, './uploads/posts/f7d2622b-649e-4932-8e1f-dff3c42dfb4d1646848394299.jpg', ''),
	(9, 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', 'uam cogitatione quantum illa res utilitatis esset habitura.', '1646857823802.4658', '2022-03-09 21:30:23', '2022-03-09 21:36:08', NULL, '', 'https://www.youtube.com/embed/HBhQHSpebfE'),
	(10, 'db406de6-2b49-4bdd-bc9b-306e455faa45', ' Quod in homine multo est evidentius, primum ex ea caritate quae est inter natos et parentes, quae dirimi nisi detestabili scelere non potest; deinde cum similis sensus exstitit amoris, si aliquem nacti sumus cuius cum moribus et natura congruamus, quod in eo quasi lumen aliquod probitatis et virtutis perspicere videamur.', '1646860848044.294', '2022-03-09 22:20:48', NULL, NULL, '', ''),
	(11, 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', '', '1646871307482.4863', '2022-03-10 01:15:07', NULL, NULL, './uploads/posts/e9ecb671-db4e-420a-bc83-ca5c0e684b551646871307480.jpg', ''),
	(13, 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', '', '1646916939450.9138', '2022-03-10 13:55:39', NULL, NULL, './uploads/posts/e9ecb671-db4e-420a-bc83-ca5c0e684b551646916939448.jpg', '');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table projet7. users
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `disabled` int DEFAULT '0',
  `picture` varchar(255) DEFAULT './uploads/profil/random-user.png',
  `bio` text,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.users : ~9 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`ID`, `user_id`, `email`, `password`, `createdAt`, `disabled`, `picture`, `bio`, `firstname`, `lastname`, `updatedAt`, `status`) VALUES
	(2, '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'claire@gmail.com', '$2b$10$4pvToV80m16Jx2hL2SOT0Ox6tcDUVSMgMzPvI93/IJ5B/X7axrrQO', '2022-03-09 17:48:12', 0, './uploads/profil/Claire.jpg', 'Coucou c\'est moi !!!!!', 'Claire', 'Dupont', '2022-03-09 20:43:06', 1),
	(3, '98890398-61f6-42f8-a838-3476f2716c3f', 'eric@gmail.com', '$2b$10$ZK01.7R/wC6m/CqaodN/m.XuuGcB2KjENeW1fxxilPEOrpcOaBUSy', '2022-03-09 18:00:53', 0, './uploads/profil/Eric.jpg', '', 'Eric', 'Hervieux', '2022-03-10 17:16:37', 0),
	(5, 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', 'delphine@gmail.com', '$2b$10$Uo4fzXmeGC4vJmo1NIErXe82A1eFnww0uNAyRqOIEHWT02S40GCP.', '2022-03-09 18:08:46', 0, './uploads/profil/Delphine.jpg', '\n\nProinde concepta rabie saeviore, quam desperatio incendebat et fames, amplificatis viribus ardore incohibili in excidium urbium matris Seleuciae efferebantur, quam comes tuebatur Castricius tresque legiones bellicis sudoribus induratae.\n', 'Delphine', 'Bordeleau', '2022-03-10 13:12:47', 0),
	(6, 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d', 'luc@gmail.com', '$2b$10$dhxOibYlYz6H.AryWJtfPeEMdKioCUl8NwOAPIvERBjleBowmbLvC', '2022-03-09 18:52:22', 0, './uploads/profil/Luc.jpg', NULL, 'Luc', 'Auberjonoi', '2022-03-09 18:53:41', 0),
	(7, 'db406de6-2b49-4bdd-bc9b-306e455faa45', 'bernard@gmail.com', '$2b$10$CXApviwYibADeyEMTwFn/u/nJYvtNldevRePmqQ96q0SfaPbz6vL6', '2022-03-09 22:19:08', 0, './uploads/profil/Bernard.jpg', NULL, 'Bernard', 'Hou', '2022-03-09 22:20:13', 0),
	(9, 'f33df90b-cd45-405e-bd9e-657542009f4b', 'stephanie@gmail.com', '$2b$10$OdwmerOExFiEVHq9u7Mdfugw0IB9fG5C4I6301BVK3FFc7szTyYjS', '2022-03-10 15:51:17', 0, './uploads/profil/Stéphanie.jpg', 'Hoc inmaturo interitu ipse quoque sui pertaesus excessit e vita aetatis nono anno atque vicensimo cum quadriennio imperasset. natus apud Tuscos in Massa Veternensi, patre ddddddConstantio Constantini fratre imperatoris, matreque Galla sorore Rufini et Cerealis, quos trabeae consulares nobilitarunt et praefecturae.', 'Stéphanie', 'Dupont', '2022-03-10 15:53:43', 0),
	(11, 'bb3178d8-b2a1-4034-8c4b-d26fd0faf91c', 'nicolas@gmail.com', '$2b$10$TDKTAEtoxYd3X6Ye3BhUfOCwdTnJYNXuqeLGqAG/yuS25bZPIK3fe', '2022-03-10 16:11:12', 0, './uploads/profil/Nicolas.jpg', 'Hoc inmaturo interitu ipse quoque sui pertaesus excessit e vita aetatis nono anno atque vicensimo cum quadriennio dddddd imperasset. natus apud Tuscos in Massa Veternensi, patre Constantio Constantini fratre imperatoris, matreque Galla sorore Rufini et Cerealis, quos trabeae consulares nobilitarunt et praefecturae.', 'Nicolas', 'Dupont', '2022-03-10 16:12:01', 0),
	(17, '31fa7be5-aac3-47e5-acb0-b41a9e2b73fe', 'brigitte@gmail.com', '$2b$10$b7YW8NxGr4pSxfZCMgJQfO00eNLF9PObkHtw8DeHEPOKA3WZbdYmK', '2022-03-10 17:30:45', 0, './uploads/profil/Brigitte.jpg', 'test', 'Brigitte', 'Dupont', '2022-03-10 17:32:29', 0),
	(19, '567029ad-b3f2-4a1e-990f-65a08c1193d9', 'henry@gmail.com', '$2b$10$AviKnykp.vcm/PY8wP5YfOn25OlJ3cqKahEjHp2LiArDrTcsOnBUO', '2022-03-10 18:08:31', 0, './uploads/profil/Henry.jpg', 'test', 'Henry', 'Dupont', '2022-03-10 18:10:24', 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
