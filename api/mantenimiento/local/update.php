<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../../config/database.php';
include '../local/local.php';

// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);

// prepare local object
$local = new Local($db);
 
// get id of local to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of local to be edited
   $local->loc_id = $data->loc_id;
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

// update the local
if($local->update($getdb)){
    // set response code - 200 ok
    http_response_code(201);

    // tell the user
    echo json_encode(array("message" => "local was updated."));
}
 
// if unable to update the local, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update local."));
}
