<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insertPagos/insertPagos.php';

// instantiate database and insertPagos object

$database = new Database();

$getdb = $_GET["getdb"];

$tbnom = $_GET["tbnom"];

$db = $database->getConnection($getdb);

$insertPagos = new insertPagos($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$dataInfo = $data->info[0];
// make sure data is not empty
if (true) {
    // create the insertPagos
    if ($insertPagos->create($getdb, $tbnom, $dataInfo)) {
             // set response code - 201 created
             http_response_code(201);

             // tell the user
             echo json_encode(array("message" => "Pago grabado."));
        }else{

                  // set response code - 201 created
                  http_response_code(503);

                  // tell the user
                  echo json_encode(array("message" => "bad."));
        }   
    }
    // if unable to create the insertPagos, tell the user
    else {

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to create insertPagos.", "error" => "503"));
    }