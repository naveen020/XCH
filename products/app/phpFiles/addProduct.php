<?php 
session_start();
$bookName = $_POST['bookName'];
$bookAuthor = $_POST['bookAuthor'];
$bookStory = $_POST['bookStory'];
$bookPrice = $_POST['bookPrice'];
$bookLocation = $_POST['bookLocation'];
$bookDescription = $_POST['bookDescription'];
$imgName = $_FILES['file']['name'];
$userId = $_SESSION["user_id"];

if( $_POST['bookName'] && $_POST['bookPrice'] && $_POST['bookLocation'] ) {

    $con = mysqli_connect("localhost","root","", "xchproduct");

    if( $con ) {

        $new_product_id = uniqid();

        $target = $_SERVER['DOCUMENT_ROOT'].'/xch/products/app/product_Img/'.$new_product_id. '_' .$_FILES['file']['name'];
        move_uploaded_file( $_FILES['file']['tmp_name'], $target);

        $created_date = date("Y-m-d H:i:s");

        $sql = "INSERT INTO Pbooks (productId, pbookName, pbookAuthor , pbookStory, pbookPrice, pbookLocation, pbookDescription, pfileName, pbookTime) 
                            values ( '$new_product_id','$bookName' ,'$bookAuthor', '$bookStory', '$bookPrice', '$bookLocation', '$bookDescription', '$imgName', '$created_date' ) ";
                
        $exSql = mysqli_query($con, $sql);

        if( $exSql ) {
            $sql = "INSERT INTO PURelations ( userId, productId, productType) 
                            values ( '$userId', '$new_product_id', 8004 ) ";
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

}  else {

    echo json_encode(  array( 'fieldsEmpty' => '0'  ) );

}

?>