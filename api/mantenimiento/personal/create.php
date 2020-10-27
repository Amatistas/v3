<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../personal/personal.php';
 
// instantiate database and personal object
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
 
// initialize object
$personal = new Personal($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
// make sure data is not empty
if(
    !empty($data->per_numdoc)&&
    !empty($data->per_nom)&&
    !empty($data->per_apepat)
){
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
        $data->per_act = "1";
    };

 
    // set personal property values

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

    // create the personal
    if($personal->create($getdb)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "personal was created."));
    }
 
    // if unable to create the personal, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create personal.","error" => "400"));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create personal. Data is incomplete.","error" => "400"));
}
?>