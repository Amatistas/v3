<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insert2TablesVenta/insert2Tables.php';

// instantiate database and almacen object
$database = new Database();

$getdb = $_GET["getdb"];

$pro_id = $_GET["pro_id"];

$emp_id = $_GET["emp_id"];

$db = $database->getConnection($getdb);

// initialize object
$principalActivo = new Insert2Tables($db);


// query almacen
$componentes = $principalActivo->readComponenteProducto($getdb, $pro_id, $emp_id);

// almacen array
$producto_arr = array();
$producto_arr["data"] = array();

while ($row = $componentes->fetch(PDO::FETCH_ASSOC)) {
    array_push($producto_arr["data"], $row);
}

// set response code - 200 OK
http_response_code(200);

// show almacen data in json format
echo json_encode($producto_arr);
