<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../mantenimiento/mantenimiento.php';
 
// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
  
// prepare mantenimiento object
$mantenimiento = new Mantenimiento($db);
 
// get mantenimiento id
$data = json_decode(file_get_contents("php://input"));

// delete the mantenimiento
if($mantenimiento->delete($getdb,$data->tb,$data->col,$data->ident)){

    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "mantenimiento was deleted."));

}
 
// if unable to delete the mantenimiento
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete mantenimiento."));
}
?>