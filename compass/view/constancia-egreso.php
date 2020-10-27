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
$db = $database->getConnection($getdb);
$info = new informacion($db);
$op = new Operaciones();


///pasar el ID de proveedor para ver sus pagos
$infoVenta = $info->getinformacionVenta($getdb,$nro);
$infoItem = $info->getinformacionItem($getdb,$nro);
$infoPago = $info ->getinformacionPago($getdb,$nro);
//informacion de empresa
$infoEmpresa = $info->getinformacionEmpresa($getdb,1);
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



$fpdf->cell(130,6,substr('Beneficiario: ',0,60),0,'','L');

$fpdf->cell(60,6,'RUC',0,'','L');
$fpdf->Ln();
$fpdf->cell(130,6,substr($fpdf->arry4[0]['ane_razsoc'],0,60),1,'','L');

$fpdf->cell(60,6,$fpdf->arry4[0]['ane_numdoc'],1,'','L');

$fpdf->Ln(15);
$fpdf->cell(130,6,substr('Detalle',0,60),1,'','L');

$fpdf->cell(30,6,'USD - Dolares',1,'','R');
$fpdf->cell(30,6,'S/. - Nuevos Soles',1,'','R');
$fpdf->Ln();

   
    $fpdf->cell(130,6,substr('Dcmto: '.$arry4[0]['documento']." ".'F.Dcmto: '.$arry4[0]['pag_fecpag'],0,85),1,'','L');
    if($arry4[0]['mnd_id'] == 'PEN'){
        $fpdf->cell(30,6,'',1,'','R');
        $fpdf->cell(30,6,number_format($arry4[0]['pag_tot'],2,',',' '),1,'','R');
    } if($arry4[0]['mnd_id'] == 'USD'){
        $fpdf->cell(30,6,number_format($arry4[0]['pag_tot'],2,',',' '),1,'','R');
        $fpdf->cell(30,6,'',1,'','R');
    }
    $fpdf->Ln();

/////////////////item de productos end///////////

$fpdf->cell(110,6,'',0,'','L');

// $fpdf->Ln();
// $fpdf->Image('qr.jpg',0,0,33);
// $fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->cell(20,6,'Totales:',0,'','R');
if($arry4[0]['mnd_id'] == 'USD'){

    $fpdf->cell(30,6,number_format($arry4[0]['pag_tot'],2,',',' '),1,'','R');
    $fpdf->cell(30,6,"",1,'','R');
}if($arry4[0]['mnd_id'] == 'PEN'){
    $fpdf->cell(30,6,"",1,'','R');
    $fpdf->cell(30,6,number_format($arry4[0]['pag_tot'],2,',',' '),1,'','R');
}
$fpdf->Ln();

$fpdf->cell(110,6,'Preparado Por: '.$arry4[0]['usuario'].' V°B°Gerencia Financiera:',0,'','L');

$fpdf->cell(20,6,'',0,'','L');
$fpdf->cell(30,6,'',0,'','L');
$fpdf->cell(30,6,'',0,'','R');
$fpdf->Ln();


$fpdf->AliasNbPages();
$fpdf->Output('I','nombre.pdf','UTF-8');
?>
