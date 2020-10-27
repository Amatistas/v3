<?php

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/fe.php';
require __DIR__ . '/Gofactura.php';
require __DIR__ . '/GoAnulacionFactura.php';
require __DIR__ . '/GoGuiaRemision.php';
require __DIR__ . '/num2letra.php';
require '../api/config/database.php';

//////////////////////parametros de busqueda//////////////////
$data = json_decode(file_get_contents("php://input"));
$getdb = $data->getdb;
$emp_id = $data->emp_id;
$venta_id = $data->venta_id;
///////////////////////////////////////////////////////////////
$adver = array();

$database = new Database();

$db = $database->getConnection($getdb);

$fe = new FE($db, $venta_id, $emp_id);

if ($VENTA = $fe->getVenta()) {
    $VENTA = $VENTA->fetch(PDO::FETCH_ASSOC);
} else {
    array_push($adver, array("message" => "No se pudo obtener infomacion de la venta", "status" => "404"));
}
$ventaDetInfo = $fe->getVentaDet();
$ventaDetRecolector = array();

while ($rowAsi1 = $ventaDetInfo->fetch(PDO::FETCH_ASSOC)) {
    array_push($ventaDetRecolector, $rowAsi1);
}
$VENTADETALLE = $ventaDetRecolector;

if ($MIEMPRESA = $fe->getMiEmpresa()) {
    $MIEMPRESA = $MIEMPRESA->fetch(PDO::FETCH_ASSOC);
} else {
    array_push($adver, array("message" => "No se pudo obtener infomacion de Mi Empresa", "status" => "404"));
}
if ($CLIENTE = $fe->getCliente($VENTA['ane_id'])) {
    $CLIENTE = $CLIENTE->fetch(PDO::FETCH_ASSOC);
} else {
    array_push($adver, array("message" => "No se pudo obtener infomacion de Mi Empresa", "status" => "404"));
}

$UBIGEOEMPRESA = $fe->getUbigeos($MIEMPRESA['ubi_id']);
$UBIGEOEMPRESA = $UBIGEOEMPRESA->fetch(PDO::FETCH_ASSOC);

$UBIGEOCLIENTE = $fe->getUbigeos($CLIENTE['ane_id']);
$UBIGEOCLIENTE = $UBIGEOCLIENTE->fetch(PDO::FETCH_ASSOC);

//GLOBAL VARIABLES
//$VENTA = INFORMACION DE VENTA
//$VENTADETALLE = INFORMACION DEL DETALLE DE VENTA
//$MIEMPRESA  = INFOMRACION DE MI EMPRESA
//$CLIENTE = INFORMACION DEL CLIENTE
//$GETUBIGEOS = ES UNA FUNCION PARA OBTENER LOS UBIGEOS DEL CLIENTE Y DE MI EMPRESA
if(!isset($data->anulacion)){
    
switch ($VENTA['td_id']) {
    case 'FA':
        $GO = new Gofactura($VENTA, $VENTADETALLE, $MIEMPRESA, $CLIENTE, $UBIGEOCLIENTE, $UBIGEOEMPRESA, $getdb);

        if ($respuesta = $GO->generateFactura()) {
            if ($fe->updateRespuesta($respuesta)) {
                echo json_encode(array("respuesta" => $respuesta));
            } else {
                echo json_encode(array("respuesta" => "no se pudo actualizar el estatus de la factura pero si fue aprovada exitosamente"));
            }
        }

        break;

    case 'BO':
        echo json_encode(array("respuesta" => "Boletas no configuradas todavia"));
        break;

    case 'GR':

        $GO = new GoGuiaRemision($VENTA, $VENTADETALLE, $MIEMPRESA, $CLIENTE, $UBIGEOCLIENTE, $UBIGEOEMPRESA, $getdb);

        if ($respuesta = $GO->generateFactura()) {
            if ($fe->updateRespuesta($respuesta)) {
                echo json_encode(array("respuesta" => $respuesta));
            } else {
                echo json_encode(array("respuesta" => "no se pudo actualizar el estatus de la factura pero si fue aprovada exitosamente"));
            }
        }

        break;
    case 'NC':

        $GO = new GoNotaCredito($VENTA, $VENTADETALLE, $MIEMPRESA, $CLIENTE, $UBIGEOCLIENTE, $UBIGEOEMPRESA, $getdb);

        if ($respuesta = $GO->generateNote()) {
            if ($fe->updateRespuesta($respuesta)) {
                echo json_encode(array("respuesta" => $respuesta));
            } else {
                echo json_encode(array("respuesta" => "no se pudo actualizar el estatus de la factura pero si fue aprovada exitosamente"));
            }
        }
        break;


    default:
        # code...
        break;
}

}else if (isset($data->anulacion)){
    $GO = new GoAnulacionFactura($VENTA, $VENTADETALLE, $MIEMPRESA, $CLIENTE, $UBIGEOCLIENTE, $UBIGEOEMPRESA, $getdb);
    if ($respuesta = $GO->generateAnulacion()) {
        if ($fe->updateRespuesta($respuesta)) {
            echo json_encode(array("respuesta" => $respuesta));
        } else {
            echo json_encode(array("respuesta" => "no se pudo actualizar el estatus de la factura pero si fue aprovada exitosamente"));
        }
    }
}
