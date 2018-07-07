<?php

$id = htmlspecialchars($_REQUEST['student_id']);

include 'conn.php';

$sql = "DELETE FROM students WHERE student_id='$id'";
$result = $conn->query($sql);
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>