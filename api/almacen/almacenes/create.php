<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../almacenes/almacen.php';
 
// instantiate database and almacen object
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
 
// initialize object
$almacen = new Almacen($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
if(!isset($data->alm_con)){
    $data->alm_con = "0";
};
if(!isset($data->alm_est)){
    $data->alm_est = "0";
};
// make sure data is not empty
if(
    !empty($data->emp_id)&&
    !empty($data->loc_id)&&
    !empty($data->alm_cod)&&
    !empty($data->alm_nom)&&
    !empty($data->per_id)&&
    !empty($data->alm_dir)&&
    !empty($data->ubi_id)&&
    !empty($data->alm_tel)&&
    !empty($data->alm_est)
){
    // set almacen property values
    $almacen->emp_id = $data->emp_id;
    $almacen->loc_id = $data->loc_id;
    $almacen->alm_cod = $data->alm_cod;
    $almacen->alm_nom = $data->alm_nom;
    $almacen->per_id = $data->per_id;
    $almacen->alm_dir = $data->alm_dir;
    $almacen->ubi_id = $data->ubi_id;
    $almacen->alm_tel = $data->alm_tel;
    $almacen->alm_con = $data->alm_con;
    $almacen->alm_est = $data->alm_est;
    
    // create the almacen
    if($almacen->create($getdb)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "almacen was created."));
    }
 
    // if unable to create the almacen, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create almacen.","error" => "503"));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create almacen. Data is incomplete.","error" => "400"));
}
?>