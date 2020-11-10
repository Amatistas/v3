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
    $fpdf->cell(20,6,$arr['pro_cod'],0,'','L');
    $fpdf->MultiCell(90,6,$arr['pro_nom']);
    // $fpdf->MultiCell(90,6,$arr['pro_nom'],1,'L',true);
    $fpdf->cell(15,6,$arr['vd_can'] ,0,'','C');
    $fpdf->cell(15,6, $arr['pst_nom'],0,'','C');
    $fpdf->cell(25,6,"S/. " .  number_format($arr['vd_pre'],2,',',' '),0,'','R');
    $fpdf->cell(25,6,"S/. " . number_format($arr['vd_pre'] * $arr['vd_can'],2,',',' '),0,'','R');   
    $fpdf->Ln();
}

/////////////////item de productos end///////////
$fpdf->SetY(199);
$num = new Num2letras();

$fpdf->cell(140,6,'Son: '.$num->numero(round(floatval($arry[0]['ven_totdoc']), 3)),0,'','L');

// $fpdf->Ln();
// $fpdf->Image('qr.jpg',0,0,33);
// $fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->cell(25,6,'Afecto',1,'','L');
$fpdf->cell(25,6,$op->montoAfecto($arry2),1,'','R');
$fpdf->Ln();
// $fpdf->SetY(50);
$fpdf->SetX(150);
// $fpdf->cell(130,36,'Inafecto',1,'','L');
$fpdf->cell(25,6,'Inafecto',1,'','L');
$fpdf->cell(25,6,$op->montoInafecto($arry2),1,'','R');
$fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->Cell(140,30, $fpdf->Image('qr.jpg', $fpdf->GetX(0), $fpdf->GetY(0),25),0);
$fpdf->cell(25,6,'ISC',1,'','L');
$fpdf->cell(25,6, $op->montoIsc($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(150);
$fpdf->cell(25,6,'IGV/IVA',1,'','L');
$fpdf->cell(25,6,$op->montoIgv($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(150);
$fpdf->cell(25,6,'Total Dsctos',1,'','L');
$fpdf->cell(25,6,$op->montoDesc($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(150);
$fpdf->cell(25,6,'Total Dcmto',1,'','L');
$fpdf->cell(25,6,$op->montoDocum($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(150);
$fpdf->cell(25,6,'Percepción',1,'','L');
$fpdf->cell(25,6,number_format($arry2[0]['ven_per'],2,',',' '),1,'','R');
$fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->cell(140,6,'',0,'','L');
;
$fpdf->cell(25,6,'Total a Pagar',1,'','L');
$fpdf->cell(25,6,$op->montoPagar($arry2),1,'','R');
$fpdf->Ln();
$fpdf->cell(140,6,'Vendedor: '.$fpdf->arry[0]['usuario']."  "."Cta Ahorro:  Cta Interbancaria: ",0,'','L');




$fpdf->AliasNbPages();
$fpdf->Output('I','nombre.pdf','UTF-8');
?>

