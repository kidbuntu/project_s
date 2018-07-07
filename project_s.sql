-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2018 at 06:45 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_s`
--

-- --------------------------------------------------------

--
-- Table structure for table `event_category`
--

CREATE TABLE `event_category` (
  `sequence_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` varchar(255) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `last_updated_dt` datetime DEFAULT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event_header`
--

CREATE TABLE `event_header` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_category_id` varchar(255) NOT NULL,
  `event_description` varchar(255) NOT NULL,
  `fee` float DEFAULT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_dt` datetime DEFAULT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_dt` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `last_updated_dt` datetime DEFAULT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `firstname`, `lastname`, `dob`, `phone`, `email`, `balance`, `created_dt`, `created_by`, `last_updated_dt`, `last_updated_by`, `status`) VALUES
('1001', 'harry', 'inoferio ii', '1987-07-25', 9369416257, 'harryinoferio@gmail.com', NULL, '2018-07-07 22:51:34', 'admin', NULL, NULL, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `student_group`
--

CREATE TABLE `student_group` (
  `group_id` varchar(255) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `group_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `trans_id` int(11) NOT NULL,
  `trans_type` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `userid` varchar(255) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `student_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_item_assoc`
--

CREATE TABLE `transaction_item_assoc` (
  `sequence_id` int(11) NOT NULL,
  `transid` int(11) NOT NULL,
  `transaction_typ_id` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_types`
--

CREATE TABLE `transaction_types` (
  `transaction_type_id` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction_types`
--

INSERT INTO `transaction_types` (`transaction_type_id`, `description`) VALUES
('ATT', 'ATTENDANCE SIGN-IN'),
('INQ', 'INQUIRY'),
('PMT', 'PAYMENT'),
('REG', 'REGISTRATION');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) NOT NULL,
  `lastupdated_dt` datetime DEFAULT NULL,
  `lastupdated_by` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `firstname`, `lastname`, `password`, `type`, `created_dt`, `created_by`, `lastupdated_dt`, `lastupdated_by`, `status`) VALUES
('', '', '', '', '', '2018-07-07 23:47:03', 'admin', NULL, NULL, 'Active'),
('Admin', 'Admin', 'Admin', '21232f297a57a5a743894a0e4a801fc3', 'Administrator', '2018-07-06 01:57:18', 'Admin', NULL, NULL, 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event_category`
--
ALTER TABLE `event_category`
  ADD PRIMARY KEY (`sequence_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `event_header`
--
ALTER TABLE `event_header`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `last_updated_by` (`last_updated_by`),
  ADD KEY `event_category_id` (`event_category_id`),
  ADD KEY `event_category_id_2` (`event_category_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `last_updated_by` (`last_updated_by`);

--
-- Indexes for table `student_group`
--
ALTER TABLE `student_group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`trans_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `user` (`userid`);

--
-- Indexes for table `transaction_item_assoc`
--
ALTER TABLE `transaction_item_assoc`
  ADD PRIMARY KEY (`sequence_id`),
  ADD KEY `transid` (`transid`),
  ADD KEY `transaction_typ_id` (`transaction_typ_id`);

--
-- Indexes for table `transaction_types`
--
ALTER TABLE `transaction_types`
  ADD PRIMARY KEY (`transaction_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD KEY `last_updated_by` (`lastupdated_by`),
  ADD KEY `created_by` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event_category`
--
ALTER TABLE `event_category`
  MODIFY `sequence_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_header`
--
ALTER TABLE `event_header`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_item_assoc`
--
ALTER TABLE `transaction_item_assoc`
  MODIFY `sequence_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event_header`
--
ALTER TABLE `event_header`
  ADD CONSTRAINT `event_hdr_cat_const` FOREIGN KEY (`event_category_id`) REFERENCES `event_category` (`category_name`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `created_by_const` FOREIGN KEY (`created_by`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `lastupdated_by_const` FOREIGN KEY (`last_updated_by`) REFERENCES `users` (`userid`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `students_id_const` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `users_id_const` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`);

--
-- Constraints for table `transaction_item_assoc`
--
ALTER TABLE `transaction_item_assoc`
  ADD CONSTRAINT `transid_const` FOREIGN KEY (`transid`) REFERENCES `transactions` (`trans_id`),
  ADD CONSTRAINT `transtyp_id_const` FOREIGN KEY (`transaction_typ_id`) REFERENCES `transaction_types` (`transaction_type_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `tbl_users_lastupdated_by_const` FOREIGN KEY (`lastupdated_by`) REFERENCES `users` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
