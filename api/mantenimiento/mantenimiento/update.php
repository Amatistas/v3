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

$data = json_decode(file_get_contents("php://input"));


$getdb=$data->credenciales->getdb;
$tbnom=$data->credenciales->tbnom;

$typeUpdate=$data->typeUpdate;

$identifiquerID=$data->identifiquer->ID;
$identifiquerVALUE=$data->identifiquer->VALUE;
$toUpdate=$data->toUpdate;

$db = $database->getConnection($getdb);
 
// initialize object
$field = new Fields($db,$tbnom);
$mantenimento = new Mantenimiento($db);
 
// get posted data

// make sure data is not empty
if(true){

    //fieldsToEdit($getdb,$tbnom);
    $field = $field->fields($getdb,$tbnom);
    $numfield = $field->rowCount();
    $arr_field = array();
    
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

    // update the mantenimiento
    if($mantenimento->update($getdb,$tbnom,$toUpdate,$identifiquerID,$identifiquerVALUE)){
 
        // set response code - 201 updated
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "mantenimiento was updated."));
    }
 
    // if unable to update the mantenimiento, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to update mantenimiento.","error" => "503"));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update mantenimiento. Data is incomplete.","error" => "400"));
}
?>