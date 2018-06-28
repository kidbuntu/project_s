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
$sql = mysqli_query($conn,"SELECT eh.event_id,eh.event_name,ec.category_name,eh.event_description,eh.created_by,eh.created_dt,eh.start_dt,eh.last_updated_by,eh.last_updated_dt,eh.status FROM event_header eh INNER JOIN event_category ec ON eh.event_category_id = ec.category_id WHERE eh.status = 'OPEN' ORDER BY eh.created_dt DESC limit $offset,$rows");

$items = array();

while($row = mysqli_fetch_object($sql)){
	array_push($items, $row);
}

$result["rows"] = $items;
echo json_encode($result);
 ?>

 