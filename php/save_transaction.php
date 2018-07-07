<?php
session_start();
$id = htmlspecialchars($_REQUEST['tr_id']);
$ttype = htmlspecialchars($_REQUEST['ttype']);
$remarks = htmlspecialchars($_REQUEST['remarks']);
$usr = $_SESSION['user'];

include 'conn.php';

$sql = "UPDATE transactions SET trans_type='$ttype', details='$remarks', userid='$usr', status='COMPLETE' WHERE trans_id='$id'";

$result = mysqli_query($conn,$sql);
if ($result){
	echo json_encode(array(
		'trans_id' => $id,
		'trans_type' => $ttype,
		'details' => $remarks,
		'status' => 'COMPLETE',
	));
} else {
	echo json_encode(array('errorMsg'=>'Some errors occured.'));
}
?>