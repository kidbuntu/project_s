<?php 
$amt = htmlspecialchars($_REQUEST["amt"]);
echo json_encode($amt);
 ?>