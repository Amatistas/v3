<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../tipo_sujeto/tipo_sujeto.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
$tipo_sujeto = new Tiposujeto($db);
 

// query tipo_sujeto
$stmt = $tipo_sujeto->read($getdb);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // tipo_sujeto array
    $tipo_sujeto_arr=array();
    $tipo_sujeto_arr["data"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $tipo_sujeto_item=array(
        "ts_id" => $ts_id,
        "ts_des" => $ts_des
        );
 
        array_push($tipo_sujeto_arr["data"], $tipo_sujeto_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show tipo_sujeto data in json format
    echo json_encode($tipo_sujeto_arr);
}
 
// no tipo_sujeto found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No tipo_sujetos found.")
    );
}