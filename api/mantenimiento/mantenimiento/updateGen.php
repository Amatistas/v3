<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../mantenimiento/mantenimiento.php';
include '../mantenimiento/fields.php';
 
// get database connection
$database = new Database();
$getdb=$_GET['getdb'];
$tbnom=$_GET['tbnom'];

$identifiquer=$_GET['identifiquer'];
$identifiquerValue=$_GET['identifiquerValue'];

$db = $database->getConnection($getdb);
  
// prepare mantenimiento object
$mantenimiento = new Mantenimiento($db);

$mantenimiento->data = (object)array();

$field = new Fields($db,$tbnom); 

// get mantenimiento id
$data = json_decode(file_get_contents("php://input"));


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
        $mantenimiento->data->$val = $data->$val;    
        }
        else
        {
        $mantenimiento->data->$val = 0;    
        }

    }

    // update the mantenimiento
    if($mantenimiento->updateGenerico($getdb,$tbnom,$identifiquer,$identifiquerValue)){
 
        // set response code - 201 updated
        http_response_code(201);
 
        // tell the use
        echo json_encode(array("message" => "update success","success" => "200"));
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
