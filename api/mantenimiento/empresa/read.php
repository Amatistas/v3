<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../empresa/empresa.php';
 
// instantiate database and empresa object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$empresa = new Empresa($db);
 
// query empresa
$stmt = $empresa->read($getdb);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // empresa array
    $empresa_arr=array();
    $empresa_arr["data"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
       
        extract($row);
 
        $empresa_item=array(
        "emp_id"=> $emp_id,
        "emp_ruc"=> $emp_ruc,
        "emp_nom"=> $emp_nom,
        "emp_nomcom"=> $emp_nomcom,
        "emp_repleg"=> $emp_repleg,
        "emp_dir"=> $emp_dir,
        "ubi_id"=> $ubi_id,
        "emp_ema"=> $emp_ema,
        "emp_tel"=> $emp_tel,
        "emp_cel"=> $emp_cel,
        "emp_lat"=> $emp_lat,
        "emp_lon"=> $emp_lon,
        "emp_est"=> $emp_est,
        "emp_per"=> $emp_per,
        "emp_ret"=> $emp_ret,
        "emp_det"=> $emp_det,
        "emp_igv"=> $emp_igv
        );
 
        array_push($empresa_arr["data"], $empresa_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show empresa data in json format
    echo json_encode($empresa_arr);
}
 
// no empresa found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No empresas found.")
    );
}