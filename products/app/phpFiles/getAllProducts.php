<?php

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {

          $sql = "SELECT * FROM Pbooks ORDER BY pbookTime DESC"; 

          $eleSql = "SELECT * FROM Pelectronics ORDER BY peleTime DESC"; 

        if( $sql && $eleSql ) {

            $exSql = mysqli_query($con, $sql);

            $eleExSql = mysqli_query($con, $eleSql);

            if( $exSql && $eleExSql ) {

                $products = array();

                $eleProducts = array();
                 
                while($row = $exSql->fetch_assoc()) {

                   array_push($products, $row);
              
                }
            
                while($row = $eleExSql->fetch_assoc()) {

                    array_push($eleProducts, $row);
               
                 }


                $return = array( 'bkResult' => $products, 'eleResults' => $eleProducts );

                echo json_encode(  $return );

            }
        }

    } 

?>