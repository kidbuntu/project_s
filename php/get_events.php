<?php 
include 'conn.php';

$page = isset($_POST['page']) ? intval($_POST['page']) : 1;
$rows = isset($_POST['rows']) ? intval($_POST['rows']) : 10;
$offset = ($page-1)*$rows;
$result = array();

$sql = "select count(*) from event_header";
$rs = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($rs);
$result["total"] = $row[0];
$sql = mysqli_query($conn,"SELECT event_id,event_name,event_category_id,event_description,fee,created_by,created_dt,start_dt,last_updated_by,last_updated_dt,status FROM event_header ORDER BY created_dt DESC limit $offset,$rows");

$items = array();

while($row = mysqli_fetch_object($sql)){
	array_push($items, $row);
}

$result["rows"] = $items;
echo json_encode($result);
 ?>

 