<?php 
session_start();
$fromUserId = $_POST['fromUserId'];
$toUserId = $_POST['toUserId'];

if( !!$fromUserId  && !!$toUserId ) {

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $latestSql = "SELECT * FROM chatBox WHERE formUserId= '$toUserId' AND toUserId='$fromUserId' AND status = 1 ";

    $sql = "UPDATE chatBox SET status = 0 WHERE formUserId= '$toUserId' AND toUserId='$fromUserId' AND status = 1 ";

    $upExSql = mysqli_query($con, $latestSql);

    $exSql = mysqli_query($con, $sql);

    if( $exSql && $upExSql ) {

        $latestMessages = array();

        while($row = $upExSql->fetch_assoc()) {

            array_push($latestMessages, $row);
       
        }
        echo json_encode(  array( 'Messages' => $latestMessages  ) );

    } else {
        echo json_encode(  array( 'success' => '0'  ) );
    }

} else {

    echo json_encode(  array( 'success' => '0'  ) );

}


?>