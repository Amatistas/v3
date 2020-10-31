<?php
require('fpdf/fpdf.php');
// require('invoice/invoice.php');

// require('invoice/invoice.php');

include '../../api/config/database.php';
include 'informacion.php';
include 'operaciones.php';
include 'FPDF.php';
include __DIR__ . '../../num2letra.php';

// instantiate database and createNewService object

$database = new Database();
$getdb = $_GET['getdb'];
$nro = $_GET['nro'];
$emp_id = $_GET['emp_id'];
$id_tras = $_GET['id_tras'];
$db = $database->getConnection($getdb);
$info = new informacion($db);
$op = new Operaciones();


///pasar el ID de proveedor para ver sus pagos
// $infoVenta = $info->getinformacionVenta($getdb,$nro);
// $infoItem = $info->getinformacionItem($getdb,$nro);
// $infoPago = $info ->getinformacionPago($getdb,$nro);
//informacion de empresa
$infoEmpresa = $info->getinformacionEmpresa($getdb,$emp_id);
$infoAlmacen = $info->getheaderTraslado($getdb,$id_tras);
$infoDetalle = $info->getdetalleTraslado($getdb,$id_tras);


$arry = array();
//informacion de item
$arry2 = array();

$arry4 = array();


//informacion de empresa
$arry3 = array();
while ($row = $infoEmpresa->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry3,$row);
}


$arry5 = array();
while ($row = $infoAlmacen->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry5,$row);
}
$arry6 = array();
while ($row = $infoDetalle->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry6,$row);
}



// Creación del objeto de la clase heredada

$fpdf = new PDF('P','mm','A4',true,$arry5,$arry,$arry3,$arry6);

// $fpdf = new PDF('P','mm','A4',true,$arry,$arry2,$arry3,$arry5,$arry4,$arry6);

$fpdf->AddPage('portrait','A4');
// $fpdf->SetMargins(20)

$fpdf->SetFont('Arial','',8);

/////////////////item de productos///////////////

// var_dump($fpdf->arry);

$fpdf->cell(95,6,substr('Almacén: ',0,60),0,'','L');

$fpdf->cell(95,6,'Motivo',0,'','L');
$fpdf->Ln();
$fpdf->cell(95,6,substr($fpdf->arry[0]['alm_nom'],0,60),1,'','L');

$fpdf->cell(95,6,$fpdf->arry[0]['alm_motivo'],1,'','L');

$fpdf->Ln(15);
$fpdf->cell(130,6,substr('Producto',0,60),1,'','L');

$fpdf->cell(30,6,'Presentación',1,'','R');
$fpdf->cell(30,6,'Cantidad',1,'','R');
$fpdf->Ln();

   
    $fpdf->cell(130,6,'',1,'','L');
 
        $fpdf->cell(30,6,'',1,'','R');
        $fpdf->cell(30,6,'',2,'',' ',1,'','R');

        $fpdf->cell(30,6,'',2,'',' ',1,'','R');
        $fpdf->cell(30,6,'',1,'','R');
    
    $fpdf->Ln();

/////////////////item de productos end///////////

$fpdf->cell(110,6,'',0,'','L');

// $fpdf->Ln();
// $fpdf->Image('qr.jpg',0,0,33);
// $fpdf->Ln();
// $fpdf->SetX(140);

$fpdf->Ln();

$fpdf->cell(110,6,'Preparado Por: '.$fpdf->arry[0]['usuario'].' V°B°Gerencia Financiera:',0,'','L');

$fpdf->cell(20,6,'',0,'','L');
$fpdf->cell(30,6,'',0,'','L');
$fpdf->cell(30,6,'',0,'','R');
$fpdf->Ln();


$fpdf->AliasNbPages();
$fpdf->Output('I','nombre.pdf','UTF-8');
?>
