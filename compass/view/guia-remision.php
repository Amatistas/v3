<?php
require('fpdf/fpdf.php');
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
$db = $database->getConnection($getdb);
$info = new informacion($db);
$op = new Operaciones();


///pasar el ID de proveedor para ver sus pagos
$infoVenta = $info->getinformacionVenta($getdb,$nro);
$infoItem = $info->getinformacionItem($getdb,$nro);
$infoPago = $info ->getinformacionPago($getdb,$nro);
$infoEmpresa = $info->getinformacionEmpresa($getdb,$emp_id);

$arry = array();
//informacion de item
$arry2 = array();

while ($row = $infoVenta->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry,$row);   
}
/* var_export($arry); */ 

while ($row = $infoItem->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry2,$row);
}


//informacion de empresa
$arry3 = array();
while ($row = $infoEmpresa->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry3,$row);
}

$arry4 = array();
while ($row = $infoPago->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry4,$row);
}
// Creación del objeto de la clase heredada
$fpdf = new PDF('P','mm','A4',true,$arry,$arry2,$arry3,$arry4);

$fpdf->AddPage('portrait','A4');
// $fpdf->SetMargins(20)

$fpdf->SetFont('Arial','',8);

/////////////////item de productos///////////////
foreach ($arry2 as $arr) {

    $x_axis = $fpdf->getx();
    $c_width = 20;
    $c2_width = 90;
    $c3_width = 15;
    $c4_width = 25;
    $c_height = 8;

    $fpdf->vcell2($c_width, $c_height, $x_axis, $arr['pro_cod']);
    $x_axis = $fpdf->getx();
    $fpdf->vcell3($c2_width, $c_height, $x_axis, $arr['pro_nom']);
    $x_axis = $fpdf->getx();
    $fpdf->vcell($c3_width, $c_height, $x_axis,$arr['vd_can']);
    $x_axis = $fpdf->getx();
    $fpdf->vcell($c3_width, $c_height, $x_axis, $arr['pst_nom']);
    $x_axis = $fpdf->getx();
    $fpdf->vcell($c4_width, $c_height, $x_axis, "Kg ".number_format($arr['pro_pes'],2,',',' '));
    $x_axis = $fpdf->getx();
    $fpdf->vcell($c4_width, $c_height, $x_axis,"Kg ".number_format($arr['pro_pes'] * $arr['vd_can'],2,',',' '));
    $fpdf->Ln();

}
$fpdf->SetMargins(10, 30, 20);
$fpdf->SetAutoPageBreak(true, 0);



/////////////////item de productos end///////////

$fpdf->SetY(199);

// $fpdf->Ln();
// $fpdf->Image('qr.jpg',0,0,33);
// $fpdf->Ln();




$fpdf->SetX(150);
$fpdf->cell(25,6,'Total',1,'','L');
$fpdf->cell(25,6,"Kg ".$op->pesoTotal($arry2),1,'','R');
$fpdf->Ln(10);
$fpdf->cell(95,6,'RUC:',1,'','L');
$fpdf->cell(95,6,'CHOFER: '.$fpdf->arry[0]['nchofer'],1,'','L');
$fpdf->Ln();
$fpdf->cell(63.3,6,'MARCA: '.$fpdf->arry[0]['vh_mar'].'  '.'PLACA: '.$fpdf->arry[0]['vh_pla'],1,'','L');
$fpdf->cell(63.3,6,'LICENCIA: '.$fpdf->arry[0]['ch_bre'],1,'','L');
$fpdf->cell(63.3,6,'MODELO: '.$fpdf->arry[0]['vh_mod'],1,'','L');



$fpdf->AliasNbPages();
$fpdf->Output('I','nombre.pdf','UTF-8');


