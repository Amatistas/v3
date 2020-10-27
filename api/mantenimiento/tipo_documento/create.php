<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../tipo_documento/tipo_documento.php';
 
// instantiate database and tipo_documento object
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
 
// initialize object
$tipo_documento = new Tipodocumento($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
// make sure data is not empty
if(
    !empty($data->td_id)&&
    !empty($data->td_nom)&&
    !empty($data->td_fac)&&
    !empty($data->td_snt)&&
    !empty($data->td_sntnom)&&
    !empty($data->td_asi)&&
    !empty($data->td_est)
    ){
    if(!isset($data->td_asi)){
        $data->td_asi = "0";
    };
    if(!isset($data->td_est)){
        $data->td_est = "1";
    };

 
    // set tipo_documento property values

     $tipo_documento->td_id = $data->td_id;
     $tipo_documento->td_nom = $data->td_nom;
     $tipo_documento->td_fac = $data->td_fac;
     $tipo_documento->td_snt = $data->td_snt;
     $tipo_documento->td_sntnom = $data->td_sntnom;
     $tipo_documento->td_asi = $data->td_asi;
     $tipo_documento->td_est = $data->td_est;
     

    // create the tipo_documento
    if($tipo_documento->create($getdb)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "tipo_documento was created."));
    }
 
    // if unable to create the tipo_documento, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create tipo_documento.","error" => "400"));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create tipo_documento. Data is incomplete.","error" => "400"));
}
?>