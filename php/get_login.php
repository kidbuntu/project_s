<?php 
session_start();
include 'conn.php';

$userid = htmlspecialchars($_REQUEST['username']);
$pwd = htmlspecialchars($_REQUEST['password']);

$sql = "SELECT * FROM users WHERE userid='$userid' AND password='$pwd'";
$result = $conn->query($sql);
$data = array();

	if ($result->num_rows > 0) {
		// while($row = mysqli_fetch_assoc($result)){
		// 	$data[] = $row;
		// }
		$_SESSION['user'] = $userid;
		echo json_encode(true);
	}else{
		echo json_encode(false);
	}

// echo json_encode($data);
$conn->close();
?>