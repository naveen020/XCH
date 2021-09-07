<?php 
 
    session_start();

    $userId = $_SESSION["user_id"];

    $con = mysqli_connect("localhost","root","", "xchproduct");

    if( $con && $userId ) {

        $sql = "SELECT * FROM chatBox WHERE toUserId = '$userId' AND status = 2";

        $exSql = mysqli_query($con, $sql);

        if( $exSql ) {

            $Messages = array();

            while($row = $exSql->fetch_assoc()) {

                array_push($Messages, $row);
           
            }

            $return = array( 'MessageNotifications' => $Messages );

            echo json_encode(  $return );

        }
        
    }  else {

        echo json_encode(  array( 'success' => '0'  ) );

    }

?>