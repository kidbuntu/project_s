<?php
session_start();

$sequence_id = htmlspecialchars($_REQUEST['sequence_id']);
$category_name = htmlspecialchars($_REQUEST['category_name']);
$category_desc = htmlspecialchars($_REQUEST['category_description']);
$user = $_SESSION['user'];

include 'conn.php';

$sql = "UPDATE event_category SET category_name='$category_name',category_description='$category_desc',last_updated_dt=NOW(),last_updated_by = '$user' WHERE sequence_id='$sequence_id'";

$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'sequence_id' => $sequence_id,
		'category_name' => $category_name,
		'category_description' => $category_desc,
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>