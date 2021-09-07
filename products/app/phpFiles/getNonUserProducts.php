<?php

if (isset( $_GET['userId'] ) &&  isset($_GET['userName'])) {

    $userId = $_GET['userId'];

    $userName = $_GET['userName'];

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {

          $sql = "SELECT * FROM Pbooks INNER JOIN PURelations on PURelations.productId  = Pbooks.productId WHERE NOT PURelations.userId = '$userId' "; 

          $eleSql = "SELECT * FROM Pelectronics INNER JOIN PURelations on PURelations.productId  = Pelectronics.eleId WHERE NOT PURelations.userId = '$userId' "; 


        if( $sql && $eleSql) {

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

                $return = array( 'result' => $products, 'eleResults' => $eleProducts);

                echo json_encode(  $return );

            }
        }

    } 
}

?>