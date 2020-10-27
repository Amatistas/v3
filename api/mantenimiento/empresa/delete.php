<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../empresa/empresa.php';
 
// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
  
// prepare empresa object
$empresa = new empresa($db);
 
// get empresa id
$data = json_decode(file_get_contents("php://input"));
 
// set empresa id to be deleted
$empresa->emp_id = $data->emp_id;
 
// delete the empresa
if($empresa->delete($getdb)){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "empresa was deleted."));
}
 
// if unable to delete the empresa
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete empresa."));
}
?>