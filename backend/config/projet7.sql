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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.comments : ~1 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `comment_id`, `commenterId`, `text`, `createdAt`, `postId`, `updatedAt`) VALUES
	(11, '0.48115858831452796', '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris', '2022-03-09 17:55:55', '1646844721045.9617', NULL),
	(17, '0.9922239010533465', '98890398-61f6-42f8-a838-3476f2716c3f', 'Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', '2022-03-09 18:04:28', '1646844721045.9617', NULL),
	(18, '0.3939080043630945', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', 'solitarum rerum cibos !', '2022-03-09 18:09:48', '1646844721045.9617', NULL),
	(19, '0.13111579803336193', 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d', 'vehementer angebat', '2022-03-09 18:55:23', '1646848394302.493', NULL),
	(20, '0.048952301992933434', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', ';)', '2022-03-09 18:59:26', '1646845560941.3008', NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Listage de la structure de la table projet7. likes
CREATE TABLE IF NOT EXISTS `likes` (
  `postId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  UNIQUE KEY `uq_likes` (`postId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.likes : ~0 rows (environ)
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` (`postId`, `userId`) VALUES
	('1646844553852.2131', '71d19cbd-eba1-42c9-96f4-e434fa3f38c0'),
	('1646844553852.2131', '98890398-61f6-42f8-a838-3476f2716c3f'),
	('1646844553852.2131', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646844553852.2131', 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d'),
	('1646844721045.9617', '98890398-61f6-42f8-a838-3476f2716c3f'),
	('1646845560941.3008', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55'),
	('1646845560941.3008', 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d'),
	('1646848650287.5042', 'e9ecb671-db4e-420a-bc83-ca5c0e684b55');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.posts : ~16 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `posterId`, `message`, `post_id`, `createdAt`, `updatedAt`, `commentsId`, `picture`, `video`) VALUES
	(1, '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'At nunc si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris, primitus tamquam exoptatus suscipieris et interrogatus multa coactusque mentiri, miraberis numquam antea visus summatem virum tenuem te sic enixius observantem, ut paeniteat ob haec bona tamquam praecipua non vidisse ante decennium Romam.', '1646844553852.2131', '2022-03-09 17:49:13', NULL, NULL, '', ''),
	(2, '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'miraberis numquam antea visus summatem', '1646844721045.9617', '2022-03-09 17:52:01', NULL, NULL, './uploads/posts/71d19cbd-eba1-42c9-96f4-e434fa3f38c01646844721043.jpg', ''),
	(3, '98890398-61f6-42f8-a838-3476f2716c3f', 'Illud tamen clausos vehementer angebat quod captis navigiis, quae frumenta vehebant per flumen, Isauri quidem alimentorum copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo inediae propinquantis aerumnas exitialis horrebant.', '1646845560941.3008', '2022-03-09 18:06:00', NULL, NULL, '', 'https://www.youtube.com/embed/5qap5aO4i9A'),
	(4, 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d', '', '1646848394302.493', '2022-03-09 18:53:14', NULL, NULL, './uploads/posts/f7d2622b-649e-4932-8e1f-dff3c42dfb4d1646848394299.jpg', ''),
	(5, 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', 'Ego vero sic intellego, Patres conscripti, nos hoc tempore in provinciis decernendis perpetuae pacis habere oportere rationem. Nam quis hoc non sentit omnia alia esse nobis vacua ab omni periculo atque etiam suspicione belli?\r\n\r\nUt enim benefici liberalesque sumus, non ut exigamus gratiam (neque enim beneficium faeneramur sed natura propensi ad liberalitatem sumus), sic amicitiam non spe mercedis adducti sed quod omnis eius fructus in ipso amore inest, expetendam putamus.\r\n\r\nCognitis enim pilatorum caesorumque funeribus nemo deinde ad has stationes appulit navem, sed ut Scironis praerupta letalia declinantes litoribus Cypriis contigui navigabant, quae Isauriae scopulis sunt controversa.\r\n', '1646848650287.5042', '2022-03-09 18:57:30', NULL, NULL, '', '');
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
  PRIMARY KEY (`ID`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table projet7.users : ~1 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`ID`, `user_id`, `email`, `password`, `createdAt`, `disabled`, `picture`, `bio`, `firstname`, `lastname`, `updatedAt`) VALUES
	(2, '71d19cbd-eba1-42c9-96f4-e434fa3f38c0', 'claire@gmail.com', '$2b$10$4pvToV80m16Jx2hL2SOT0Ox6tcDUVSMgMzPvI93/IJ5B/X7axrrQO', '2022-03-09 17:48:12', 0, './uploads/profil/Claire.jpg', 'At nunc si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris, primitus tamquam exoptatus suscipieris et interrogatus multa coactusque mentiri, miraberis numquam antea visus summatem virum tenuem te sic enixius observantem, ut paeniteat ob haec bona tamquam praecipua non vidisse ante decennium Romam.', 'Claire', 'Dupont', '2022-03-09 17:50:50'),
	(3, '98890398-61f6-42f8-a838-3476f2716c3f', 'eric@gmail.com', '$2b$10$ZK01.7R/wC6m/CqaodN/m.XuuGcB2KjENeW1fxxilPEOrpcOaBUSy', '2022-03-09 18:00:53', 0, './uploads/profil/Eric.jpg', NULL, 'Eric', 'Hervieux', '2022-03-09 18:03:20'),
	(5, 'e9ecb671-db4e-420a-bc83-ca5c0e684b55', 'delphine@gmail.com', '$2b$10$Uo4fzXmeGC4vJmo1NIErXe82A1eFnww0uNAyRqOIEHWT02S40GCP.', '2022-03-09 18:08:46', 0, './uploads/profil/Delphine.jpg', NULL, 'Delphine', 'Bordeleau', '2022-03-09 18:13:09'),
	(6, 'f7d2622b-649e-4932-8e1f-dff3c42dfb4d', 'luc@gmail.com', '$2b$10$dhxOibYlYz6H.AryWJtfPeEMdKioCUl8NwOAPIvERBjleBowmbLvC', '2022-03-09 18:52:22', 0, './uploads/profil/Luc.jpg', NULL, 'Luc', 'Auberjonoi', '2022-03-09 18:53:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
