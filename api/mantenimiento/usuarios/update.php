<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../../config/database.php';
include '../usuarios/usuario.php';

// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);

// prepare usuario object
$usuario = new Usuario($db);
 
// get id of usuario to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of usuario to be edited
   $usuario->usu_id = $data->usu_id;
 
   // set usuario property values
   $usuario->usu_nom = $data->usu_nom;
   $usuario->usu_ema = $data->usu_ema;
   $usuario->usu_cla = $data->usu_cla;
   $usuario->usu_jer = $data->usu_jer;
   $usuario->usu_est = $data->usu_est;
   //$usuario->usu_created = date('Y-m-d H:i:s');

// update the usuario
if($usuario->update($getdb)){
 
    // set response code - 200 ok
    http_response_code(201);
 
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
