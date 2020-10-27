<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../local/local.php';
 
// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
  
// prepare local object
$local = new Local($db);
 
// get local id
$data = json_decode(file_get_contents("php://input"));
 
// set local id to be deleted
$local->loc_id = $data->loc_id;
 
// delete the local
if($local->delete($getdb)){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "local was deleted."));
}
 
// if unable to delete the local
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete local."));
}
?>