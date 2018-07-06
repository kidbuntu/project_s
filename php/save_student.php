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

$sql = "INSERT INTO students (student_id,firstname,lastname,dob,phone,email,created_by,status) VALUES ('$stdid','$fname','$lname','$dob','$phone','$email','$usr','Active')";

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