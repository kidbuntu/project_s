<?php

$id = intval($_REQUEST['sequence_id']);

include 'conn.php';

$sql = "DELETE FROM event_category WHERE sequence_id=$id";
$result = $conn->query($sql);
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>