<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../../config/database.php';
include '../personal/personal.php';

// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);

// prepare personal object
$personal = new Personal($db);
 
// get id of personal to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of personal to be edited
   $personal->per_id = $data->per_id;
   // set personal property values
   
   if(!isset($data->per_cho)){
    $data->per_cho = "0";
};
if(!isset($data->per_ven)){
    $data->per_ven = "0";
};
if(!isset($data->per_jef)){
    $data->per_jef = "0";
};
if(!isset($data->per_act)){
    $data->per_act = "0";
};

   $personal->emp_id = $data->emp_id;
   $personal->ofi_id = $data->ofi_id;
   $personal->per_cod = $data->per_cod;
   $personal->per_tipdoc = $data->per_tipdoc;
   $personal->per_numdoc = $data->per_numdoc;
   $personal->per_nom = $data->per_nom;
   $personal->per_apepat = $data->per_apepat;
   $personal->per_dir = $data->per_dir;
   $personal->ubi_id = $data->ubi_id;
   $personal->per_sex = $data->per_sex;
   $personal->per_ema = $data->per_ema;
   $personal->per_fecnac = $data->per_fecnac;
   $personal->per_tel = $data->per_tel;
   $personal->per_ven = $data->per_ven;
   $personal->per_cho = $data->per_cho;
   $personal->are_id = $data->are_id;
   $personal->per_jef = $data->per_jef;
   $personal->per_obs = $data->per_obs;
   $personal->per_est = $data->per_est;

   //$personal->per_update = date('Y-m-d H:i:s');

// update the personal
if($personal->update($getdb)){
 
    // set response code - 200 ok
    http_response_code(201);
 
    // tell the user
    echo json_encode(array("message" => "personal was updated."));
}
 
// if unable to update the personal, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update personal."));
}
