<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../usuarios/usuario.php';
 
// get database connection
$database = new Database();
$getdb=$_POST["getdb"];
$db = $database->getConnection($getdb);
 
// prepare usuario object
$usuario = new Usuario($db);
 
// set ID property of usuario to be edited
$usuario->per_id = $_POST['per_id'];
 
// set usuario property values
$usuario->per_id = $_POST['per_id'];
$usuario->usu_notperm = $_POST['usu_notperm'];
 
// update the usuario
if($usuario->updateMenuPermisos()){
 
    // set response code - 200 ok
    http_response_code(200);
 
    // tell the user
    echo json_encode(array("message" => "usuario was updated."));
}
 
// if unable to update the usuario, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update usuario."));
}
?>