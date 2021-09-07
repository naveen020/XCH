<?php 
session_start();
$fromUserId = $_POST['fromUserId'];
$toUserId = $_POST['toUserId'];
$message = $_POST['message'];

if( !!$fromUserId  && !!$toUserId && !!$message ) {

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $created_date = date("Y-m-d H:i:s");

    $sql = "INSERT INTO chatBox ( formUserId, toUserId, Message , currTime, status ) 
            values ( '$fromUserId','$toUserId' ,'$message', '$created_date', 1 ) ";

    $latestSql = "SELECT * FROM chatBox WHERE formUserId= '$fromUserId' AND toUserId='$toUserId' AND status = 1 ";

    $upSql = "UPDATE chatBox SET status = 2 WHERE formUserId= '$fromUserId' AND toUserId='$toUserId' AND status = 1 ";

    $exSql = mysqli_query($con, $sql);

    $upExSql = mysqli_query($con, $latestSql);

    $upStatusSql = mysqli_query($con, $upSql);

    if( $exSql && $upExSql ) {

        $latestMessages = array();

        while($row = $upExSql->fetch_assoc()) {

            array_push($latestMessages, $row);
       
        }
        echo json_encode(  array( 'latestMessages' => $latestMessages  ) );

    } else {
        echo json_encode(  array( 'success' => '0'  ) );
    }

} else {

    echo json_encode(  array( 'success' => '0'  ) );

}


?>