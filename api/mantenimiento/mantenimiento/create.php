<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../mantenimiento/mantenimiento.php';
include '../mantenimiento/fields.php';
 
// instantiate database and mantenimiento object
$database = new Database();

$getdb=$_GET["getdb"];

$tbnom=$_GET["tbnom"];

$db = $database->getConnection($getdb);
 
// initialize object
$field = new Fields($db,$tbnom);
$mantenimento = new Mantenimiento($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// make sure data is not empty
if(true){

    $field = $field->fields($getdb,$tbnom);
    $numfield = $field->rowCount();
    $arr_field = array();
    $adver = array();
    
    while ($row = $field->fetch(PDO::FETCH_ASSOC))
    {
        array_push($arr_field,$row['Field']);
    }
    
    foreach ($arr_field as $clave => $val) {

        if(isset($data->$val))
        {
        $mantenimento->$val = $data->$val;    
        }
        else
        {
        $mantenimento->$val = 0;    
        }
    }
   
    // create the mantenimiento
    if($mantenimento->create($getdb,$tbnom,$arr_field)){
        // set response code - 201 created
        http_response_code(200);
 
        // tell the user
        array_push($adver,array("message" => "Datos Guardados", "status" => "200"));

    }
 
    // if unable to create the mantenimiento, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        array_push($adver,array("message" => "no se puedo insertar los datos", "status" => "503"));

    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    array_push($adver,array("message" => "no se puedo insertar los datos", "status" => "400"));
}

echo json_encode($adver);