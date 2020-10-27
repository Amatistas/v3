<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../../config/database.php';
include '../tipo_documento/tipo_documento.php';

// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);

// prepare tipo_documento object
$tipo_documento = new Tipodocumento($db);
 
// get id of tipo_documento to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of tipo_documento to be edited
   $tipo_documento->td_id = $data->td_id;
   // set tipo_documento property values
   
   if(!isset($data->td_asi)){
    $data->td_asi = "0";
};
if(!isset($data->td_est)){
    $data->td_est = "1";
};

$tipo_documento->td_id = $data->td_id;
$tipo_documento->td_nom = $data->td_nom;
$tipo_documento->td_fac = $data->td_fac;
$tipo_documento->td_snt = $data->td_snt;
$tipo_documento->td_sntnom = $data->td_sntnom;
$tipo_documento->td_asi = $data->td_asi;
$tipo_documento->td_est = $data->td_est;

   //$tipo_documento->per_update = date('Y-m-d H:i:s');

// update the tipo_documento
if($tipo_documento->update($getdb)){
 
    // set response code - 200 ok
    http_response_code(201);
 
    // tell the user
    echo json_encode(array("message" => "tipo_documento was updated."));
}
 
// if unable to update the tipo_documento, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update tipo_documento."));
}
