<?php
if (isset( $_GET['userId'] ) &&  isset($_GET['userName'])) {

    $userId = $_GET['userId'];

    $userName = $_GET['userName'];

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {

        $eleSql = "SELECT * FROM Pelectronics INNER JOIN PURelations on PURelations.productId  = Pelectronics.eleId WHERE NOT PURelations.userId = '$userId' "; 

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

}

?>