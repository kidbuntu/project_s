<?php
session_start();
$stdid = htmlspecialchars($_REQUEST['student_id']);
$fname = htmlspecialchars($_REQUEST['firstname']);
$lname = htmlspecialchars($_REQUEST['lastname']);
$dob = htmlspecialchars($_REQUEST['dob']);
$phone = htmlspecialchars($_REQUEST['phone']);
$email = htmlspecialchars($_REQUEST['email']);
$usr = $_SESSION['user'];

include 'conn.php';

$sql = "UPDATE students SET student_id='$stdid',firstname='$fname',lastname='$lname',dob='$dob',phone='$phone',email='$email',created_by='$usr',status='Active' WHERE student_id='$stdid'";
// echo $sql;

$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'student_id' => $stdid,
		'firstname' => $fname,
		'lastname' => $lname,
		'phone' => $phone,
		'email' => $email,
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>