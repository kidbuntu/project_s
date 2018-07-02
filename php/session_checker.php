<?php 
session_start();
$data = array('has_session'=> isset($_SESSION['user']));

if(isset($_SESSION['user'])){
	$obj = array($data,$_SESSION['user']);
	echo json_encode($obj);	
	// print_r($obj);
	// print_r($_SESSION['email']);
}
else{
	echo json_encode($data);
}
 ?>