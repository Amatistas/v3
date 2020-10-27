<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../usuarios/usuario.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
 
// initialize object
$usuario = new Usuario($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
// make sure data is not empty
if(
    !empty($data->usu_nom) &&
    !empty($data->usu_ema) &&
    !empty($data->usu_cla) &&
    !empty($data->usu_jer) &&
    !empty($data->usu_est) //&&
    //!empty($data->usu_created)

){
 
    // set usuario property values
    $usuario->usu_nom = $data->usu_nom;
    $usuario->usu_ema = $data->usu_ema;
    $usuario->usu_cla = $data->usu_cla;
    $usuario->usu_jer = $data->usu_jer;
    $usuario->usu_est = $data->usu_est;
    //$usuario->usu_created = date('Y-m-d H:i:s');
    // create the usuario
    if($usuario->create($getdb)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "usuario was created."));
    }
 
    // if unable to create the usuario, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create usuario.","error" => "400"));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create usuario. Data is incomplete.","error" => "400"));
}
?>