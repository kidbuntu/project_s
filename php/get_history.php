<?php 
include 'conn.php';

$itemid = mysqli_real_escape_string($conn,$_REQUEST['transid']);
$rs = mysqli_query($conn,"SELECT tia.sequence_id, tt.description, tia.details, tia.status FROM transaction_item_assoc tia INNER JOIN transaction_types tt ON tia.transaction_typ_id=tt.transaction_type_id WHERE transid='$itemid'");

// select tia.sequence_id, tt.description, tia.details, tia.status from transaction_item_assoc tia INNER JOIN transaction_types tt ON tia.transaction_typ_id=tt.transaction_type_id
$items = array();
while($row = mysqli_fetch_object($rs)){
    array_push($items, $row);
}
echo json_encode($items);
$conn->close();
?>