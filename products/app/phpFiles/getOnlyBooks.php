<?php

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con ) {

          $sql = "SELECT * FROM Pbooks ORDER BY pbookTime DESC";

        if( $sql ) {

            $exSql = mysqli_query($con, $sql);

            if( $exSql ) {

                $products = array();
                 
                while($row = $exSql->fetch_assoc()) {

                   array_push($products, $row);
              
                }
            
                $return = array( 'bkResult' => $products );

                echo json_encode(  $return );

            }
        }

    }

?>