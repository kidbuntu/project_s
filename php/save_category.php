<?php

$category_name = htmlspecialchars($_REQUEST['category_name']);
$category_desc = htmlspecialchars($_REQUEST['category_description']);

include 'conn.php';

$sql = "INSERT INTO event_category(category_name,category_description) VALUES('$category_name','$category_desc')";
$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'category_name' => $category_name,
		'category_description' => $category_desc
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>