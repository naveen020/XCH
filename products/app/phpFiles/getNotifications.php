<?php 
session_start();

$userId = $_SESSION["user_id"];

$con = mysqli_connect("localhost","root","", "xchproduct");

if( $userId ) {

    $sql = "SELECT * FROM Notifications WHERE currentUserId = '$userId'";

    $upSql = "UPDATE Notifications SET NotificationStatus = 0 WHERE currentUserId = '$userId' ";

    $exSql = mysqli_query($con, $sql);

    $exUpSql = mysqli_query($con, $upSql);

    if( $exSql ) {

        $Notifications = array();

        while($row = $exSql->fetch_assoc()) {

            array_push($Notifications, $row);
       
        }

        $return = array( 'notifications' => $Notifications );

        echo json_encode(  $return );

    }
    
}  else {

    echo json_encode(  array( 'success' => '0'  ) );

}

?>