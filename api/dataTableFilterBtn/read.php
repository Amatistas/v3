<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and object files
include '../config/database.php';
include '../dataTableFilterBtn/FiltrosBtn.php';

// instantiate database and empresa object
$database = new Database();

$getdb = $_GET["getdb"];
$type = $_GET["type"];

if (isset($_GET["where"])) {
    $where = $_GET["where"];
    $igual = $_GET["igual"];
} else {
    $where = "";
    $igual = "";
}


$db = $database->getConnection($getdb);

// initialize object
$fil = new FiltrosBtn($db);
$monto_arr = array();
// query empresa
switch ($type) {
    case 1:
        $stmt = $fil->getfiltroporpagar();
        $num = $stmt->rowCount();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($monto_arr, $row);
        }

        $monto = obtenerMontos($monto_arr);
        break;
    case 2:
        $stmt = $fil->getfiltroporpagarDetraccion();
        $num = $stmt->rowCount();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($monto_arr, $row);
        }

        $monto = obtenerMontos($monto_arr);
        break;
    case 3:
        $stmt = $fil->getfiltroporpagarMesActual();
        $num = $stmt->rowCount();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($monto_arr, $row);
        }

        $monto = obtenerMontos($monto_arr);
        break;
    case 4:
        $stmt = $fil->getfiltroporpagarProveedores();
        $num = $stmt->rowCount();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($monto_arr, $row);
        }

        $monto = obtenerMontosProveedores($monto_arr);
        break;

    default:
        # code...
        break;
}

/* $stmt = $fil->getfiltroporpagar();
$num = $stmt->rowCount();
// check if more than 0 record found
 */

function obtenerMontos($mon)
{
    $sum = 0;
    foreach ($mon as $k => $v) {

        if ($v['TotalPago'] == NULL) {
            $totalPago = 0;
        } else {
            $totalPago = $v['TotalPago'];
        }
        if ($totalPago == 0 || $totalPago <= $v['totalcompra']) {
            $sum = ($sum + (floatval($v['totalcompra'])) - $totalPago);
        }
    }
    return $sum;
}
function obtenerMontosProveedores($mon)
{
    $sum = 0;
    foreach ($mon as $k => $v) {

        if ($v['TotalPago'] == NULL) {
            $totalPago = 0;
        } else {
            $totalPago = $v['TotalPago'];
        }
        if ($totalPago == 0 || $totalPago <= $v['totalcompra']) {
            $sum = ($sum + (floatval($v['totalcompra'])) - $totalPago);
        }
    }
    return $sum;
}

http_response_code(200);
// show empresa data in json format
echo json_encode(array("monto" => $monto, "num" => $num));
