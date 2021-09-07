<?php 
session_start();

$sendUserProductId = $_POST['sendUserProductId'];

if( $sendUserProductId ) {

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $sql = "DELETE FROM Notifications WHERE sendUserProductId = '$sendUserProductId' ";
    
    $exSql = mysqli_query($con, $sql);

    if( $exSql ) {
        echo json_encode(  array( 'success' => '1'  ) );
    }

}  else {

    echo json_encode(  array( 'success' => '0'  ) );

}

?>