<?php
if (isset( $_GET['userId'] ) &&  isset($_GET['userName'])) {

    $userId = $_GET['userId'];

    $userName = $_GET['userName'];

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {

        $sql = "SELECT * FROM Pbooks INNER JOIN PURelations ON PURelations.productId  = Pbooks.productId WHERE NOT PURelations.userId = '$userId' "; 

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

}

?>