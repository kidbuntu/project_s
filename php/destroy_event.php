<?php

$id = intval($_REQUEST['event_id']);

include 'conn.php';

$sql = "DELETE FROM event_header WHERE event_id=$id";
$result = $conn->query($sql);
if ($result){
	echo json_encode(array('success'=>true));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>