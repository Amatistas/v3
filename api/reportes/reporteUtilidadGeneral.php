<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include '../config/database.php';
include '../reportes/reportes.php';

date_default_timezone_set("America/Lima");

$data = json_decode(file_get_contents("php://input"));

// instantiate database and empresa object
$database = new Database();

$getdb = $_GET["getdb"];

if (isset($data->fechainicio)) {
    $fechainicio = date('d/m/Y', strtotime($data->fechainicio));
    $fechafin = date('d/m/Y', strtotime($data->fechafin));
} else {
    $fechainicio = "";
    $fechafin = "";
}

$reportes_arrr = array();

$db = $database->getConnection($getdb);

// initialize object
$reportes = new Reportes($db);

// check if more than 0 record found

if (true) {
    $stmt2 = $reportes->reporteUtilidadGeneral($getdb,$fechainicio, $fechafin);

    while ($roww = $stmt2->fetch(PDO::FETCH_ASSOC)) {
        array_push($reportes_arrr, $roww);
    }

    http_response_code(200);
    // show empresa data in json format
    echo json_encode($reportes_arrr);
}

// no empresa found will be here
else {

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(
        array("message" => "No empresas found.")
    );
}
