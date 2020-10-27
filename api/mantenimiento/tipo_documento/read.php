<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../tipo_documento/tipo_documento.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
$tipo_documento = new Tipodocumento($db);
 

// query tipo_documento
$stmt = $tipo_documento->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // tipo_documento array
    $tipo_documento_arr=array();
    $tipo_documento_arr["data"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
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
 
    // show tipo_documento data in json format
    echo json_encode($tipo_documento_arr);
}
 
// no tipo_documento found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No tipo_documentos found.")
    );
}