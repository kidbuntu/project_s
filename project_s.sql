-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 29, 2018 at 07:19 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 7.2.5

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

--
-- Dumping data for table `event_category`
--

INSERT INTO `event_category` (`sequence_id`, `category_name`, `category_description`, `created_dt`, `created_by`, `last_updated_dt`, `last_updated_by`) VALUES
(1, 'BUWAN NG WIKA', 'TEST ONLY', '2018-06-28 13:37:23', 'Admin', NULL, NULL),
(2, 'CULTURAL', 'Filipino Traditional Event', '2018-06-28 16:04:53', 'Admin', NULL, NULL),
(3, 'SAMPLE', 'SAMPLE', '2018-06-28 16:06:39', 'Admin', NULL, NULL),
(4, 'SPORTS', 'Physical Activity', '2018-06-28 13:37:23', 'Admin', NULL, NULL),
(5, 'TEST', 'TEST', '2018-06-29 22:34:54', '', NULL, NULL),
(6, 'OTHER', 'Misc', '2018-06-29 23:57:44', '', NULL, NULL),
(7, 'EXAMPLE', 'EXAMPLE', '2018-06-30 00:34:25', '', NULL, NULL),
(8, 'HARRY', 'HARRY', '2018-06-30 00:35:24', '', NULL, NULL),
(9, 'Training', 'Development Activity', '2018-06-30 00:43:09', '', NULL, NULL),
(10, 'INDOOR', 'Indoor Activities', '2018-06-30 00:46:55', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_header`
--

CREATE TABLE `event_header` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_category_id` varchar(255) NOT NULL,
  `event_description` varchar(255) NOT NULL,
  `fee` int(11) DEFAULT NULL,
  `created_by` varchar(255) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `start_dt` datetime DEFAULT NULL,
  `last_updated_by` varchar(255) DEFAULT NULL,
  `last_updated_dt` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_header`
--

INSERT INTO `event_header` (`event_id`, `event_name`, `event_category_id`, `event_description`, `fee`, `created_by`, `created_dt`, `start_dt`, `last_updated_by`, `last_updated_dt`, `status`) VALUES
(7, 'Chess Event', 'INDOOR', 'Sportsfest Chess Event', NULL, 'Admin', '2018-06-30 00:47:34', '2018-06-16 00:47:00', NULL, NULL, 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
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

INSERT INTO `students` (`student_id`, `firstname`, `lastname`, `phone`, `email`, `balance`, `created_dt`, `created_by`, `last_updated_dt`, `last_updated_by`, `status`) VALUES
('1001', 'harry', 'inoferio ii', 9369416257, 'harryinoferio@gmail.com', 1000, '2018-06-03 13:06:27', 'kidbuntu', NULL, NULL, 'active'),
('sample', 'sample', 'sample', 9369416257, 'sample@email.com', 500, '2018-06-03 13:05:57', 'admin', NULL, NULL, 'active');

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
  `details` varchar(255) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `student_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`trans_id`, `details`, `userid`, `created_dt`, `student_id`, `status`) VALUES
(1, 'REGISTRATION', 'kidbuntu', '2018-06-03 13:11:56', '1001', 'COMPLETE');

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

--
-- Dumping data for table `transaction_item_assoc`
--

INSERT INTO `transaction_item_assoc` (`sequence_id`, `transid`, `transaction_typ_id`, `details`, `status`) VALUES
(1, 1, 'REG', 'Leadership Training', 'Registered'),
(2, 1, 'PMT', '300', 'Paid');

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
('admin', 'admin', 'admin', 'admin', 'admin', '2018-06-03 13:03:14', 'admin', NULL, NULL, 'active\r\n'),
('kidbuntu', 'harry', 'inoferio ii', 'admin', 'admin', '2018-06-03 13:03:38', 'admin', NULL, NULL, 'active');

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
  ADD KEY `created_by` (`created_by`),
  ADD KEY `last_updated_by` (`lastupdated_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event_category`
--
ALTER TABLE `event_category`
  MODIFY `sequence_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `event_header`
--
ALTER TABLE `event_header`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaction_item_assoc`
--
ALTER TABLE `transaction_item_assoc`
  MODIFY `sequence_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `tbl_users_created_by_const` FOREIGN KEY (`created_by`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `tbl_users_lastupdated_by_const` FOREIGN KEY (`lastupdated_by`) REFERENCES `users` (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
