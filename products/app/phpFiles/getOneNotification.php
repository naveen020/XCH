<?php 
session_start();

$userId = $_SESSION["user_id"];

$sendUser_Id = $_POST['sendUserId'];
$sendUserProductId = $_POST['sendUserProductId'];
$selectedProductId = $_POST['selectedProductId'];

$con = mysqli_connect("localhost","root","", "xchproduct");

if( $userId ) {

    $sql = "SELECT PURelations.userId userId, PURelations.productId productId, Pbooks.pbookName pbookName, Pbooks.pbookPrice pbookPrice, 
    Pbooks.pbookLocation pbookLocation, Pelectronics.peleName peleName,  Pelectronics.pelePrice pelePrice, Pelectronics.peleLocation peleLocation, 
    Pbooks.pfileName bookFileName, Pelectronics.pfileName eleFileName FROM PURelations LEFT JOIN Pbooks ON PURelations.productId  = Pbooks.productId 
    LEFT JOIN Pelectronics ON PURelations.productId  = Pelectronics.eleId WHERE PURelations.userId = '$sendUser_Id' 
    AND PURelations.productId = '$sendUserProductId' ORDER BY productId DESC"; 

    $selSql = "SELECT PURelations.userId userId, PURelations.productId productId, Pbooks.pbookName pbookName, Pbooks.pbookPrice pbookPrice, 
    Pbooks.pbookLocation pbookLocation, Pelectronics.peleName peleName,  Pelectronics.pelePrice pelePrice, Pelectronics.peleLocation peleLocation, 
    Pbooks.pfileName bookFileName, Pelectronics.pfileName eleFileName FROM PURelations LEFT JOIN Pbooks ON PURelations.productId  = Pbooks.productId 
    LEFT JOIN Pelectronics ON PURelations.productId  = Pelectronics.eleId WHERE PURelations.userId = '$userId' 
    AND PURelations.productId = '$selectedProductId' ORDER BY productId DESC"; 

    $userSql = "SELECT * FROM users WHERE userId = '$sendUser_Id'";

    $exSql = mysqli_query($con, $sql);

    $exSelSql = mysqli_query($con, $selSql);

    $userSelSql = mysqli_query($con, $userSql);

    if( $exSql && $exSelSql && $userSql ) {

        $sendUserProduct = array();

        $currUserProduct = array();

        $selUserData = array();

        while($row = $exSql->fetch_assoc()) {

            array_push($sendUserProduct, $row);
       
        }

        while($row = $exSelSql->fetch_assoc()) {

            array_push( $currUserProduct, $row );
       
        }

        while($row = $userSelSql->fetch_assoc()) {

            array_push( $selUserData, $row );

        }

        $notificationDetails = array( 'sendUserProduct' => $sendUserProduct, 'currUserProduct' => $currUserProduct, 'selUserData' => $selUserData );

        echo json_encode(  $notificationDetails );

    }
    
}  else {

    echo json_encode(  array( 'success' => '0'  ) );

}

?>