<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../sujetos/sujeto.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
$anexo = new Anexo($db);
 

// query anexo
$stmt = $anexo->read($getdb);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // anexo array
    $anexo_arr=array();
    $anexo_arr["data"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);
 
        $anexo_item=array(
        "ane_id" => $ane_id,
        "ane_tipdoc" => $ane_tipdoc,
        "ane_numdoc" => $ane_numdoc,
        "ane_razsoc" => $ane_razsoc,
        "ane_nom" => $ane_nom,
        "ane_apepat" => $ane_apepat,
        "ane_apemat" => $ane_apemat,
        "ane_dir" => $ane_dir,
        "ubi_id" => $ubi_id,
        "ane_dirref" => $ane_dirref,
        "ane_ema" => $ane_ema,
        "ane_lat" => $ane_lat,
        "ane_lon" => $ane_lon,
        "ane_est" => $ane_est
        );
 
        array_push($anexo_arr["data"], $anexo_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show anexo data in json format
    echo json_encode($anexo_arr);
}
 
// no anexo found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No anexos found.")
    );
}