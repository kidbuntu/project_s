<?php
session_start();

$userid = htmlspecialchars($_REQUEST['userid']);
$firstname = htmlspecialchars($_REQUEST['firstname']);
$lastname = htmlspecialchars($_REQUEST['lastname']);
$type = htmlspecialchars($_REQUEST['type']);
$pwd = htmlspecialchars(md5($_REQUEST['password']));
$usr = $_SESSION['user'];

include 'conn.php';

$sql = "UPDATE users SET userid='$userid',firstname='$firstname',lastname='$lastname',password='$pwd',type='$type',lastupdated_by='$usr',lastupdated_dt=NOW(),status='Active' WHERE userid='$userid'";

// echo $sql;

$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'userid' => $userid,
		'firstname' => $firstname,
		'lastname' => $lastname,
		'type' => $type,
		'password' => $pwd
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>