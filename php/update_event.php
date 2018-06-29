<?php

$id = htmlspecialchars($_REQUEST['event_id']);
$event_name = htmlspecialchars($_REQUEST['event_name']);
$category_id = htmlspecialchars($_REQUEST['event_category_id']);
$event_desc = htmlspecialchars($_REQUEST['event_description']);
$start_dt = htmlspecialchars($_REQUEST['start_dt']);

include 'conn.php';

$sql = "UPDATE event_header SET event_name='$event_name',event_category_id='$category_id',event_description='$event_desc',start_dt='$start_dt' WHERE event_id=$id";

$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'event_id' => $id,
		'event_category_id' => $category_id,
		'event_desc' => $event_desc,
		'start_dt' => $start_dt
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>