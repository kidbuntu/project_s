<?php 
session_start();
include 'conn.php';

// $student_id = $_POST['id'];
// $result = array();
// $sql = "SELECT * FROM students WHERE student_id='$student_id'";
// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
// 	while($row = $result->fetch_assoc()){
// 		echo json_encode($row);		
// 	}
// }else{
// 	echo json_encode(false);
// }
// $conn->close();

$userid = $_SESSION['user'];

$student_id = $_POST['id'];
$result = array();

$sql = "INSERT INTO transactions (userid,student_id,status) VALUES('$userid','$student_id','OPEN')";
$conn->query($sql);
$last_id = $conn->insert_id;

$sql = "SELECT * FROM students WHERE student_id='$student_id'";

$result = $conn->query($sql);
$data = array();

if ($result->num_rows > 0) {
	
	while($row = $result->fetch_assoc()){
		// echo json_encode($row);
		$data[] = $row;		
	}
	$data[0]["trans_id"] = json_encode($last_id);
	echo json_encode($data);
}else{
	echo json_encode(false);
}
$conn->close();
?>