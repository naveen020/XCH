<?php 

$fromUserId = $_POST['fromUserId'];
$toUserId = $_POST['toUserId'];

if( !!$fromUserId  && !!$toUserId ) {

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $sql  = "SELECT * FROM chatBox WHERE formUserId= '$fromUserId' AND toUserId='$toUserId' 
    
     OR formUserId= '$toUserId' AND toUserId='$fromUserId'";

    $upSql = "UPDATE chatBox SET status = 0 WHERE formUserId= '$fromUserId' AND toUserId='$toUserId' AND status = 1 ";

    if( $upSql ) { 
        $upExSql = mysqli_query($con, $upSql);
    }
  
    $exSql = mysqli_query($con, $sql);

    if( $exSql  ) {

        $Messages = array();

        while($row = $exSql->fetch_assoc()) {

            array_push($Messages, $row);
       
        }

        $return = array( 'Messages' => $Messages );

        echo json_encode(  $return );

    } else {
        echo json_encode(  array( 'success' => '0'  ) );
    }

} else {

    echo json_encode(  array( 'success' => '0'  ) );

}

?>