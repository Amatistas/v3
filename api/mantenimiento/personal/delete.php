<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../personal/personal.php';
 
// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
  
// prepare personal object
$personal = new Personal($db);
 
// get personal id
$data = json_decode(file_get_contents("php://input"));
// set personal id to be deleted
$personal->per_id = $data->per_id;
 
// delete the personal
if($personal->delete($getdb)){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "personal was deleted."));
}
 
// if unable to delete the personal
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete personal."));
}
?>