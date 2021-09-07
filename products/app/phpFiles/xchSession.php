<?php

session_start();

$con = mysqli_connect("localhost","root","", "xchproduct");

if( $con && isset( $_SESSION["user_id"] ) && ( $_SESSION['login_time'] ) ) {

    $userId = $_SESSION["user_id"];

    $login_time = $_SESSION['login_time'];

    $check_time = time();

    $userName = $_SESSION["user_name"];

    if( isset( $_SESSION["user_id"]) && $login_time )  {

        $sessionTimeOut = false;

        if( ($check_time -  $login_time) > 600 ) {

            $sql = "UPDATE users SET loginUser = 0 WHERE userId = '$userId' ";

            if( $sql ) { 
                $exSql = mysqli_query($con, $sql);
            }

            $sessionTimeOut = true;

            echo json_encode( array( 'sessionTimeOut' =>   $sessionTimeOut ) );

        } else {

            $_SESSION['login_time'] = $check_time;

            echo json_encode( array( 'sessionTimeOut' =>   $sessionTimeOut , 'userName' => $userName , 'userId' => $userId ,'userLoginTime' => ($check_time -  $login_time) ) );  
           
        }

    } else {
        echo json_encode( array( 'userlogin' => '0' ) );
    }

} else {
    echo json_encode( array( 'userlogin' => false ) );
}
?>