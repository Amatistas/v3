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


///pasar el ID de proveedor para ver sus pagos
$infoVenta = $info2->getinformacionVenta($getdb,22);
$infoItem = $info2->getinformacionItem($getdb,22);

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




// Añadir capítulo
class PDF extends FPDF{






    protected $extgstates = array();

    // alpha: real value from 0 (transparent) to 1 (opaque)
    // bm:    blend mode, one of the following:
    //          Normal, Multiply, Screen, Overlay, Darken, Lighten, ColorDodge, ColorBurn,
    //          HardLight, SoftLight, Difference, Exclusion, Hue, Saturation, Color, Luminosity
    function SetAlpha($alpha, $bm='Normal')
    {
        // set alpha for stroking (CA) and non-stroking (ca) operations
        $gs = $this->AddExtGState(array('ca'=>$alpha, 'CA'=>$alpha, 'BM'=>'/'.$bm));
        $this->SetExtGState($gs);
    }

    function AddExtGState($parms)
    {
        $n = count($this->extgstates)+1;
        $this->extgstates[$n]['parms'] = $parms;
        return $n;
    }

    function SetExtGState($gs)
    {
        $this->_out(sprintf('/GS%d gs', $gs));
    }

    function _enddoc()
    {
        if(!empty($this->extgstates) && $this->PDFVersion<'1.4')
            $this->PDFVersion='1.4';
        parent::_enddoc();
    }

    function _putextgstates()
    {
        for ($i = 1; $i <= count($this->extgstates); $i++)
        {
            $this->_newobj();
            $this->extgstates[$i]['n'] = $this->n;
            $this->_put('<</Type /ExtGState');
            $parms = $this->extgstates[$i]['parms'];
            $this->_put(sprintf('/ca %.3F', $parms['ca']));
            $this->_put(sprintf('/CA %.3F', $parms['CA']));
            $this->_put('/BM '.$parms['BM']);
            $this->_put('>>');
            $this->_put('endobj');
        }
    }

    function _putresourcedict()
    {
        parent::_putresourcedict();
        $this->_put('/ExtGState <<');
        foreach($this->extgstates as $k=>$extgstate)
            $this->_put('/GS'.$k.' '.$extgstate['n'].' 0 R');
        $this->_put('>>');
    }

    function _putresources()
    {
        $this->_putextgstates();
        parent::_putresources();
    }

















    function Header()
{

 

// instantiate database and createNewService object

$database = new Database();
$getdb = 'nubefa.nubefa';
$db = $database->getConnection($getdb);
$info2 = new InfoBoleta($db);
//informacion de empresa
$info3 = new Infoempresa($db);
///pasar el ID de proveedor para ver sus pagos
$infoVenta = $info2->getinformacionVenta($getdb,20);
//informacion de empresa
$infoEmpresa = $info3->getinformacionEmpresa($getdb,1);
///pasar el ID de proveedor para ver sus pagos END
// $ge = $pago->fetch(PDO::FETCH_ASSOC);

$arry = array();


while ($row = $infoVenta->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry,$row);
}


//informacion de empresa
$arry3 = array();
while ($row = $infoEmpresa->fetch(PDO::FETCH_ASSOC)) {
    array_push($arry3,$row);
}



    // Logo
    $this->Image('your-logo-here.png',10,8,33);
    $this->SetFont('Arial','I',8);

        $this->SetXY(55,8);
        $this->MultiCell(100,4,substr($arry3[0]['emp_nom'],0,59)."\n ".substr($arry3[0]['emp_dir'],0,59)."\n".substr($arry3[0]['departamento']." - ".$arry3[0]['provincia']." - ".$arry3[0]['distrito'],0,59)."\n".substr("Email: ". $arry3[0]['emp_ema'],0,59) . "\n" .substr("Teléf: ". $arry3[0]['emp_tel']." Cel: ". $arry3[0]['emp_cel'],0,59)." \n",0,'L');
        $this->SetFont('Arial','B',9);
        $this->SetXY(150,10);
        $this->MultiCell(50,5,"RUC ". $arry3[0]['emp_ruc']. "\n "."BOLETA ELECTRÓNICA\n".$arry[0]['documento'],1,'C');
       // Line break
      

        $this->SetMargins(10,30,20,20);

$this->SetFont('Arial','',9);
$this->SetXY(10,30);
$this->MultiCell(110,5,"Cliente: ". substr($arry[0]['ane_razsoc'],0,49) ."\n"."DNI: " . $arry[0]['ane_numdoc'] . "\n"."Dirección: ". substr($arry[0]['ane_dir']. " - " .$arry[0]['departamento'],0,49),0,'L');
$this->SetXY(120,30);
$this->MultiCell(80,5,"Fecha Emisión: " . $arry[0]['ven_fecreg'] . "\n"."Tipo Moneda: SOLES\n"."Condición de Pago: EFECTIVO\n",0,'L');

$this->SetLineWidth(0.4);
$this->line(10,45,200,45);
$this->SetY(50);
        // $fpdf->Ln(10);
        $this->SetFont('Arial','B',8);

$this->cell(20,6,'Código',1,'','C');
$this->cell(90,6,'Descripción',1,'','C');
$this->cell(20,6,'Cant',1,'','C');
// $this->cell(15,6,'Psnt',1,'','C');
$this->cell(30,6,'Precio',1,'','C');
$this->cell(30,6,'Importe',1,'','C');
$this->Ln(8);
// $this->Ln(5);
}


function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-18);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página

    $this->Cell(0,5,"REPRESENTACIÓN IMPRESA DEL COMPROBANTE DE PAGO ELECTRÓNICO \n",0,1,'C');
    $this->Cell(0,5,"ESTE DOCUMENTO PUEDE SER CONSULTADO EN",0,1,'C');
    $this->Cell(0,5,"www.gruposc.cpe.com.pe",0,1,'C');
    $this->SetX(50);
    $this->SetY(-10 );
    $this->Cell(0,5,'Página '.$this->PageNo().'/{nb}',0,0,'R');
    $this->SetAlpha(0.3);
    $this->Image('your-logo-here.png',46,130,120);
}

}

// Creación del objeto de la clase heredada
$fpdf = new PDF('P','mm','A4',true);

$fpdf->AddPage('portrait','A4');
// $fpdf->SetMargins(20)

$fpdf->SetFont('Arial','',8);

/////////////////item de productos///////////////

foreach ($arry2 as $arr) {
  
    $fpdf->cell(20,6,$arr['pro_cod'],1,'','L');
    $fpdf->cell(90,6,substr($arr['pro_nom'],0,60),1,'','L');
    $fpdf->cell(20,6,$arr['vd_can'] . " " . $arr['pst_id'],1,'','C');
    $fpdf->cell(30,6,"S/. " .  number_format($arr['vd_pre'],2,',',' '),1,'','R');
    $fpdf->cell(30,6,"S/. " . number_format($arr['vd_pre'] * $arr['vd_can'],2,',',' '),1,'','R');
}
$fpdf->Ln();

/////////////////item de productos end///////////

$fpdf->cell(130,6,'SON: MIL CON 00/100 Solesto',0,'','L');

// $fpdf->Ln();
// $fpdf->Image('qr.jpg',0,0,33);
// $fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->cell(30,6,'Afecto',1,'','L');
$fpdf->cell(30,6,montoAfecto($arry2),1,'','R');
$fpdf->Ln();
// $fpdf->SetY(50);
$fpdf->SetX(140);
// $fpdf->cell(130,36,'Inafecto',1,'','L');
$fpdf->cell(30,6,'Inafecto',1,'','L');
$fpdf->cell(30,6,montoInafecto($arry2),1,'','R');
$fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->Cell(130,30, $fpdf->Image('qr.jpg', $fpdf->GetX(0), $fpdf->GetY(0),25),0);
$fpdf->cell(30,6,'ISC',1,'','L');
$fpdf->cell(30,6, montoIsc($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'IGV/IVA',1,'','L');
$fpdf->cell(30,6,montoIgv($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'Total Dsctos',1,'','L');
$fpdf->cell(30,6,montoDesc($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'Total Dcmto',1,'','L');
$fpdf->cell(30,6,montoDocum($arry2),1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'Percepción',1,'','L');
$fpdf->cell(30,6,number_format($arry2[0]['ven_per'],2,',',' '),1,'','R');
$fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->cell(130,6,'Cta Ahorro: 0011-0566-7602000598-49 Cta Interbancaria: 011-566-000200059849-76',0,'','L');
$fpdf->cell(30,6,'Total a Pagar',1,'','L');
$fpdf->cell(30,6,montoPagar($arry2),1,'','R');


$fpdf->AliasNbPages();
$fpdf->Output('I','nombre.pdf','UTF-8');
?>
