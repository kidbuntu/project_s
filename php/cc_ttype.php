<?php 
include 'conn.php';

$sql = "SELECT * FROM transaction_types";
$result = mysqli_query($conn,$sql);
$data = array();
while($row = mysqli_fetch_assoc($result)){
	$data[] = $row;
}
echo json_encode($data);
$conn->close();
?>