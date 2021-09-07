<?php

session_start();

$con = mysqli_connect("localhost","root","", "xchproduct");

if( $con ) {

    $userId = $_SESSION["user_id"];

    $login_time = $_SESSION['login_time'];

    if( isset( $_SESSION["user_id"]) )  { 

        $sessionTimeOut = true;

        $sql = "UPDATE users SET loginUser = 0 WHERE userId = '$userId' "; 

        if( $sql ) { 
            $exSql = mysqli_query($con, $sql);
        }

        session_unset($_SESSION["user_id"]);     // unset $_SESSION variable for the run-time 
        session_destroy();  

        echo json_encode( array( 'userLogout' => "true"  ) );

    }
}

?>