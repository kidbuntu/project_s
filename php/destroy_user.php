<?php

$id = htmlspecialchars($_REQUEST['userid']);

include 'conn.php';

$sql = "DELETE FROM users WHERE userid='$id'";
$result = $conn->query($sql);
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>