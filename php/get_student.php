<?php 
include 'conn.php';

$student_id = $_POST['id'];
$result = array();
$sql = "SELECT * FROM students WHERE student_id='$student_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()){
		echo json_encode($row);		
	}
}else{
	echo json_encode(false);
}
$conn->close();
?>