<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../createNewService/createNewService.php';
include '../createNewService/fields.php';

// instantiate database and createNewService object

$database = new Database();

$getdb = $_GET["getdb"];

$tbnom = $_GET["tbnom"];

$db = $database->getConnection($getdb);

// initialize object
$field = new Fields($db, $tbnom);

$createNewService = new createNewService($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$dataInfo = $data;
// make sure data is not empty
if (true) {
    $field = $field->fields($getdb, $tbnom);
    $numfield = $field->rowCount();
    $arr_field = array();

    while ($row = $field->fetch(PDO::FETCH_ASSOC)) {
        array_push($arr_field, $row['Field']);
    }
    foreach ($arr_field as $clave => $val) {

        if (isset($dataInfo->$val)) {
            $createNewService->$val = $dataInfo->$val;
        } else {
            $createNewService->$val = 0;
        }
    }
    // create the createNewService
    if ($createNewService->createAsiento($getdb, $tbnom, $dataInfo)) {
         ////////////segundo insert bucle para ingresar todos los items
        $getId = $createNewService->getLastIdRegistroAsiento();
        $ge = $getId->fetch(PDO::FETCH_ASSOC);

    if ($createNewService->insertService($getdb,$tbnom,$dataInfo,$ge)){
        http_response_code(201);
        // tell the user
        echo json_encode(array("message" => "Se creo el Asiento Correctamente"));

        }else {
            http_response_code(503);
         // tell the user
            echo json_encode(array("message" => "no se pudo Crear el Servicio"));
        }

        // set response code - 201 created
        http_response_code(201);
        // tell the user
        echo json_encode(array("message" => "Se creo el Asiento Correctamente"));

    }

    // if unable to create the createNewService, tell the user
    else {

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to create createNewService.", "error" => "503"));
    }
}

// tell the user data is incomplete
else {

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create createNewService. Data is incomplete.", "error" => "400"));
}
