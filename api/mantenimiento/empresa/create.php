<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../empresa/empresa.php';
 
// instantiate database and empresa object
$database = new Database();
$getdb=$_GET['getdb'];
$db = $database->getConnection($getdb);
 
// initialize object
$empresa = new empresa($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
var_dump($data);
// make sure data is not empty
if(

    !empty($data->emp_ruc)&&
    !empty($data->emp_nom)&&
    !empty($data->emp_nomcom)&&
    !empty($data->emp_repleg)&&
    !empty($data->emp_dir)&&
    !empty($data->ubi_id)&&
    !empty($data->emp_ema)&&
    !empty($data->emp_tel)&&
    !empty($data->emp_cel)&&
    !empty($data->emp_per)&&
    !empty($data->emp_ret)&&
    !empty($data->emp_det)&&
    !empty($data->emp_igv)&&
    !empty($data->emp_est)

){
 
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
    
    // create the empresa
    if($empresa->create($getdb)){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "empresa was created."));
    }
 
    // if unable to create the empresa, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create empresa.","error" => "400"));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create empresa. Data is incomplete.","error" => "400"));
}
?>