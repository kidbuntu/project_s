<?php 
include 'conn.php';

$sql = "SELECT student_id, CONCAT(lastname,', ',firstname,' - ',phone) AS info FROM students";
$result = mysqli_query($conn,$sql);
$data = array();
while($row = mysqli_fetch_assoc($result)){
	$data[] = $row;
}
echo json_encode($data);
$conn->close();
?>