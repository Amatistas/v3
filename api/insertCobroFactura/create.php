<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insertCobroFactura/insertCobroFactura.php';

// instantiate database and insertCobroFactura object

$database = new Database();

$getdb = $_GET["getdb"];

$tbnom = $_GET["tbnom"];

$db = $database->getConnection($getdb);

$insertCobroFactura = new insertCobroFactura($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$dataInfo = $data->info[0];
// make sure data is not empty
if (true) {
    // create the insertCobroFactura
    if ($insertCobroFactura->create($getdb, $tbnom, $dataInfo)) {
             // set response code - 201 created
             http_response_code(201);
             // tell the user
             echo json_encode(array("message" => "Cobro grabado."));
        }else{

                  // set response code - 201 created
                  http_response_code(503);
                  // tell the user
                  echo json_encode(array("message" => "bad."));
        }   
    }
    // if unable to create the insertCobroFactura, tell the user
    else {

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to create insertCobroFactura.", "error" => "503"));
    }