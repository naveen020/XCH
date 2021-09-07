
<?php


$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$regEmail = $_POST['regEmail'];
$regPsw = $_POST['regPsw'];
$regRepsw = $_POST['regRepsw'];
$loginUser = 0;
$notifyNum = 0;
$numProducts = 0;

$con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {
 
        $sql =  "SELECT * FROM users WHERE email = '$regEmail'"; 

        if( $sql ) {

            $exSql = mysqli_query($con, $sql);
        
            if( $exSql ) {

                $result = mysqli_fetch_array( $exSql );

                if( !!$result[0] ){

                    $userExist = true;

                    echo json_encode(  array( 'userExist' => $userExist ) );

                } else {
       
                    // Get the new user_id
                    $new_user_id = uniqid();

                    $sql = "INSERT INTO users (userId, firstName, lastName , email, pws, rePws, loginUser, notifyNum, numProducts) 
                            values ( '$new_user_id','$firstName' ,'$lastName', '$regEmail', '$regPsw', '$regRepsw', '$loginUser', '$notifyNum', '$numProducts') ";
                
                        
                    $exSql = mysqli_query($con, $sql);
                                
                     echo json_encode(  array( 'success' => '1' ) );



                }

            } 
        } 
    
    } 
?>