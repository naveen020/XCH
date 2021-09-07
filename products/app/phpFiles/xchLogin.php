<?php

session_start();

$_SESSION["user_id"] = "";
$_SESSION["user_name"] = "";

if (isset( $_GET['userEmail'] ) &&  isset($_GET['userPass'])) {

    $userEmail = $_GET['userEmail'];

    $userPass = $_GET['userPass'];

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {
 
        $sql =  "SELECT * FROM users WHERE email = '$userEmail' AND pws = '$userPass' "; 

        if( $sql ) {

            $exSql = mysqli_query($con, $sql);
        
            if( $exSql ) {

                $result = mysqli_fetch_array( $exSql );

                if( $result[0] ){

                    $userId = $result['userId'];

                    $userName = $result['firstName'];

                    $sql = "UPDATE users SET loginUser = 1 WHERE userId = '$userId' ";

                    if( $sql ) { 
                        $exSql = mysqli_query($con, $sql);
                    }

                    $userExist = true;
                    $_SESSION["user_id"] = $userId;
                    $_SESSION["user_name"] = $userName;
                    $_SESSION['login_time'] = time();  

                    $return = array( 'result' => $result , 'userExist' => $userExist, 'SessionTime' => time() );

                    echo json_encode(  $return );

                } 

            } 
        } 

    } 

    if( $userExist == false ) {

        echo json_encode( array( 'userExist' => $userExist ) );

    }
}

?>