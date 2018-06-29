<?php

$event_name = htmlspecialchars($_REQUEST['event_name']);
$category_id = htmlspecialchars($_REQUEST['event_category_id']);
$event_desc = htmlspecialchars($_REQUEST['event_description']);
$start_dt = htmlspecialchars($_REQUEST['start_dt']);

include 'conn.php';

$sql = "INSERT INTO event_header(event_name,event_category_id,event_description,created_by,start_dt,status) VALUES('$event_name','$category_id','$event_desc','Admin','$start_dt','OPEN')";
$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'event_id' => mysqli_insert_id($conn),
		'event_category_id' => $category_id,
		'event_desc' => $event_desc,
		'start_dt' => $start_dt
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>