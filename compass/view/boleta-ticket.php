
<?php
require('fpdf/fpdf.php');
// require('invoice/invoice.php');


include 'database.php';
include 'model.php';


// instantiate database and createNewService object

$database = new Database();
$getdb = 'nubefa.nubefa';
$db = $database->getConnection($getdb);
$info2 = new InfoBoleta($db);

//informacion de empresa
$info3 = new Infoempresa($db);
//informacion de empresa
$infoEmpresa = $info3->getinformacionEmpresa($getdb,1);
//informacion de empresa
///pasar el ID de proveedor para ver sus pagos
$infoVenta = $info2->getinformacionVenta($getdb,20);
$infoItem = $info2->getinformacionItem($getdb,20);

///pasar el ID de proveedor para ver sus pagos END
// $ge = $pago->fetch(PDO::FETCH_ASSOC);
//informacion de cliente
$arry = array();
//informacion de item
$arry2 = array();


while ($row = $infoVenta->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry,$row);
}

while ($row = $infoItem->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry2,$row);
}





$arry3 = array();
while ($row = $infoEmpresa->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry3,$row);
}





function montoAfecto($afecto){
    $a = 0;
    
    foreach ($afecto as $arr) {

        if($arr['vd_ina']==0){
            $a += (($arr['vd_pre'] - $arr['vd_igv_unico']) * $arr['vd_can']);
        }else{
            $a = 0.0;
        }
    }
    return number_format($a,2,',',' ');
}
function montoInafecto($inafecto){
    $a = 0;
    
 

        if($inafecto[0]['vd_ina']!==0){
            $a += $inafecto[0]['ven_ina'];
        }else{
            $a = 0;
        }
    
    return number_format($a,2,',',' ');
}
function montoIsc($isc){
    $a = 0;
    
    foreach ($isc as $arr) {

        if($arr['vd_isc']!==0){
            $a += $arr['vd_isc'];
        }else{
            $a = 0;
        }
    }
    return number_format($a,2,',',' ');
}
function montoIgv($igv){
    $a = 0;
    
    foreach ($igv as $arr) {

        if($arr['vd_ina']==0){
            $a += $arr['vd_can']*$arr['vd_igv_unico'];
        }else{
            $a = 0;
        }
    }
    return number_format($a,2,',',' ');
}


function montoDesc($des){
    $a = 0;
    
    foreach ($des as $arr) {

        if($arr['vd_des']!==0){
            $a += $arr['vd_des'];
        }else{
            $a = 0;
        }
    }
    return number_format($a,2,',',' ');
}
function montoDocum($docu){
    $a = 0;
    $inafecto = $docu[0]['ven_ina'];
    foreach ($docu as $arr) {

        if($arr['vd_ina']==0){
            $a += ($arr['vd_can']*$arr['vd_igv_unico']) +  (($arr['vd_pre'] - $arr['vd_igv_unico']) * $arr['vd_can']) - $arr['vd_des'] ;
        }else if($arr['vd_ina']!==0){
            $a =  $inafecto - $arr['vd_des'];
        }else{
            $a = 0;

        }
    }
    return number_format($a,2,',',' ');
}

function montoPagar($pagar){
    $a = 0;
    $inafecto = $pagar[0]['ven_ina'];
    $montoper = $pagar[0]['ven_per'];
    foreach ($pagar as $arr) {
        if($arr['vd_ina']==0){
            $a += ($arr['vd_can']*$arr['vd_igv_unico']) +  (($arr['vd_pre'] - $arr['vd_igv_unico']) * $arr['vd_can']) - $arr['vd_des'] + $montoper;
        }else if($arr['vd_ina']!==0){
            $a =  $inafecto - $arr['vd_des'] + $montoper;
        }else{
            $a = 0;
        }
    }
    return number_format($a,2,',',' ');
}


$fpdf = new FPDF($orientation='P',$unit='mm', array(80,350),true);
$fpdf->AddPage();
$fpdf->SetFont('Arial','B',8);    //Letra Arial, negrita (Bold), tam. 20
$textypos = 20;
$fpdf->setY(2);
$fpdf->setX(20);
$fpdf->Cell(37,$textypos,$fpdf->Image('your-logo-here.png', $fpdf->GetX(0), $fpdf->GetY(0),35),0);
$fpdf->Ln(10);
$fpdf->SetFont('Arial','',6); 
$fpdf->setXY(0,25);
$fpdf->MultiCell(75,4,"RUC " .$arry3[0]['emp_ruc'] ."\n "."BOLETA ELECTRÓNICA\n". $arry[0]['documento']. "\n",0,'C');
$fpdf->Ln(10);
$fpdf->SetFont('Arial','',5); 
$fpdf->setXY(0,40);
$fpdf->MultiCell(75,3,$arry3[0]['emp_nom']."\n ".substr($arry3[0]['emp_dir'],0,65)."\n".$arry3[0]['departamento']." - ".$arry3[0]['provincia']." - ".$arry3[0]['distrito'] ."\n".substr("Email: " .$arry3[0]['emp_ema'],0,65) ."\n" ."Teléf: " .$arry3[0]['emp_tel']. "  Cel: ".$arry3[0]['emp_cel'],0,'C');

$fpdf->SetFont('Arial','',5); 
$fpdf->setXY(3,55);

$fpdf->MultiCell(110,4,substr("Cliente: ". $arry[0]['ane_razsoc'],0,70)."\n"."DNI: ".$arry[0]['ane_numdoc']."\n"."Dirección: ".substr($arry[0]['ane_dir'],0,70),0,'L');
$fpdf->setXY(3,67);
$fpdf->MultiCell(80,4,"Fecha Emisión: ".$arry[0]['ven_fecreg']."\n"."Tipo Moneda: SOLES\n"."Condición de Pago: EFECTIVO\n",0,'L');

$fpdf->Ln(5);
$fpdf->SetFont('Arial','',5);    //Letra Arial, negrita (Bold), tam. 20
$textypos+=6;
$fpdf->setX(2);
// $textypos+=6;
$fpdf->setX(2);
$fpdf->Cell(10,5,'CANT',0,'','C');
$fpdf->Cell(30,5,'DESCRIP',0,'','C');
$fpdf->Cell(15,5,'PRECIO',0,'','C');
$fpdf->Cell(15,5,'TOTAL',0,'','C');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(5,5,'-----------------------------------------------------------------------------------------------------------------------------');
foreach ($arry2 as $arr) {
   
    $fpdf->Ln();
    $fpdf->setX(2);
    $fpdf->Cell(10,5,$arr['vd_can']." ".$arr['pst_id'],0,'C');
    $fpdf->Cell(30,5,substr($arr['pro_nom'],0,25),0,'C');
    $fpdf->Cell(15,5," S./".number_format($arr['vd_pre'],2,',',' '),0,'','R');
    $fpdf->Cell(15,5," S./".number_format($arr['vd_pre']*$arr['vd_can'],2,',',' '),0,'','R');
}


$fpdf->Ln(10);
$fpdf->setX(2);
$fpdf->Cell(15,3,"AFECTO: " .montoAfecto($arry2). "S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"INAFECTO: " .montoInafecto($arry2). "S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"ISC: " .montoIsc($arry2). "S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"IGV: " .montoIgv($arry2). "S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"TOTAL DSCTOS: ". montoDesc($arry2). "S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"TOTAL DCMTO: " .montoDocum($arry2). "S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"PERCEPCIÓN: " .number_format($arry2[0]['ven_per']). "S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);  
$fpdf->Cell(15,3,"TOTAL: " .montoPagar($arry2). "S./",0,'','L');
$fpdf->Ln(5);
$fpdf->setX(2);
$fpdf->MultiCell(75,3,"REPRESENTACIÓN IMPRESA DEL COMPROBANTE DE PAGO ELECTRÓNICO \n"."ESTE DOCUMENTO PUEDE SER CONSULTADO EN \n"."www.gruposc.cpe.com.pe",0,'C');
//$fpdf->Cell(5,3,"REPRESENTACIÓN IMPRESA DEL COMPROBANTE DE PAGO ELECTRÓNICO \n"."ESTE DOCUMENTO PUEDE SER CONSULTADO EN \n"."www.gruposc.cpe.com.pe",0,'','C');

$fpdf->output('I','nombre.fpdf','UTF-8');

?>
