<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../../config/database.php';
include '../empresa/empresa.php';

// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);

// prepare empresa object
$empresa = new Empresa($db);
 
// get id of empresa to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of empresa to be edited
   $empresa->emp_id = $data->emp_id;
 
   // set empresa property values
   $empresa->emp_ruc = $data->emp_ruc;
   $empresa->emp_nom = $data->emp_nom;
   $empresa->emp_nomcom = $data->emp_nomcom;
   $empresa->emp_repleg = $data->emp_repleg;
   $empresa->emp_dir = $data->emp_dir;
   $empresa->ubi_id = $data->ubi_id;
   $empresa->emp_ema = $data->emp_ema;
   $empresa->emp_tel = $data->emp_tel;
   $empresa->emp_cel = $data->emp_cel;
   $empresa->emp_est = $data->emp_est;
   $empresa->emp_per = $data->emp_per;
   $empresa->emp_ret = $data->emp_ret;
   $empresa->emp_det = $data->emp_det;
   $empresa->emp_igv = $data->emp_igv;

// update the empresa
if($empresa->update($getdb)){
 
    // set response code - 200 ok
    http_response_code(201);
 
    // tell the user
    echo json_encode(array("message" => "empresa was updated."));
}
 
// if unable to update the empresa, tell the user
else{
 
    // set response code - 503 service unavailable
    http_response_code(503);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update empresa."));
}
