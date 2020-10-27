<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../almacenes/almacen.php';
 
// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
  
// prepare almacen object
$almacen = new Almacen($db);
 
// get almacen id
$data = json_decode(file_get_contents("php://input"));
// set almacen id to be deleted
$almacen->alm_id = $data->alm_id;
 
// delete the almacen
if($almacen->delete($getdb)){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "almacen was deleted."));
}
 
// if unable to delete the almacen
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete almacen."));
}
?>