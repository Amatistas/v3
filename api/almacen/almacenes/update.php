<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../../config/database.php';
include '../almacenes/almacen.php';

// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);

// prepare almacen object
$almacen = new Almacen($db);

// get id of almacen to be edited
$data = json_decode(file_get_contents("php://input"));

if(!isset($data->alm_con)){
    $data->alm_con = "0";
};
if(!isset($data->alm_est)){
    $data->alm_est = "0";
};

// set ID property of almacen to be edited
   $almacen->alm_id = $data->alm_id;
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

   //$almacen->per_update = date('Y-m-d H:i:s');

// update the almacen
if($almacen->update($getdb)){
 
    // set response code - 200 ok
    http_response_code(201);
 
    // tell the user
    echo json_encode(array("message" => "almacen was updated."));
}
 
// if unable to update the almacen, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update almacen."));
}
