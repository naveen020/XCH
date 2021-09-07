<?php

    $userId = $_GET['userId'];

    $userName = $_GET['userName'];

    $con = mysqli_connect("localhost","root","", "xchproduct");

    $userExist = false;

    if( $con  ) {

        $sql = "SELECT PURelations.userId userId, PURelations.productId productId, Pbooks.pbookName pbookName, Pbooks.pbookPrice pbookPrice, 
                Pbooks.pbookLocation pbookLocation, Pelectronics.peleName peleName,  Pelectronics.pelePrice pelePrice, Pelectronics.peleLocation peleLocation, 
                Pbooks.pfileName bookFileName, Pelectronics.pfileName eleFileName FROM PURelations LEFT JOIN Pbooks ON PURelations.productId  = Pbooks.productId 
                LEFT JOIN Pelectronics ON PURelations.productId  = Pelectronics.eleId WHERE PURelations.userId = '$userId' ORDER BY productId DESC"; 

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