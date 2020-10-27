<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../usuarios/usuario.php';
 
// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
  
// prepare usuario object
$usuario = new Usuario($db);
 
// get usuario id
$data = json_decode(file_get_contents("php://input"));
 
// set usuario id to be deleted
$usuario->usu_id = $data->usu_id;
 
// delete the usuario
if($usuario->delete()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "usuario was deleted."));
}
 
// if unable to delete the usuario
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to delete usuario."));
}
?>