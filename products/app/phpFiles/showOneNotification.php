<?php 
session_start();

$userId = $_SESSION["user_id"];

$selectedProductId = $_POST['selectedProductId'];

$con = mysqli_connect("localhost","root","", "xchproduct");

if( $userId ) {

    $sql = "SELECT * FROM PURelations LEFT JOIN Pbooks ON PURelations.productId  = Pbooks.productId 
    LEFT JOIN Pelectronics ON PURelations.productId  = Pelectronics.eleId WHERE PURelations.productId = '$selectedProductId'"; 

    $exSql = mysqli_query($con, $sql);

    if( $exSql  ) {

        $sendUserProduct = array();

        while($row = $exSql->fetch_assoc()) {

            array_push($sendUserProduct, $row);

        }

        $notificationDetails = array( 'sendUserProduct' => $sendUserProduct );

        echo json_encode(  $notificationDetails );

    }
    
}  else {

    echo json_encode(  array( 'success' => '0'  ) );

}

?>