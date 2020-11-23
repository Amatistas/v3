<?php
require('fpdf/fpdf.php');
// require('invoice/invoice.php');


include '../../api/config/database.php';
include 'informacion.php';
include 'operaciones.php';
// include 'FPDF.php';
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
$infoEmpresa = $info->getinformacionEmpresa($getdb,$emp_id);
$infoPago = $info ->getinformacionPago($getdb,$nro);
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
// var_dump($arry3);
$arry4 = array();
while ($row = $infoPago->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry4,$row);
}

function tipo($type){
    switch ($type) {
        case 'FA':
            $var = "FACTURA ELECTRÓNICA";
            break;
        case 'BO':
            $var = "BOLETA ELECTRÓNICA";
            break;
        
        case 'CT':
            $var = "COTIZACIÓN";
            break;
        case 'GR':
            $var = "GUIA DE REMISIÓN ELECTRÓNICA";
            break;
        case 'NC':
            $var = "NOTA DE CRÉDITO";
            break;
        case 'Pagos':
            $var = "COMPROBANTE DE EGRESO";
            break;
    
                      
        case 11:
            $var = "RUC";
            break;
      
        case 6:
            $var = "DNI";
            break;

        default:
            $var = "NA";
            break;
    }
    return $var;
  }

function tipoMoneda($type){
    switch ($type) {
        case 'USD':
            $var = "DOLAR";
            break;
       

        default:
            $var = "SOLES";
            break;
    }
    return $var;
  }
function formatoMoneda($type){
    switch ($type) {
        case 'USD':
            $var = "$";
            break;
       

        default:
            $var = "S./";
            break;
    }
    return $var;
  }



$fpdf = new FPDF($orientation='P',$unit='mm',array(80,350),true,$arry,$arry2,$arry3,$arry4);
$fpdf->AddPage();
$fpdf->SetFont('Arial','B',8);    //Letra Arial, negrita (Bold), tam. 20
$textypos = 20;
$fpdf->setY(2);
$fpdf->setX(20);
$fpdf->Cell(37,$textypos,$fpdf->Image("../../api/upload/".substr($arry3[0]['fe_log'],2), $fpdf->GetX(0), $fpdf->GetY(0),35),0);
$fpdf->Ln(10);
// $fpdf->SetFont('Arial','',8); 
// $fpdf->setXY(0,25);
// $fpdf->MultiCell(75,4,"RUC 20552745419 \n "."FACTURA ELECTRÓNICA\n"."FF01-123\n",0,'C');
// $fpdf->Ln(10);
$fpdf->SetFont('Arial','',8); 
$fpdf->setXY(0,25);
$fpdf->MultiCell(75,3,substr($arry3[0]['emp_nom'], 0, 59)."\n ".substr($arry3[0]['emp_dir'], 0, 40)."\n".substr($arry3[0]['departamento'] . " - " . $arry3[0]['provincia'] . " - " . $arry3[0]['distrito'], 0, 40) . "\n".substr("Email: " . $arry3[0]['emp_ema'], 0, 40) ."\n".substr("Teléf: " . $arry3[0]['emp_tel'] . " Cel: " . $arry3[0]['emp_cel'], 0, 40),0,'C');
$fpdf->Ln(10);
$fpdf->SetFont('Arial','B',8); 
$fpdf->setXY(0,42);
$fpdf->MultiCell(75,4,"RUC ".$arry3[0]['emp_ruc']."\n".tipo($arry[0]['td_id'])."\n".$arry[0]['documento'],0,'C');
$fpdf->Ln(10);
$fpdf->SetFont('Arial','',8); 
$fpdf->setXY(0,55);
$fpdf->MultiCell(75,4,"Cliente:".substr($arry[0]['ane_razsoc'], 0, 49)."\n".tipo($arry[0]['ane_tipdoc'])." ".$arry[0]['ane_numdoc']."\n"."Dirección: ".$arry[0]['ane_dir']." ". $arry[0]['departamento']." ".$arry[0]['provincia'] . "\n" . "OC: ".$arry[0]['ven_obs'],0,'C');
$fpdf->Ln(10);
$fpdf->setXY(0,80);
$fpdf->MultiCell(75,4,"Fecha Emisión: ".$arry[0]['ven_fecreg']."\n"."Condición: ".$arry[0]['fp_nom']."\n"."G.R Remitente: \n"."G.R Transportista: \n",0,'C');
$fpdf->setXY(0,96);
$fpdf->MultiCell(75,4,"Tipo Moneda: ".tipoMoneda($arry[0]['mnd_id'])."\n"."Tipo de Pago: ".$arry[0]['tp_nom']."\n",0,'C');
$fpdf->Ln(3);
$fpdf->SetFont('Arial','',8);    //Letra Arial, negrita (Bold), tam. 20
$textypos+=6;
// $fpdf->setX(1);
// $textypos+=6;
// $fpdf->setX(1);
// $fpdf->Cell(10,5,'CANT',0,'','C');
// $fpdf->Cell(30,5,'DESCRIP',0,'','C');
// $fpdf->Cell(15,5,'PRECIO',0,'','C');
// $fpdf->Cell(15,5,'TOTAL',0,'','C');
$fpdf->setX(1);
$fpdf->Cell(5,5,'-----------------------------------------------------------------------------------------------------------------------------');

foreach ($arry2 as $arr ) {
    # code...
}
$fpdf->Ln();
$fpdf->setX(1);
$fpdf->Cell(30,5,substr($arr['pro_nom'],0,40),0,'C');
$fpdf->Ln();
$fpdf->setX(1);
$fpdf->Cell(22,5,'Cant.'.$arr['vd_can']." ".$arr['pst_nom'],0,'L');
$fpdf->Cell(25,5,$arr['vd_pre']." ".formatoMoneda($arry[0]['mnd_id']),0,'','L');
$fpdf->Cell(15,5,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format((($arr['vd_pre'] * $arr['vd_can'])/1.18),2,',',' '),0,'','L');

$num = new Num2letras();


if($arry[0]['ven_afe'] != 0){

    $fpdf->Ln(10);
    $fpdf->setX(30);
    $fpdf->Cell(25,3,"AFECTO: ",0,'','L');
    $fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format($arry[0]['ven_afe'],2,',',' '),0,'','L');
}
if($arry[0]['ven_ina'] != 0){

    $fpdf->Ln(5);
    $fpdf->setX(30);
    $fpdf->Cell(25,3,"Inafecto: ",0,'','L');
    $fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format($arry[0]['ven_ina'],2,',',' '),0,'','L');
}
if($arry[0]['ven_isc'] != 0){

    $fpdf->Ln(5);
    $fpdf->setX(30);
    $fpdf->Cell(25,3,"ISC: ",0,'','L');
    $fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format($arry[0]['ven_isc'],2,',',' '),0,'','L');
}

$fpdf->Ln(5);
$fpdf->setX(30);  
$fpdf->Cell(25,3,"IGV/IVA ",0,'','L');
$fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format($arry[0]['ven_igv'],2,',',' '),0,'','L');
if($arry[0]['ven_totdscto'] != 0){

    $fpdf->Ln(5);
    $fpdf->setX(30);  
    $fpdf->Cell(25,3,"Total Dsctos ",0,'','L');
    $fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format($arry[0]['ven_totdscto'],2,',',' '),0,'','L');
}

$fpdf->Ln(5);
$fpdf->setX(30);  
$fpdf->Cell(25,3,"Total Dcmt ",0,'','L');
$fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format($arry[0]['ven_totdoc'],2,',',' '),0,'','L');
if($arry2[0]['ven_per'] != 0){

    $fpdf->Ln(5);
    $fpdf->setX(30);  
    $fpdf->Cell(25,3,"Percepción ",0,'','L');
    $fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format($arry2[0]['ven_per'],2,',',' '),0,'','L');
}
$fpdf->Ln(5);
$fpdf->setX(30);  
$fpdf->Cell(25,3,"Total a Pagar ",0,'','L');
$fpdf->Cell(15,3,$op->tipomoneda($arry[0]['mnd_id'])." ".number_format(($arry[0]['ven_totdoc']),2,',',' '),0,'','L');
$fpdf->Ln(5);
$fpdf->setX(1);
$fpdf->Cell(5,3,'Son: '.$num->numero(round(floatval($arry[0]['ven_totdoc']), 3)));
$fpdf->Ln(5);
$fpdf->setX(1);
$fpdf->Cell(5,3,'Vendedor: '.$fpdf->arry[0]['usuario']);
$fpdf->Ln(5);
$fpdf->setX(30);
$fpdf->Cell(20,$textypos,$fpdf->Image('qr.jpg', $fpdf->GetX(0), $fpdf->GetY(0),20),0);
$fpdf->Ln(23);
$fpdf->Cell(60,3,"REPRESENTACIÓN IMPRESA DEL",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"COMPROBANTE DE PAGO ELECTRÓNICO",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"ESTE DOCUMENTO PUEDE SER",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"CONSULTADO EN",0,'','C');
$fpdf->Ln();
$fpdf->Cell(60,3,"http://www.contabilizado.com",0,'','C');
$fpdf->AliasNbPages();
$fpdf->Output('I','nombre.pdf','UTF-8');
