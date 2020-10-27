<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/core.php';
include_once '../../config/database.php';
include_once '../mantenimiento/mantenimiento.php';
include '../mantenimiento/fields.php';
 
// instantiate database and mantenimiento object
$database = new Database();
$getdb=$_GET["getdb"];//nombre de la base de datos donde se van a buscar los items
$tbnom=$_GET["tbnom"];//nombre de la tabla 
$key=$_GET["key"];// la palabra clave de que se esta buscando 
$db = $database->getConnection($getdb);
 
// initialize object

$field = new Fields($db,$tbnom);
$mantenimiento = new Mantenimiento($db);
 

// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";// palabra clave que se buscara
 
// query mantenimiento
$field = $field->fields($getdb,$tbnom);
$numfield = $field->rowCount();
$stmt = $mantenimiento->search($keywords,$key,$getdb,$tbnom);
$num = $stmt->rowCount();
$arr_field = array();
while ($row = $field->fetch(PDO::FETCH_ASSOC)) {
    array_push($arr_field,$row['Field']);
}

// check if more than 0 record found
if($num>0){
 
    // empresa array
    $mantenimento_arr=array();
    
    $mantenimento_arr['fields']=array();

    array_push($mantenimento_arr['fields'],$arr_field);

    $mantenimento_arr['data']=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        array_push($mantenimento_arr['data'],$row);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show empresa data in json format
    echo json_encode($mantenimento_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no mantenimiento found
    echo json_encode(
        array("message" => "No mantenimiento found.")
    );
}
?>