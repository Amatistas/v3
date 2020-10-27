<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/core.php';
include_once '../../config/database.php';
include_once '../tipo_documento/tipo_documento.php';
 
// instantiate database and tipo_documento object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$tipo_documento = new Tipodocumento($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query tipo_documento
$stmt = $tipo_documento->search($getdb,$keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // tipo_documento array
    $tipo_documento_arr=array();
    $tipo_documento_arr["data"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
   
        extract($row);
 
        $tipo_documento_item=array(            
            "td_id" => $td_id,
            "td_nom" => $td_nom,
            "td_fac" => $td_fac,
            "td_snt" => $td_snt,
            "td_sntnom" => $td_sntnom,
            "td_asi" => $td_asi,
            "td_est" => $td_est,
            );
 
        array_push($tipo_documento_arr["data"], $tipo_documento_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show tipo_documento data
    echo json_encode($tipo_documento_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no tipo_documento found
    echo json_encode(
        array("message" => "No tipo_documento found.")
    );
}
?>