<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../local/local.php';
 
// instantiate database and local object
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
 
// initialize object
$local = new Local($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
// make sure data is not empty
if(
    !empty($data->emp_id)&&
    !empty($data->loc_nom)&&
    !empty($data->ubi_id)
){
 
    // set local property values

    $local->emp_id = $data->emp_id;
    $local->loc_cod = $data->loc_cod;
    $local->loc_nom = $data->loc_nom;
    $local->loc_dir = $data->loc_dir;
    $local->ubi_id = $data->ubi_id;
    $local->loc_ema = $data->loc_ema;
    $local->loc_tel = $data->loc_tel;
    $local->loc_cel = $data->loc_cel;
    $local->loc_est = $data->loc_est;

    // create the local
    if($local->create($getdb)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "local was created."));
    }
 
    // if unable to create the local, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create local.","error" => "503"));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create local. Data is incomplete.","error" => "400"));
}
?>