<?php 
session_start();
$eleType = $_POST['eleType'];
$eleName = $_POST['eleName'];
$elePrice = $_POST['elePrice'];
$eleFeature = $_POST['eleFeature'];
$eleLocation = $_POST['eleLocation'];
$eleDescription = $_POST['eleDescription'];
$imgName = $_FILES['file']['name'];
$userId = $_SESSION["user_id"];

if( $_POST['eleName'] && $_POST['elePrice'] && $_POST['eleLocation'] ) {

    $con = mysqli_connect("localhost","root","", "xchproduct");

    if( $con ) {

        $new_product_id = uniqid();

        $target = $_SERVER['DOCUMENT_ROOT'].'/xch/products/app/product_Img/'.$new_product_id. '_' .$_FILES['file']['name'];
        move_uploaded_file( $_FILES['file']['tmp_name'], $target);

        $created_date = date("Y-m-d H:i:s");

        $sql = "INSERT INTO Pelectronics (eleId, peleType, peleName , pelePrice, peleFeature, peleLocation, peleDescription, pfileName, peleTime) 
                            values ( '$new_product_id','$eleType' ,'$eleName', '$elePrice', '$eleFeature', '$eleLocation', '$eleDescription', '$imgName', '$created_date' ) ";
                
        $exSql = mysqli_query($con, $sql);
        if( $exSql ) {
            
            $sql = "INSERT INTO PURelations ( userId, productId, productType) 
                            values ( '$userId', '$new_product_id', 7702 ) ";
            if( $sql ) {

                $exSql = mysqli_query($con, $sql);
                echo json_encode(  array( 'success' => '1' ) );

            } else {

                echo json_encode(  array( 'success' => 0, 
                'message' => 'Unable to Adding the product.' ) );

            }
            
        } else {

            echo json_encode(  array( 'success' => 0, 
            'message' => 'Unable to Adding the product.' ) );

        }

    }

}

?>