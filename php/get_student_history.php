<?php 
include 'conn.php';

$page = isset($_POST['page']) ? intval($_POST['page']) : 1;
$rows = isset($_POST['rows']) ? intval($_POST['rows']) : 10;
$offset = ($page-1)*$rows;
$result = array();
$id = $_GET['id'];

$sql = "select count(*) from transactions where student_id=$id";
$rs = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($rs);
$result["total"] = $row[0];
$sql = mysqli_query($conn,"SELECT trans_id, details, userid, DATE_FORMAT(created_dt, '%m-%d-%Y %h:%i %p') AS created_dt, status FROM transactions WHERE student_id=$id ORDER BY trans_id DESC limit $offset,$rows");

$items = array();

while($row = mysqli_fetch_object($sql)){
	array_push($items, $row);
}

$result["rows"] = $items;
echo json_encode($result);
 ?>