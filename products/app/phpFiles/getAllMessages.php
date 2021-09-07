<?php
    session_start();

    $userId = $_SESSION["user_id"];

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {

          $sql = " SELECT * FROM ( 
                 
                 SELECT m.id, m.formUserId formUserId, m.toUserId toUserId, m.Message Message, m.currTime currTime, m.status status FROM chatBox m LEFT JOIN chatBox m2 ON 
          
                ((m.formUserId = m2.formUserId  AND m.toUserId = m2.toUserId ) OR   (m.formUserId = m2.formUserId AND m.toUserId = m2.toUserId )) 
                
                AND m.currTime < m2.currTime WHERE   (m.formUserId = '$userId' OR m.toUserId = '$userId') 
                
                AND m2.id IS NULL ) messages INNER JOIN users ON messages.formUserId =  users.userId"; 

        if( $sql ) {

            $exSql = mysqli_query($con, $sql);

            if( $exSql ) {

                $messages = array();
                 
                while($row = $exSql->fetch_assoc()) {

                   array_push($messages, $row);

                //    echo json_encode(  array( 'messages' => $row ) );
              
                }

                $return = array( 'messages' => $messages );

                echo json_encode(  $return );

            }
        }

    } 

?>