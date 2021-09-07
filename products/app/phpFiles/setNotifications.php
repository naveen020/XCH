<?php 
session_start();
$sendUserId = $_POST['sendUserId'];
$sendUserProductId = $_POST['sendUserProductId'];
$currentUserId = $_POST['currentUserId'];
$selectedProductId = $_POST['selectedProductId'];

if( $sendUserId && $sendUserProductId  && $currentUserId && $selectedProductId ) {

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $created_date = date("Y-m-d H:i:s");

    $sql = "INSERT INTO Notifications (sendUserId, sendUserProductId, currentUserId , selectedProductId, NotificationStatus, favoriteProduct, selectedTime ) 
                        values ( '$sendUserId','$sendUserProductId' ,'$currentUserId', '$selectedProductId', 1 , 0, '$created_date' ) ";
            
    $exSql = mysqli_query($con, $sql);

    if( $exSql ) {
        echo json_encode(  array( 'success' => '1'  ) );
    }

}  else {

    echo json_encode(  array( 'success' => '0'  ) );

}

?>