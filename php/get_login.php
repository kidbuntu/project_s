<?php 
session_start();
include 'conn.php';

$userid = htmlspecialchars($_REQUEST['username']);
$pwd = htmlspecialchars(md5($_REQUEST['password']));

$sql = "SELECT userid,password FROM users WHERE userid='$userid'";
$result = $conn->query($sql);
// $data = array();
	if ($result->num_rows > 0) {
		while($row = mysqli_fetch_assoc($result)){
			$data = $row;
		}
		$_SESSION['user'] = $userid;
		if ($pwd == $data["password"]) {
			echo json_encode(true);
		}else{
			echo json_encode(false);	
		}
	}
$conn->close();
?>