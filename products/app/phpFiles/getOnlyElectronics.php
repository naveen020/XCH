<?php

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con ) {

          $eleSql = "SELECT * FROM Pelectronics ORDER BY peleTime DESC";

        if( $eleSql ) {

            $eleExSql = mysqli_query($con, $eleSql);

            if( $eleExSql ) {

                $eleProducts = array();
            
                while($row = $eleExSql->fetch_assoc()) {

                    array_push($eleProducts, $row);
               
                 }

                $return = array( 'eleResults' => $eleProducts );

                echo json_encode(  $return );

            }
        }

    } 

?>