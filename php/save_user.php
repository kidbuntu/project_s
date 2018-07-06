<?php
session_start();
$stdid = htmlspecialchars($_REQUEST['stdid']);
$firstname = htmlspecialchars($_REQUEST['firstname']);
$lastname = htmlspecialchars($_REQUEST['lastname']);
$type = htmlspecialchars($_REQUEST['type']);
$pwd = htmlspecialchars(md5($_REQUEST['password']));
$usr = $_SESSION['user'];

include 'conn.php';

$sql = "INSERT INTO users (userid,firstname,lastname,password,type,created_by,status) VALUES ('$userid','$firstname','$lastname','$pwd','$type','$usr','Active')";

$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'userid' => $userid,
		'firstname' => $firstname,
		'lastname' => $lastname,
		'type' => $type,
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>